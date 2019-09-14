import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import sequelize from 'sequelize';

import routes from './routes/index';
import domainRoutes from './routes/domain_routes';

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//use routes
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('cambio de texto');
});

let server = app.listen(process.env.PORT || 3000, () => `App running on ${server.address().port}`);