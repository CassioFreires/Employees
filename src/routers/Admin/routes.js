const express = require('express');
const route = express.Router();
const controller = require('../../controllers/Admin/controlAdmin')

route.get('/admin', controller.index);

route.get('/admin/cadastro', controller.cadastro)
route.post('/admin/cadastro', controller.cadastroPost)

route.get('/admin/categorias', controller.listarCategorias);
route.get('/admin/categorias/:cargo', controller.listarFuncionarios)





module.exports = route;