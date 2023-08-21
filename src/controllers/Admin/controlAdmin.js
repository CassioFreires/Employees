const Empresa = require('../../models/ModelEmpresa')
const RegraEmpresa = require('../../models/ModelRegraEmpresa')

exports.index = (req, res) => {
     res.render('Admin/home')
}

exports.cadastroEmpresa = (req, res) => {
     res.render('Admin/empresa', {})
}

exports.listarEmpresasCadastradas = async (req, res) => {
     Empresa.prototype.filtrarEmpresas()
          .then((empresas) => {
               res.render('admin/listarEmpresasCadastradas', {
                    empresas: empresas
               })
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro ao tentar exibir empresas cadastrada no sistema')
               res.redirect('/admin')
          })
}

exports.informacoesEmpresa = async (req, res) => {
     Empresa.prototype.filtrarPorId(req.params.id)
          .then((empresas) => {
               res.render('admin/listarInforDaEmpresa', {
                    empresas: empresas
               })
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro ao tentar exibir conteúdo específico')
               res.redirect('/admin/empresas-cadastradas')
          })
}

exports.cadastroPostEmpresa = async (req, res) => {
     const err = [];
     if (!req.body) return;

     if (!req.body.codigo || req.body.codigo === undefined || req.body.codigo === null || req.body.codigo.length < 9) {
          err.push({
               msgError: 'Código inválido'
          })
     }

     if (!req.body.nome || req.body.nome === undefined || req.body.nome === null) {
          err.push({
               msgError: 'Nome inválido'
          })
     }

     if (!req.body.cnpj || req.body.cnpj === undefined || req.body.cnpj === null || req.body.cnpj.length < 18 || req.body.cnpj > 18) {
          err.push({
               msgError: 'CNPJ inválido'
          })
     }
     if (!req.body.cep || req.body.cep === undefined || req.body.cep === null || req.body.cep.length < 8 || req.body.cep > 8) {
          err.push({
               msgError: 'CEP inválido'
          })
     }
     if (!req.body.rua || req.body.rua === undefined || req.body.rua === null) {
          err.push({
               msgError: 'Rua inválido'
          })
     }
     if (!req.body.cidade || req.body.cidade === undefined || req.body.cidade === null) {
          err.push({
               msgError: 'Cidade inválido'
          })
     }
     if (!req.body.estado || req.body.estado === undefined || req.body.estado === null) {
          err.push({
               msgError: 'Estado inválido'
          })
     }
     if (!req.body.bairro || req.body.bairro === undefined || req.body.bairro === null) {
          err.push({
               msgError: 'Bairro inválido'
          })
     }
     if (!req.body.numero || req.body.numero === undefined || req.body.numero === null || req.body.numero.length < 0) {
          err.push({
               msgError: 'Numero inválido'
          })
     }
     if (req.body.telefone === undefined || req.body.telefone === null || req.body.telefone.length > 14 || req.body.telefone.length < 14) {
          err.push({
               msgError: 'Telefone inválido'
          })
     }
     if (!req.body.celular || req.body.celular === undefined || req.body.celular === null || req.body.celular.length < 15 || req.body.celular.length > 16) {

          err.push({
               msgError: 'Celular inválido'
          })
     }
     if (!req.body.email || req.body.email === undefined || req.body.email === null) {
          err.push({
               msgError: 'E-mail inválido'
          })
     }

     // parei aqui
     if (err.length > 0) {
          req.flash('errors', err[0].msgError)
          res.redirect('/admin/cadastro-empresa')
     } else {
          try {
               const novaEmpresa = {
                    codigo: req.body.codigo,
                    nome: req.body.nome,
                    cnpj: req.body.cnpj,
                    cep: req.body.cep,
                    rua: req.body.rua,
                    cidade: req.body.cidade,
                    estado: req.body.estado,
                    bairro: req.body.bairro,
                    numero: req.body.numero,
                    telefone: req.body.telefone,
                    celular: req.body.celular,
                    email: req.body.email,
               }
               const empresa = new Empresa(novaEmpresa)

               // busca todos os dados relacionado a empresa no banco 
               empresa.find()
                    .then((dados) => {
                         if (dados.length == 0) {
                              empresa.cadastrarBd()
                                   .then((empresa) => {
                                        req.flash('success', 'Empresa cadastrada com sucesso!');
                                        res.redirect('/admin/cadastro-empresa');
                                        console.log('Registrado com sucesso');
                                   })
                                   .catch((e) => {
                                        req.flash('errors', 'Houve um erro interno ao tentar cadastrar empresa');
                                        res.redirect('/admin/cadastro-empresa')
                                   })
                         }

                         if (dados.length > 0) {
                              dados.forEach((dado) => {
                                   if (novaEmpresa.codigo == dado.codigo) {
                                        req.flash('errors', 'Já existe este código registrado no sistema, tente outro por favor.')
                                        res.redirect('/admin/cadastro-empresa')
                                        return
                                   }
                                   if (novaEmpresa.nome == dado.nome) {
                                        req.flash('errors', 'Já existe este nome da empresa registrado no sistema, tente outro por favor.')
                                        res.redirect('/admin/cadastro-empresa')
                                        return
                                   }
                                   if (novaEmpresa.cnpj == dado.cnpj) {
                                        req.flash('errors', 'Já existe este CNPJ registrado no sistema, tente outro por favor.')
                                        res.redirect('/admin/cadastro-empresa')
                                        return
                                   }
                                   if (novaEmpresa.email == dado.contato.email) {
                                        req.flash('errors', 'Já existe este E-mail registrado no sistema, tente outro por favor.')
                                        res.redirect('/admin/cadastro-empresa')
                                        return
                                   } else {
                                        empresa.cadastrarBd()
                                             .then((empresa) => {
                                                  req.flash('success', 'Empresa cadastrada com sucesso!');
                                                  res.redirect('/admin/cadastro-empresa');
                                                  console.log('Registrado com sucesso');
                                             })
                                             .catch((e) => {
                                                  req.flash('errors', 'Houve um erro interno ao tentar cadastrar empresa');
                                                  res.redirect('/admin/cadastro-empresa')
                                             })
                                   }
                              })
                         }
                    })
                    .catch((e) => {
                         req.flash('errors', 'Houve um erro ao tentar exibir dados da empresas')
                         res.redirect('/admin/empresas-cadastradas')
                         console.log(e);
                    })

          } catch (e) {
               throw Error.prototype.message = 'Houve um erro interno ao tentar cadastrar empresa (ERROR CAPTURADO)';
               console.log(e);
          };
     }

}

