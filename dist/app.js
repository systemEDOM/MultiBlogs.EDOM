"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const method_override_1 = __importDefault(require("method-override"));
/* const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const sequelize = require('sequelize');

const routes = require('./routes/index');
const domainRoutes = require('./routes/domain_routes'); */
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(method_override_1.default('_method'));
//use routes
/* app.use('/api', routes); */
//sequelize.sequelize.sync().then(() => {
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
let server = app.listen(process.env.PORT || 3000, () => `App running on ${server.address().port}`);
//});
//# sourceMappingURL=app.js.map