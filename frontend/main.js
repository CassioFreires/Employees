import 'regenerator-runtime';
import 'core-js/stable';
import cep from './modules/cadastro';

// 
const btn = document.querySelector('#btn');

// 
let rua = document.querySelector('input[name="rua"]');
let cidade = document.querySelector('input[name="cidade"]');
let nCasa = document.querySelector('input[name="nCasa"]');
let bairro = document.querySelector('input[name="bairro"]');
let uf = document.querySelector('input[name="uf"]');
let cepLocal = document.querySelector('input[name="cep"]');

// 
const salario = document.querySelector('input[name="salario"]');

// formatando salario com regex
window.addEventListener("DOMContentLoaded", (event) => {
    if (salario) {
        salario.addEventListener('keyup', (e) => {

            let valor = e.target.value;
            valor = valor.replace(/[\D]+/g, '')
            valor = valor.replace(/([0-9]{2})$/g, ",$1");
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            e.target.value = valor;
        })
    }

});

// função quando aciona o botão de precourar cep
window.addEventListener('DOMContentLoaded', (e) => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            // 
            e.preventDefault()

            cep()
                .then((response) => {
                    return response.json();
                })
                .then((dados) => {
                    if (!dados) return;
                    try {
                        rua.value = dados.logradouro;
                        cidade.value = dados.localidade;
                        bairro.value = dados.bairro;
                        uf.value = dados.uf;

                        const teste = cepLocal.classList[2];
                        if (cepLocal.classList[2] === 'border-danger') {

                            cepLocal.classList = 'form-control border border-success';
                            rua.classList = ' form-control border border-success';
                            cidade.classList = ' form-control border border-success';
                            nCasa.classList = ' form-control border border-secondary';
                            bairro.classList = ' form-control border border-success';
                            uf.classList = ' form-control border border-success';
                            return
                        }
                    } catch (e) {
                        throw Error('Houve um erro interno ao processar os dados do cep.')
                    }

                })
                .catch((err) => {
                    cepLocal.classList.add('border-danger')
                    rua.classList.add('border-danger')
                    cidade.classList.add('border-danger')
                    nCasa.classList.add('border-danger')
                    bairro.classList.add('border-danger')
                    uf.classList.add('border-danger')

                    console.log(cepLocal);
                    console.log('houve um erro ao tentar exibir os dados do CEP' + e);
                })
        })
    }
})