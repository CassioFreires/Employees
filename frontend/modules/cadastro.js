export default async function cep() {
    const inputCep = document.querySelector('input[name="cep"]');
    const url = `https://viacep.com.br/ws/${inputCep.value}/json`;
    try{
        const dados = await fetch(url);
        return dados
    }catch(e){
        throw Error('Houve um erro interno ao tentar mostrar os dados')
    }

}

