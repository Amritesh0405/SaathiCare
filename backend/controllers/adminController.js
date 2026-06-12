const User = require('../models/User');
const Booking = require('../models/Booking');
const Helper = require('../models/Helper');

// GET STATS
exports.getStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalHelpers = await User.countDocuments({ role: 'helper' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    
    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    
    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      totalBookings,
      totalUsers,
      totalHelpers,
      pendingBookings,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE BOOKING STATUS
exports.updateBookingStatus = async (req, res) => {
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