exports.empresa = async (req, res) => {
     Empresa.prototype.filtrarEmpresas()
          .then((empresas) => {
               res.render('admin/listarEmpresasCadastradas', {
                    empresas: empresas
               })
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro interno ao tentar exibir a página')
               res.redirect('/admin/cadastro-empresa')
          })
}

exports.editarEmpresa = async (req, res) => {
     Empresa.prototype.filtrarPorId(req.params.id)
          .then((empresa) => {
               res.render('admin/editarEmpresa', {
                    empresa: empresa
               })
          })
          .catch((error) => {
               console.log(error);
          })
}

exports.updateEmpresa = async (req, res) => {
     Empresa.prototype.updateDadosEmpresa(req.params.id, req.body)
          .then((empresa) => {
               req.flash('success', 'Dados atualizados com sucesso')
               res.redirect('/admin/empresa')
          })
          .catch((error) => {
               req.flash('errors', 'Houve um erro ao tentar atualizar os dados');
               res.redirect('/admin/empresa')
          })
}

// 
exports.deleteEmpresa = async (req, res) => {
     Empresa.prototype.deleteUnicoEmpresa(req.params.id)
          .then((dadoDeletado) => {
               req.flash('success', 'Empresa deletada com sucesso!')
               res.redirect('/admin/empresa')
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro ao tentar deletar empresa');
               res.redirect('/admin/empresa')
               console.log(e);
          })
}

