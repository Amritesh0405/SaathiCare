const Booking = require('../models/Booking');

// Generate 4 digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const {
      service, serviceIcon, hasVehicle,
      date, time, hours, address,
      notes, allowExtension
    } = req.body;

    const totalAmount = hours * 150;
    const otp = generateOTP();

    const booking = new Booking({
      userId: req.user.userId,
      service,
      serviceIcon,
      hasVehicle,
      date,
      time,
      hours,
      address,
      notes,
      allowExtension,
      totalAmount,
      otp
    });

    await booking.save();

    res.status(201).json({
      message: '✅ Booking created!',
      booking,
      otp
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL BOOKINGS (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name phone')
      .populate('helperId', 'name phone')
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE STATUS (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found!' });
    res.json({ message: '✅ Status updated!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// EXTEND BOOKING
exports.extendBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found!' });

    booking.hours += 1;
    booking.totalAmount += 150;
    await booking.save();

    res.json({ message: '✅ Booking extended by 1 hour!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// VERIFY OTP & START WORK
exports.verifyOTP = async (req, res) => {
  try {
    const { bookingId, otp } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found!' });

    if (booking.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }

    booking.status = 'active';
    booking.workStartedAt = new Date();
    await booking.save();

    res.json({ message: '✅ Work started!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// END WORK
exports.endWork = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found!' });

    booking.status = 'completed';
    booking.workEndedAt = new Date();
    await booking.save();

    res.json({ message: '✅ Work completed!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};