const mongoose = require('mongoose');

const helperSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },
  experience: { type: String },
  skills: [{ type: String }],
  languages: [{ type: String }],
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  aadharVerified: { type: Boolean, default: false },
  city: { type: String, default: 'Jamshedpur' }
}, { timestamps: true });

module.exports = mongoose.model('Helper', helperSchema);