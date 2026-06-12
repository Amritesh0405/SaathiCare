const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateStatus,
  extendBooking,
  verifyOTP,
  endWork
} = require('../controllers/bookingController');

router.post('/', auth, createBooking);
router.get('/', auth, getUserBookings);
router.get('/all', auth, getAllBookings);
router.put('/:id/status', auth, updateStatus);
router.put('/:id/extend', auth, extendBooking);
router.post('/verify-otp', verifyOTP);
router.put('/:id/end', auth, endWork);

module.exports = router;