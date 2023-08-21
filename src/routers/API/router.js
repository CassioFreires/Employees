const express = require('express');
const controlApi = require('../../controllers/API/controlAPI');
const route = express.Router();
const cors = require('cors')

route.get('/admin/api/regrasdasempresas', cors(), controlApi.apiRegrasDaEmpresa);


module.exports = route;