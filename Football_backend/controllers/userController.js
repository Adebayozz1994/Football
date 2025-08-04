const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');


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

// Update user profile (with avatar upload if present)
const updateProfile = async (req, res) => {
  try {
    const updateData = { profileUpdatedAt: new Date() };

    // Simple fields
    if (req.body.firstName !== undefined) updateData.firstName = req.body.firstName;
    if (req.body.lastName !== undefined) updateData.lastName = req.body.lastName;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body.socialLinks !== undefined) updateData.socialLinks = req.body.socialLinks;
    if (req.body.birthdate !== undefined) updateData.birthdate = req.body.birthdate;
    if (req.body.gender !== undefined) updateData.gender = req.body.gender;
    if (req.body.location !== undefined) updateData.location = req.body.location;
    if (req.body.address !== undefined) updateData.address = req.body.address;
    if (req.body.theme !== undefined) updateData.theme = req.body.theme;
    if (req.body.language !== undefined) updateData.language = req.body.language;
    if (req.body.coverPhoto !== undefined) updateData.coverPhoto = req.body.coverPhoto;
    if (req.body.preferences !== undefined) updateData.preferences = req.body.preferences;

    // Array fields (accept comma-separated or array)
    const parseArray = (v) => typeof v === "string" ? v.split(',').map(i => i.trim()).filter(Boolean) : v;
    if (req.body.achievements !== undefined) updateData.achievements = parseArray(req.body.achievements);
    if (req.body.badges !== undefined) updateData.badges = parseArray(req.body.badges);
    if (req.body.favoritePlayers !== undefined) updateData.favoritePlayers = parseArray(req.body.favoritePlayers);
    if (req.body.favoriteLeagues !== undefined) updateData.favoriteLeagues = parseArray(req.body.favoriteLeagues);
    if (req.body.followedTeams !== undefined) updateData.followedTeams = parseArray(req.body.followedTeams);
    if (req.body.followedStates !== undefined) updateData.followedStates = parseArray(req.body.followedStates);

    // Avatar upload (if file present)
    if (req.file) {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'avatars' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };
      const result = await streamUpload(req.file.buffer);
      updateData.avatar = result.secure_url;
    }

    // Update user
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
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ success: false, message: "Please provide user email address" })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found with this email address" })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

    await user.save()

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"Football Hub Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "User Password Reset",
      html: `
        <p>Hello ${user.firstName || "User"},</p>
        <p>You requested a password reset for your Football Hub account.</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetUrl}" style="color:#FFD700;font-weight:bold;">Reset Password</a></p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore.</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.json({
      success: true,
      message: "Password reset email sent to your email address.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while processing forgot password request",
    })
  }
}

// Reset password (from email link)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide reset token and new password",
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      })
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      })
    }

    user.password = newPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    res.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    })
  }
}


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
