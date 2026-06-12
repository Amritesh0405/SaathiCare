const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  helperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Helper' },
  service: { type: String, required: true },
  serviceIcon: { type: String },
  hasVehicle: { type: Boolean, default: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  hours: { type: Number, required: true, min: 1 },
  address: { type: String, required: true },
  notes: { type: String },
  allowExtension: { type: Boolean, default: true },
  otp: { type: String },
  status: {
    type: String,
    enum: ['pending', 'upcoming', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  paymentId: { type: String },
  workStartedAt: { type: Date },
  workEndedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);