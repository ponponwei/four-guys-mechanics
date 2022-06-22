const router = require('express').Router();
const { Appointment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const appointmentData = await Appointment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const appointments = appointmentData.map((appointment) => appointment.get({ plain:true }));

        res.render('homepage', {
            appointments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/appointment/:id', async (req, res) => {
  try {
    const appointmentData = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const appointment = appointmentData.get({ plain: true });
    
    res.render('appointment', {
        ...appointment,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Appointment }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
        ...user,
        logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req. session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;