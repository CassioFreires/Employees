const RegrasDaEmpresa = require('../../models/ModelRegraEmpresa')

exports.indexFuncionario = async (req, res) => {

    await RegrasDaEmpresa.prototype.filtrarRegrasDaEmpresa(req.params)
        .then((dados) => {
            res.render('Admin/funcionario', {
                dados: dados,
                reqParamsId: req.params.id
            })
        })
        .catch((e) => {
            console.log(e);
        })
}

exports.cadastrarFuncionario = async (req, res) => {
    const error = [];
    if (!req.body) {
        error.push({
            msgError: 'Houve um erro ao tentar enviar o formulário'
        })
        console.log('Erro ao tentar enviar formulário que não existe');
    }
    if (!req.body.nomeCompleto || req.body.nomeCompleto === '' || req.body.nomeCompleto === undefined || req.body.nomeCompleto === null) {
        error.push({
            msgError: 'Nome completo inválido'
        });
    }
    if (!req.body.dataNascimento || req.body.dataNascimento === '' || req.body.dataNascimento === undefined || req.body.dataNascimento === null) {
        error.push({
            msgError: 'Data de nascimento inválido'
        });
    }
    if (!req.body.radioSexoDefault || req.body.radioSexoDefault === '' || req.body.radioSexoDefault === undefined || req.body.radioSexoDefault === null) {
        error.push({
            msgError: 'Sexo inválido'
        });
    }
    if (!req.body.radioEstadoCivilDefault || req.body.radioEstadoCivilDefault === '' || req.body.radioEstadoCivilDefault === undefined || req.body.radioEstadoCivilDefault === null) {
        error.push({
            msgError: 'Estado civil inválido'
        });
    }
    if (!req.body.radioIdentGenerolDefault || req.body.radioIdentGenerolDefault === '' || req.body.radioIdentGenerolDefault === undefined || req.body.radioIdentGenerolDefault === null) {
        error.push({
            msgError: 'Identificação de genêro inválido'
        });
    }
    if (!req.body.cep || req.body.cep === '' || req.body.cep === undefined || req.body.cep === null || req.body.cep.length < 9 || req.body.cep.length > 9) {
        error.push({
            msgError: 'CEP inválido'
        });
    }
    if (!req.body.rua || req.body.rua === '' || req.body.rua === undefined || req.body.rua === null) {
        error.push({
            msgError: 'Rua inválido'
        });
    }
    if (!req.body.cidade || req.body.cidade === '' || req.body.cidade === undefined || req.body.cidade === null) {
        error.push({
            msgError: 'Cidade inválido'
        });
    }
    if (!req.body.estado || req.body.estado === '' || req.body.estado === undefined || req.body.estado === null) {
        error.push({
            msgError: 'Estado inválido'
        });
    }
    if (!req.body.bairro || req.body.bairro === '' || req.body.bairro === undefined || req.body.bairro === null) {
        error.push({
            msgError: 'Bairro inválido'
        });
    }
    if (!req.body.numero || req.body.numero === '' || req.body.numero === undefined || req.body.numero === null) {
        error.push({
            msgError: 'Número inválido'
        });
    }


    if (error.length > 0) {
        req.flash('errors', error[0].msgError)
        res.redirect(req.headers.referer)
    } else {
        try {
            res.send(req.body)
        } catch (e) {
            console.log(e);
        }
    }



}