exports.cadastroEmpresaRegra = async (req, res) => {
     Empresa.prototype.filtrarPorId(req.params.id)
          .then((empresa) => {
               res.render('admin/editaRegraEmpresa', {
                    empresa: empresa
               })
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro ao tentar mostrar página')
               res.redirect('/admin')
               console.log(e);
          })
}

exports.cadastroEmpresaRegraPost = async (req, res) => {
     const error = [];
     if (!req.body.areaEmpresa || req.body.areaEmpresa === '' || req.body.areaEmpresa === undefined || req.body.areaEmpresa === null) {
          error.push({
               msgError: 'Área da empresa inválido'
          })
     };
     if (!req.body.departamentoEmpresa || req.body.departamentoEmpresa === '' || req.body.departamentoEmpresa === undefined || req.body.departamentoEmpresa === null) {
          error.push({
               msgError: 'Departamento da empresa inválido'
          })
     }
     if (!req.body.cargoEmpresa || req.body.cargoEmpresa === '' || req.body.cargoEmpresa === undefined || req.body.cargoEmpresa === null) {
          error.push({
               msgError: 'Cargo da empresa inválido'
          })
     }
     if (!req.body.salarioEmpresa || req.body.salarioEmpresa === '' || req.body.salarioEmpresa === undefined || req.body.salarioEmpresa === null) {
          error.push({
               msgError: 'Salário do cargo inválido'
          })
     }

     if (error.length > 0) {
          req.flash('errors', error[0].msgError);
          res.redirect(`/admin/empresa/regra/${req.body.id}`)
     } else {
          Empresa.prototype.filtrarPorId(req.params.id)
               .then((dados) => {
                    try {
                         const novaRegraEmpresa = {
                              area: req.body.areaEmpresa,
                              departamento: req.body.departamentoEmpresa,
                              cargo: req.body.cargoEmpresa,
                              salario: req.body.salarioEmpresa,
                              empresa: dados
                         }
                         const regra = new RegraEmpresa(novaRegraEmpresa);
                         regra.cadastrarRegraBd()
                              .then((regrasEmpresa) => {
                                   req.flash('success', 'Regra criada com sucesso');
                                   res.redirect(`/admin/empresa/regra/${req.body.id}`)
                              })
                              .catch((e) => {
                                   req.flash('errors', 'Houve um erro ao tentar cadastrar regras da empresa')
                                   res.redirect(`/admin/empresa/regra/${req.body.id}`)
                                   console.log(e);
                              })

                    } catch (e) {
                         throw Error.prototype.message = 'Houve um erro interno ao tentar cadastrar regra (ERROR CAPTURADO)';
                    }
               })
     }
}

exports.buscarRegrasDaEmpresa = (req, res) => {
     RegraEmpresa.prototype.filtrarRegrasDaEmpresaPorId(req.params.id)
          .then((dados) => {
               res.render('admin/exibirRegrasDaEmpresa', {
                    dados: dados
               })
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro ao tentar exibir regras da empresa')
               res.redirect(`/admin/empresa/informacoes/${req.params.id}`)
               console.log(e);
          })
}


exports.filtrarRegrasDaEmpresa = (req, res) => {
     const query = req.query.pesquisa;
     RegraEmpresa.prototype.pesquisarRegrasDaEmpresa(query)
          .then((dados) => {
               if (!query || query === '') {
                    req.flash('errors', 'Não é possível filtrar pois o campo esta vazio.')
                    res.redirect(`/admin/empresa/regra/filtro/${dados[0].empresa._id}`)
                    return
               }
               res.render('admin/listarRegrasEmpresaFiltrada', {
                    dados: dados
               })
          })
          .catch((e) => {
               req.flash('errors', 'Houve um erro ao tentar realizar a busca.')
               res.redirect(`/admin/empresa/regra/filtro/${dados[0].empresa._id}`)
          })
}

