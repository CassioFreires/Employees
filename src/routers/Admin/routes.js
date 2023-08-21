const express = require('express');
const route = express.Router();
const controller = require('../../controllers/Admin/controlAdmin')
const controllerFuncionario = require('../../controllers/Admin/controlAdminFuncionario')

// ***************************     ROTAS ADMIN EMPRESA     ****************************************//

// pagina home do admin
route.get('/admin', controller.index);

    // rota que leva para o template de cadastro da empresa
route.get('/admin/cadastro-empresa', controller.cadastroEmpresa);

    // listar empresas cadastradas no sistema
route.get('/admin/empresas-cadastradas', controller.listarEmpresasCadastradas);

    // exibir pagina unica da empresa com todas as informações sobre ela
route.get('/admin/empresa/informacoes/:id', controller.informacoesEmpresa);

    // rota de post do formulario de cadastro da empresa
route.post('/admin/cadastro-empresa', controller.cadastroPostEmpresa);

    // rota que mostra a lista de empresas do banco de dados
route.get('/admin/empresa', controller.empresa);

    // roda que edita os dados da empresa
route.get('/admin/empresa/editar/:id', controller.editarEmpresa);

    // rota que atualiza os dados da empresa cadastrada
route.post('/admin/empresa/editar/:id', controller.updateEmpresa);

    // roda que deleta a empresa cadastrada
route.get('/admin/empresa/delete-empresa/:id', controller.deleteEmpresa);

    // roda de cadastro das regras da empresa
route.get('/admin/empresa/regra/:id', controller.cadastroEmpresaRegra);

    // rota de post quando cadastra a regra da empresa
route.post('/admin/empresa/regra/:id', controller.cadastroEmpresaRegraPost);

    // rota que busca as regrasd da empresa no banco de dados
route.get('/admin/empresa/regra/filtro/:id', controller.buscarRegrasDaEmpresa);

    // rota de POST que vai filtrar com base no usuário a regra da empresa
route.get('/admin/empresa/regras/pesquisa', controller.filtrarRegrasDaEmpresa)



// ***************************     ROTAS ADMIN FUNCIONARIO     ****************************************//
route.get('/admin/funcionario/:nome_empresa/:id', controllerFuncionario.indexFuncionario);
route.post('/admin/funcionario/cadastro', controllerFuncionario.cadastrarFuncionario)





module.exports = route;