export default class Empresa {
    constructor(codigo, nome, cnpj, cep, rua, cidade, estado, bairro, numero, telefone, celular, email) {
        this.codigo = codigo;
        this.nome = nome;
        this.cnpj = cnpj;
        this.cep = cep;
        this.rua = rua;
        this.cidade = cidade;
        this.estado = estado;
        this.bairro = bairro;
        this.numero = numero;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
    }

}

// função que retorna uma API de cep externa
Empresa.prototype.apiCep = async function () {

    if (!this.cep.value || this.cep.value === '' || typeof this.cep.value === 'undefined' || typeof this.cep.value === null || this.cep.value.length < 8) {
        this.cep.classList = 'form-control border border-danger';
        this.rua.classList = 'form-control border border-danger';
        this.cidade.classList = 'form-control border border-danger';
        this.estado.classList = 'form-control border border-danger';
        this.bairro.classList = 'form-control border border-danger';

        this.rua.value = '';
        this.cidade.value = '';
        this.estado.value = '';
        this.bairro.value = '';

    } else {
        this.cep.classList = 'form-control border border-success';
        this.rua.classList = 'form-control border border-success';
        this.cidade.classList = 'form-control border border-success';
        this.estado.classList = 'form-control border border-success';
        this.bairro.classList = 'form-control border border-success';
    }
    try {
        const url = `https://viacep.com.br/ws/${this.cep.value}/json`;
        const dados = await fetch(url)
        return dados;
        
    } catch (e) {
        throw  Error.prototype.message = 'Houve um erro interno na requisição http - Ánalise novamente o código,';
    } 

   
}


// Empresa.prototype.valida = function () {
//     if (!this.codigo.value || this.codigo.value === '' || typeof this.codigo.value === 'undefined' || typeof this.codigo.value === null) {
//         return false
//     }
//     if (!this.nome.value || this.nome.value === '' || typeof this.nome.value === 'undefined' || typeof this.nome.value === null) {
//         return false
//     }
//     if (!this.cnpj.value || this.cnpj.value === '' || typeof this.cnpj.value === 'undefined' || typeof this.cnpj.value === null || this.cnpj.value.length > 19) {
//         return false
//     }
//     if (!this.cep.value || this.cep.value === '' || typeof this.cep.value === 'undefined' || typeof this.cep.value === null || this.cep.value.length < 8) {
//         return false
//     }
//     if (!this.telefone.value || this.telefone.value === '' || typeof this.telefone.value === 'undefined' || typeof this.telefone.value === null) {
//         return false
//     }
//     if (!this.celular.value || this.celular.value === '' || typeof this.celular.value === 'undefined' || typeof this.celular.value === null) {
//         return false
//     }
// }