import mongoose from 'mongoose';

const userDataLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  registeredAt: { type: Date, required: true },
  lastLoginAt: { type: Date },
});

export const UserDataLog = mongoose.model('UserDataLog', userDataLogSchema); 