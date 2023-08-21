const mongoose = require('mongoose');

const schemaRegraEmpresa = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },

    departamento: {
        type: String,
        required: true
    },

    cargo: {
        type: String,
        required: true
    },
    salario: {
        type: String,
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresas',
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const modelRegraEmpresa = mongoose.model('regrasEmpresa', schemaRegraEmpresa);

class RegraEmpresa {
    constructor(body) {
        this.body = body
    }

    async cadastrarRegraBd() {
        if (!this.body) {
            console.log('Houve um erro pois o formulario não existe');
        }

        console.log(this.body.empresa);
        const newModelSchema = new modelRegraEmpresa({
            area: this.body.area,
            departamento: this.body.departamento,
            cargo: this.body.cargo,
            salario: this.body.salario,
            empresa: this.body.empresa
        })

        return await newModelSchema.save();
    }

    async filtrarRegrasDaEmpresaPorId(idEmpresa) {
        if(!id) {
            console.log('Houve um erro interno pois não foi fornecido o id da empresa' + e);
            return
        }
        const dados = await modelRegraEmpresa.find({
            empresa: {
                _id: idEmpresa
            }
        }).populate('empresa').sort({
            date: -1
        })
        return dados
    }

    async filtrarRegrasDaEmpresa() {
        const dados = await modelRegraEmpresa.find({}).populate('empresa').sort({
            date: -1
        })
        return dados
    }

    async pesquisarRegrasDaEmpresa(query) {
        
        const padraoRegExp = new RegExp(query, 'gi')
        const dados = await modelRegraEmpresa.find({area: padraoRegExp}).populate('empresa').sort({date: -1})
        return dados
    }

}

module.exports = RegraEmpresa;