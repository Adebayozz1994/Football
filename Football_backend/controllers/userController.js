const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'supersecretjwt', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// REGISTER
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, favoriteState, favoriteTeam } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists' });
    }

    const followedStates = favoriteState ? [favoriteState] : [];
    const followedTeams = favoriteTeam ? [favoriteTeam] : [];

    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      followedStates,
      followedTeams,
    });

    await user.save();

    const token = generateToken(user._id);
    const userData = user.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user: userData, token }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    if (user.isBanned) {
      return res.status(403).json({ success: false, message: 'Your account has been banned. Please contact support.' });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account is not active. Please contact support.' });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    const userData = user.getPublicProfile();

    res.json({
      success: true,
      message: 'Login successful',
      data: { user: userData, token }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('followedTeams', 'name shortName logo state')
      .select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }
    
    const user = await User.findById(req.user._id);
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address'
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    await user.save();
    
    // In a real application, send email with reset link
    // For now, we'll just return the token (remove in production)
    res.json({
      success: true,
      message: 'Password reset token sent to your email',
      resetToken // Remove this in production
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing forgot password request'
    });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide reset token and new password'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }
    
    // Hash the token and find user
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
    
    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting password'
    });
  }
};

// Social login (placeholder)
const socialLogin = async (req, res) => {
  try {
    const { provider, providerId, email, firstName, lastName, avatar } = req.body;
    
    // In a real app, verify the token with the provider (Google, Facebook, etc.)
    
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Create new user
      user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: crypto.randomBytes(32).toString('hex'), // Random password for social login
        avatar,
        role: 'user'
      });
      
      await user.save();
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user data without password
    const userData = user.getPublicProfile();
    
    res.json({
      success: true,
      message: 'Social login successful',
      data: {
        user: userData,
        token
      }
    });
  } catch (error) {
    console.error('Social login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during social login'
    });
  }
};

// Follow team
const followTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    
    const user = await User.findById(req.user._id);
    
    if (!user.followedTeams.includes(teamId)) {
      user.followedTeams.push(teamId);
      await user.save();
    }
    
    res.json({
      success: true,
      message: 'Team followed successfully'
    });
  } catch (error) {
    console.error('Follow team error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while following team'
    });
  }
};

// Unfollow team
const unfollowTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    
    const user = await User.findById(req.user._id);
    user.followedTeams = user.followedTeams.filter(id => id.toString() !== teamId);
    await user.save();
    
    res.json({
      success: true,
      message: 'Team unfollowed successfully'
    });
  } catch (error) {
    console.error('Unfollow team error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while unfollowing team'
    });
  }
};

// Follow state
const followState = async (req, res) => {
  try {
    const { state } = req.params;
    
    const user = await User.findById(req.user._id);
    
    if (!user.followedStates.includes(state)) {
      user.followedStates.push(state);
      await user.save();
    }
    
    res.json({
      success: true,
      message: 'State followed successfully'
    });
  } catch (error) {
    console.error('Follow state error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while following state'
    });
  }
};

// Unfollow state
const unfollowState = async (req, res) => {
  try {
    const { state } = req.params;
    
    const user = await User.findById(req.user._id);
    user.followedStates = user.followedStates.filter(s => s !== state);
    await user.save();
    
    res.json({
      success: true,
      message: 'State unfollowed successfully'
    });
  } catch (error) {
    console.error('Unfollow state error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while unfollowing state'
    });
  }
};

// Update preferences
const updatePreferences = async (req, res) => {
  try {
    const { darkMode, notifications } = req.body;
    
    const updateData = {};
    if (typeof darkMode === 'boolean') {
      updateData['preferences.darkMode'] = darkMode;
    }
    
    if (notifications) {
      if (typeof notifications.matchUpdates === 'boolean') {
        updateData['preferences.notifications.matchUpdates'] = notifications.matchUpdates;
      }
      if (typeof notifications.newsUpdates === 'boolean') {
        updateData['preferences.notifications.newsUpdates'] = notifications.newsUpdates;
      }
      if (typeof notifications.teamUpdates === 'boolean') {
        updateData['preferences.notifications.teamUpdates'] = notifications.teamUpdates;
      }
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: { preferences: user.preferences }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating preferences'
    });
  }
};

// Get preferences
const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('preferences');
    
    res.json({
      success: true,
      data: { preferences: user.preferences }
    });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching preferences'
    });
  }
};

// Placeholder functions for features that require additional implementation
const uploadAvatar = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Avatar upload not implemented yet'
  });
};

const deleteAccount = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Account deletion not implemented yet'
  });
};

const getNotifications = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Notifications not implemented yet'
  });
};

const markNotificationAsRead = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Notifications not implemented yet'
  });
};

const deleteNotification = async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Notifications not implemented yet'
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  socialLogin,
  followTeam,
  unfollowTeam,
  followState,
  unfollowState,
  updatePreferences,
  getPreferences,
  uploadAvatar,
  deleteAccount,
  getNotifications,
  markNotificationAsRead,
  deleteNotification
};
