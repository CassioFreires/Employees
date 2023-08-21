const mongoose = require('mongoose');

const schemaFuncionario = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    estadoCivil: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    // ENDEREÇO
    endereco: {
        cep: {
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
        },

    },
    // CARTEIRA DE TRABALHO
    ctps: {
        pis: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        serie: {
            type: String,
            required: true
        },
        uf: {
            type: String,
            required: true,
        }
    },
    // IDENTIDADE
    identidade: {
        cpf: {
            type: String,
            required: true
        },
        rg: {
            type: String,
            required: true
        },
        dataExp: {
            type: String,
            required: true
        },
    },
    // TITULO DE ELEITO
    tituloEleitor: {
        numeroInscricao: {
            type: String,
            required: true
        },
        zona: {
            type: String,
            required: true
        },
        secao: {
            type: String,
            required: true
        },
    },
    // CERTIFICADO MILITAR
    certificacaoMilitar: {
        numero: {
            type: String,
            required: true
        },
        naturalidade: {
            type: String,
            required: true
        },
    },
    cnh: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: false
    },
    // FUNÇÃO DO FUNCIONARIO
    funcao: {
        area: {
            type: String,
            require: true,

            departameto: {
                type: String,
                required: true,

                cargo: {
                    type: String,
                    required: true,

                    salario: {
                        type: String,
                        require: true
                    }
                }
            }
        },
    },
    // CONTATO
    contato: {
        telefone: {
            type: String,
            required: true,
        },
        telefoneRecado: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
    },
    // RELACIONAMENTO POR REFERENCIA 
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa'
    },

    date: {
        type: Date,
        required: Date.now
    }

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



module.exports = Funcionario;