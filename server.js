const express = require('express');
const mongoose = require('mongoose');
const routeAdmin = require('./src/routers/Admin/routes')
const path = require('path')
const middleware = require('./src/middlewares/middlewareGlobal');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// porta do servidor
const PORT = process.env.PORT || 3000;

// conexão com o banco de dados
const localhost = 'mongodb://127.0.0.1:27017/employees';
mongoose.connect(localhost, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('pronto')
    console.log('conectado ao banco de dados');
})
.catch((e) => {
    console.log('houve um erro ao tentar conectar ao banco de dados');
})

//config body
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

// config pasta public
app.use(express.static(path.resolve(__dirname, 'public')))

// config session
app.use(session({
    secret: 'Freires2@',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())

// config ejs
app.set('view engine', 'ejs')
app.set('views', './src/views');





// rota principal
app.get('/', (req, res) => {
    res.send('pagina incial do sistema de cadastro de funcionario')
})

// middleware
app.use(middleware.global);

// rota do adm
app.use(routeAdmin)

// criando o servidor http
app.on('pronto', () => {
    app.listen(PORT, () => console.log('Servidor rodando http rodando na porta: ' + PORT))
})
