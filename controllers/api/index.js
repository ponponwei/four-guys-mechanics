const router = require('express').Router();
const userRoutes = require('./userRoutes');
const appointmentRoutes = require('./appointmentRoutes');

router.use('/user', userRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;