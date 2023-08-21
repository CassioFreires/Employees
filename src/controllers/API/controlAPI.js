const regrasDasEmpresas = require('../../models/ModelRegraEmpresa');

exports.apiRegrasDaEmpresa = async(req, res) => {
    regrasDasEmpresas.prototype.filtrarRegrasDaEmpresa()
    .then((dados) => {
        res.send(dados)
    })
    .catch((e) => {
        console.log(e);
    })
   
}