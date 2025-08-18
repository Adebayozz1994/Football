const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

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
    const adminData = admin.getPublicProfile ? admin.getPublicProfile() : admin.toObject();

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
    if (typeof admin.isActive !== "undefined" && !admin.isActive) {
      return res.status(403).json({ success: false, message: 'Your account is not active. Please contact support.' });
    }
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);
    const adminData = admin.getPublicProfile ? admin.getPublicProfile() : admin.toObject();

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
    const admin = await Admin.findById(req.admin._id).select('-password');
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
    const updateData = { profileUpdatedAt: new Date() };

    // Fields from text
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
    if (req.body.timezone !== undefined) updateData.timezone = req.body.timezone;

    // Parse arrays sent as comma-separated strings
    if (req.body.achievements !== undefined)
      updateData.achievements = typeof req.body.achievements === 'string'
        ? req.body.achievements.split(',').map(v => v.trim()).filter(Boolean)
        : req.body.achievements;
    if (req.body.badges !== undefined)
      updateData.badges = typeof req.body.badges === 'string'
        ? req.body.badges.split(',').map(v => v.trim()).filter(Boolean)
        : req.body.badges;
    if (req.body.favoritePlayers !== undefined)
      updateData.favoritePlayers = typeof req.body.favoritePlayers === 'string'
        ? req.body.favoritePlayers.split(',').map(v => v.trim()).filter(Boolean)
        : req.body.favoritePlayers;
    if (req.body.favoriteLeagues !== undefined)
      updateData.favoriteLeagues = typeof req.body.favoriteLeagues === 'string'
        ? req.body.favoriteLeagues.split(',').map(v => v.trim()).filter(Boolean)
        : req.body.favoriteLeagues;
    if (req.body.followedTeams !== undefined)
      updateData.followedTeams = typeof req.body.followedTeams === 'string'
        ? req.body.followedTeams.split(',').map(v => v.trim()).filter(Boolean)
        : req.body.followedTeams;
    if (req.body.followedStates !== undefined)
      updateData.followedStates = typeof req.body.followedStates === 'string'
        ? req.body.followedStates.split(',').map(v => v.trim()).filter(Boolean)
        : req.body.followedStates;

    // Handle avatar upload (if file present)
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

    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return res.json({
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

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while changing password",
    });
  }
}

// Forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Please provide admin email address" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ success: false, message: "No admin found with this email address" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    admin.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    admin.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await admin.save();

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL || 'https://football-eight-theta.vercel.app/'}/admin/reset-password?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    const mailOptions = {
      from: `"Football Hub Support" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: "Admin Password Reset",
      html: `
        <p>Hello ${admin.firstName},</p>
        <p>You requested a password reset for your admin account.</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetUrl}" style="color:#FFD700;font-weight:bold;">Reset Password</a></p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset email sent to your admin email.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while processing forgot password request",
    });
  }
};

// Reset password (from email link)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide reset token and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    // Hash the token and find admin
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const admin = await Admin.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Update password
    admin.password = newPassword;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;

    await admin.save();

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });
  }
}


module.exports = {
  register,
  login,
  getProfile,
  updateAdminProfile,
  resetPassword,
  forgotPassword,
  changePassword,
};