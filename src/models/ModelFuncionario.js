const mongoose = require('mongoose');

const schemaFuncionario = new mongoose.Schema({
    cargo: {
        type: String,
        required: true
    },
    setor: {
        type: String,
        required: true
    },
    salario: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
    },
    cep: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    nCasa: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },

});

const modelFuncionario = mongoose.model('funcionarios', schemaFuncionario);

class Funcionario {
    constructor(body) {
        this.body = body;
    }

    async registro() {
        if (!this.body) return
        const dadosRegistrados = (await modelFuncionario.create(this.body)).save()
        return dadosRegistrados;
    }
}

Funcionario.prototype.findCategoriaCargo = async function() {
    const funcionarios = await modelFuncionario.find({});
    return funcionarios;
}
Funcionario.prototype.findCargoFuncionario = async function(cargo) {
    const funcionarios = await modelFuncionario.find({cargo: cargo});
    return funcionarios;
}


module.exports = Funcionario;