const sequelize = require('../config/connection');
const { User, Appointment } = require('../models');

const userData = require('./userData.json');
const appointmentData = require('./appointmentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for ( const appointment of appointmentData) {
        await Appointment.create({
            ...appointment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();