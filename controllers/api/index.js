const router = require('express').Router();
const appointmentRoutes = require('./appointmentRoutes');

router.use('/user', userRoutes);
router.use('/appointments', appointmentRoutes);

module.exports - router;