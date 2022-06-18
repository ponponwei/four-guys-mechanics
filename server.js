const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controllers/api/appointmentRoutes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.envPORT || 3001;

const hbs = exphbs.create({});
console.log(hbs.handlebars);
hbs.handlebars.logger.level = 'info';
console.log('Current log level: ', hbs.handlebars.logger.level, '\n---');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/api/appointmentRoutes'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to: http://localhost:${PORT}`));
})