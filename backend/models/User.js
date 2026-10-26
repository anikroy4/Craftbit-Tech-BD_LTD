import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, default: '' },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'moderator'],
      default: 'moderator',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: { type: String, default: '' },
    avatar: { type: String, default: '' },
    isEmailVerified: { type: Boolean, default: false },
    verificationCode: { type: String, default: '' },
    verificationCodeExpires: { type: Date, default: null },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
