const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sequelize = require('sequelize');

const routes = require('./routes/index');
const domainRoutes = require('./routes/domain_routes');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//use routes
app.use('/api', routes);

//sequelize.sequelize.sync().then(() => {
let server = app.listen(process.env.PORT || 3000, () => `App running on ${server.address().port}`);
//});