import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const authSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone:{type:Number},
  role: { type: String, enum: ['admin', 'user'], default: 'admin' },
});

authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

authSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Auth = mongoose.model('Auth', authSchema);
export default Auth;
