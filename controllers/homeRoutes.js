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

        res.render('login', {
            appointments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/appointments', async (req, res) => {
  try {
    const appointmentData = await Appointment.findAll( {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const appointments = appointmentData.get({ plain: true });
    
    res.render('appointments', {
        ...appointment,
        logged_in: req.session.logged_in
    });
    // res.render("appointments", {logged_in:req.session.logged_in});
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/homepage', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Appointment }],
    });

    const user = userData.get({ plain: true });
     
    res.render("homepage", {
        ...user,
        logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req. session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;