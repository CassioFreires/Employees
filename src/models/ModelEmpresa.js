const mongoose = require('mongoose');

const schemaEmpresa = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    endereco: {
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
        estado: {
            type: String,
            required: true
        },
        bairro: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        }
    },
    contato: {
        telefone: {
            type: String,
            required: false,
        },

        celular: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const modelEmpresa = mongoose.model('empresas', schemaEmpresa);

class Empresa {
    constructor(body) {
        this.body = body;
    }

    async cadastrarBd() {
        if (!this.body) {
            console.log('Erro interno ao tentar enviar formulario');
        };

        const newModelEmpresa = new modelEmpresa({
            codigo: this.body.codigo,
            nome: this.body.nome,
            cnpj: this.body.cnpj,
            // endereço
            endereco: {
                cep: this.body.cep,
                rua: this.body.rua,
                cidade: this.body.cidade,
                estado: this.body.estado,
                bairro: this.body.bairro,
                numero: this.body.numero,
            },
            // contato
            contato: {
                telefone: this.body.telefone,
                celular: this.body.celular,
                email: this.body.email,
            }
        })
        return await newModelEmpresa.save();

    }

    async find(){
        const dados = await modelEmpresa.find({})
        return dados;
    }

    async filtrarEmpresas() {
        const dadosEmpresas = await modelEmpresa.find({}).sort({date: -1});
        return dadosEmpresas
    }

    async filtrarPorId(id) {
        const dadosEmpresa = await modelEmpresa.findById(id)
        return dadosEmpresa
    }
    async updateDadosEmpresa(id, bodyEditado) {
        const dadosEmpresa = await modelEmpresa.findById(id)
        return await modelEmpresa.updateOne(dadosEmpresa, bodyEditado, {new: true})

    }
    async deleteUnicoEmpresa(id)  {
        if(!id) return;
        const localizarEmpresa = modelEmpresa.findById(id);
        const excluir = await modelEmpresa.deleteOne(localizarEmpresa)
        return excluir;
    }

}


module.exports = Empresa;