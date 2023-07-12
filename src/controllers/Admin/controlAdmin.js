const { default: mongoose } = require('mongoose')
const Funcionario = require('../../models/ModelFuncionario')

exports.index = (req, res) => {
    res.render('Admin/index.ejs')
}

exports.cadastro = (req, res) => {
    res.render('Admin/cadastro')
}

exports.cadastroPost = async (req, res) => {
    const err = [];

    if (!req.body) return;

    if (req.body.cargo === '0') {
        err.push({
            msg: 'Cargo inválido'
        });
    }

    if (!req.body.setor || req.body.setor === null || req.body.setor === '' || typeof req.body.setor === undefined) {
        err.push({
            msg: 'Setor de atuação inválido'
        });
    }
    if (!req.body.salario || req.body.salario === null || req.body.salario === '' || typeof req.body.salario === undefined || req.body.salario.length < 0) {
        err.push({
            msg: 'Salário inválido'
        });
    }
    if (!req.body.nome || req.body.nome === null || req.body.nome === '' || typeof req.body.nome === undefined || req.body.nome.length < 0) {
        err.push({
            msg: 'Nome inválido'
        });
    }
    if (!req.body.idade || req.body.idade === null || req.body.idade === '' || typeof req.body.idade === undefined || req.body.idade.length < 0) {
        err.push({
            msg: 'Idade inválido'
        });
    }
    if (!req.body.flexRadioDefault || req.body.flexRadioDefault === null || req.body.flexRadioDefault === '' || typeof req.body.flexRadioDefault === undefined) {
        err.push({
            msg: 'Sexo inválido'
        });
    }
    if (!req.body.cep || req.body.cep === null || req.body.cep === '' || typeof req.body.cep === undefined || req.body.cep.length <= 0 || req.body.cep.length < 8 || req.body.cep.length > 8) {
        err.push({
            msg: 'Cep inválido inválido'
        });
    }
    if (!req.body.nCasa || req.body.nCasa === null || req.body.nCasa === '' || typeof req.body.nCasa === undefined || req.body.nCasa.length < 0) {
        err.push({
            msg: 'Número da casa inválido inválido'
        });
    }

    if (err.length > 0) {
        req.flash('errors', err[0].msg);
        res.redirect('/admin/cadastro');
        return;
    } else {
        try {
            const novoFuncionario = {
                cargo: req.body.cargo,
                setor: req.body.setor,
                salario: req.body.salario,
                nome: req.body.nome,
                idade: req.body.idade,
                sexo: req.body.sexo,
                cep: req.body.cep,
                rua: req.body.rua,
                cidade: req.body.cidade,
                nCasa: req.body.nCasa,
                bairro: req.body.bairro,
                uf: req.body.uf
            }

            // registrando funcionario no banco
            var funcionario = new Funcionario(novoFuncionario);
            await funcionario.registro()
                .then((funcionarios) => {
                    console.log(funcionarios);
                    req.flash('success', 'Funcionario registrado com sucesso')
                    res.redirect('/admin/cadastro');
                })
                .catch((e) => {
                    console.log(e);
                    req.flash('errors', 'Houve um erro ao tentar salvar os dados dos funcionarios');
                    res.redirect('/admin/cadastro')
                })
        } catch (e) {
            // capturar o erro 
            console.log(e);
            throw Error('Houve um erro interno ao tentar salvar os dados dos funcionarios')

        }
    }

}

exports.listarCategorias = async (req, res) => {
    Funcionario.prototype.findCategoriaCargo()
        .then((funcionarios) => {
            res.render('Admin/categorias', {
                funcionarios: funcionarios
            })
        })
        .catch((e) => {
            console.log(e);
            req.flash('errors', 'Houve um erro interno ao tentar exibir os funcionarios')
            res.redirect('/admin/cadastro')
        })
}

exports.listarFuncionarios = async (req, res) => {
    console.log(req.params.cargo);
    Funcionario.prototype.findCargoFuncionario(req.params.cargo)
    .then((funcionarios) => {
        res.render('Admin/funcionarios', {funcionarios: funcionarios})
    })
    .catch((e) => {
        console.log(e);
    })
}