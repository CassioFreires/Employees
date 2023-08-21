import 'regenerator-runtime';
import 'core-js/stable';
import Empresa from './modules/empresa';

const btn = document.querySelector('#btn');
const btnPesquisarCep = document.querySelector('#pesquisar')
const codigo = document.querySelector('input[name="codigo"]');
const nome = document.querySelector('input[name="nome"]');
const cnpj = document.querySelector('input[name="cnpj"]');
let cep = document.querySelector('input[name="cep"]');
const rua = document.querySelector('input[name="rua"]');
const cidade = document.querySelector('input[name="cidade"]');
const estado = document.querySelector('input[name="estado"]');
const bairro = document.querySelector('input[name="bairro"]');
const numero = document.querySelector('input[name="numero"]');
const telefone = document.querySelector('input[name="telefone"]');
const celular = document.querySelector('input[name="celular"]');
const email = document.querySelector('input[name="email"]');
const addInforEmpresa = document.querySelector('#add-infor-empresa')
const salarioEmpresa = document.querySelector('input[name="salarioEmpresa"]')



function empresa() {
    const empresa = new Empresa(codigo, nome, cnpj, cep, rua, cidade, estado, bairro, numero, telefone, celular, email);

    // ouvindo o botao de pesquisar cep
    if (btnPesquisarCep) {
        btnPesquisarCep.addEventListener('click', e => {
            e.preventDefault();

            // função que retorna API externa das informações do cep
            empresa.apiCep()
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    rua.value = response.logradouro
                    cidade.value = response.localidade;
                    estado.value = response.uf;
                    bairro.value = response.bairro;
                })
                .catch((e) => {
                    console.log(e);
                    throw Error.prototype.message = 'Houve um erro interno ao tentar recuperar dados da API de cep';
                })
        })
    }

    if (codigo) {
        codigo.addEventListener('keyup', (e) => {
            const codigoRegex = codigo.value
                .replace(/\D/g, '')
                .replace(/[^0-9]/g, '')

            return e.target.value = codigoRegex;


        })
    }

    // formatando o cnpj com REGEX
    if (cnpj) {
        cnpj.addEventListener('keyup', (e) => {
            const cnpjRegex = cnpj.value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')

            return e.target.value = cnpjRegex;
        })
    }

    // formatando o cep com REGEX
    if (cep) {
        cep.addEventListener('keyup', (e) => {
            const cepRegex = cep.value
                .replace(/\D/g, '')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')

            return e.target.value = cepRegex;
        })
    }
    // formatando n° Telefone com REGEX
    if (telefone) {
        telefone.addEventListener('keyup', (e) => {
            const telefoneRegex = telefone.value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{4})\d+?$/, '$1')

            return e.target.value = telefoneRegex;
        })
    }

    // formatando n° Celular com REGEX
    if (celular) {
        celular.addEventListener('keyup', (e) => {
            const celularRegex = celular.value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')

            return e.target.value = celularRegex;
        })
    }

    if (salarioEmpresa) {
        salarioEmpresa.addEventListener('keyup', e => {
            var valor = salarioEmpresa.value;

            valor = valor + '';
            valor = parseInt(valor.replace(/[\D]+/g, ''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ",$1");

            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }

            salarioEmpresa.value = valor;
            if (valor == 'NaN') salarioEmpresa.value = '';

        })
    }

    if (addInforEmpresa) {
        addInforEmpresa.addEventListener('click', e => {
            const p = document.querySelector('.paragrafo-regras')
            const img = document.querySelector('.img-exclamation')
            const novasInforEmpresa = document.querySelector('#formulario-empresa-infor');
            p.textContent = '';
            img.removeAttribute('src')
            img.removeAttribute('style')
            img.removeAttribute('alt')
            img.removeAttribute('class')
            novasInforEmpresa.removeAttribute('hidden', 'hidden')
        })
    }

}

const selectInformacoes = document.getElementById('cargo-select')
function funcionario(){
    if (selectInformacoes) {
        selectInformacoes.addEventListener('change', e => {
            e.preventDefault()

    
            executa(selectInformacoes.value)
        })
    }
    
    async function executa(cargo) {
        const url = 'http://127.0.0.1:3000/admin/api/regrasdasempresas';
        const dados = await fetch(url)
            .then((dados) => {
                return dados.json()
            })
            .then((dadosJson) => {
                const areaFuncionario = document.querySelector('input[name="areaFuncionario"]')
                const departamentoFuncionario = document.querySelector('input[name="departamentoFuncionario"]')
                const salarioFuncionario = document.querySelector('input[name="salarioFuncionario"]')
                dadosJson.forEach((dado) => {
                    if (dado._id === cargo) {
                        areaFuncionario.value = dado.area;
                        departamentoFuncionario.value = dado.departamento;
                        salarioFuncionario.value = dado.salario;
                    }
                    if (cargo === 'Cargo do funcionário') {
                        areaFuncionario.value = '';
                        departamentoFuncionario.value = '';
                        salarioFuncionario.value = '';
                    }
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }
    
}
empresa();
funcionario();