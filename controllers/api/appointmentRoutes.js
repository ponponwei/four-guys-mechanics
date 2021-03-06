const router = require('express').Router();
const { Appointment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newAppointment = await Appointment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newAppointment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const appointmentData = await Appointment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!appointmentData) {
            res.status(404).json({ message: 'No appointment has been booked with this id' });
            return;
        }

      res.status(200).json(appointmentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;