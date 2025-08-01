const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET || 'supersecretjwt', {
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
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: 'Admin with this email already exists' });
    }

    const followedStates = favoriteState ? [favoriteState] : [];
    const followedTeams = favoriteTeam ? [favoriteTeam] : [];

    const admin = new Admin({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone,
      followedStates,
      followedTeams,
    });

    await admin.save();

    const token = generateToken(admin._id);
    const adminData = admin.getPublicProfile();

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: { admin: adminData, token }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during admin registration' });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    if (admin.isBanned) {
      return res.status(403).json({ success: false, message: 'Your account has been banned. Please contact support.' });
    }
    if (!admin.isActive) {
      return res.status(403).json({ success: false, message: 'Your account is not active. Please contact support.' });
    }
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);
    const adminData = admin.getPublicProfile();

    res.json({
      success: true,
      message: 'Login successful',
      data: { admin: adminData, token }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error during admin login' });
  }
};

// Get admin profile (protected route)
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id)
      .select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.json({
      success: true,
      data: { admin }
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};


// Update admin profile controller (covers all fields)
const updateAdminProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      bio,
      socialLinks,
      birthdate,
      gender,
      location,
      address,
      theme,
      language,
      achievements,
      badges,
      favoritePlayers,
      favoriteLeagues,
      profileUpdatedAt,
      coverPhoto,
      preferences,
      avatar,
      followedTeams,
      followedStates,
      timezone,
    } = req.body;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (birthdate) updateData.birthdate = birthdate;
    if (gender) updateData.gender = gender;
    if (location) updateData.location = location;
    if (address) updateData.address = address;
    if (theme) updateData.theme = theme;
    if (language) updateData.language = language;
    if (Array.isArray(achievements)) updateData.achievements = achievements;
    if (Array.isArray(badges)) updateData.badges = badges;
    if (Array.isArray(favoritePlayers)) updateData.favoritePlayers = favoritePlayers;
    if (Array.isArray(favoriteLeagues)) updateData.favoriteLeagues = favoriteLeagues;
    updateData.profileUpdatedAt = new Date();
    if (coverPhoto) updateData.coverPhoto = coverPhoto;
    if (preferences) updateData.preferences = preferences;
    if (avatar) updateData.avatar = avatar;
    if (Array.isArray(followedTeams)) updateData.followedTeams = followedTeams;
    if (Array.isArray(followedStates)) updateData.followedStates = followedStates;
    if (timezone) updateData.timezone = timezone;

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { admin }
    });
  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating admin profile'
    });
  }
};

module.exports = { updateAdminProfile }

module.exports = {
  register,
  login,
  getProfile,
  updateAdminProfile,
}