const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getStats,
  getUsers,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/adminController');

router.get('/stats', auth, getStats);
router.get('/users', auth, getUsers);
router.get('/bookings', auth, getAllBookings);
router.put('/bookings/:id/status', auth, updateBookingStatus);

module.exports = router;