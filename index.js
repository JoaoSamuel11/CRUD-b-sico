const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configurar a conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function() {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

// Configurar o Express
const app = express();
app.use(bodyParser.json());

// Definir o esquema do objeto que será armazenado no MongoDB
const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rotas para o CRUD

//findAll
app.get('/usuarios', function(req, res) {
  Usuario.find(function(err, usuarios) {
    if (err) {
      res.send(err);
    } else {
      res.send(usuarios);
    }
  });
});

//find
app.get('/usuarios/:id', function(req, res) {
  Usuario.findById(req.params.id, function(err, usuario) {
    if (err) {
      res.send(err);
    } else {
      res.send(usuario);
    }
  });
});

//create
app.post('/usuarios', function(req, res) {
  const novoUsuario = new Usuario(req.body);
  novoUsuario.save(function(err, usuario) {
    if (err) {
      res.send(err);
    } else {
      res.send(usuario);
    }
  });
});

//update
app.put('/usuarios/:id', function(req, res) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function(err, usuario) {
    if (err) {
      res.send(err);
    } else {
      res.send(usuario);
    }
  });
});

//delete
app.delete('/usuarios/:id', function(req, res) {
  Usuario.findByIdAndDelete(req.params.id, function(err, usuario) {
    if (err) {
      res.send(err);
    } else {
      res.send(usuario);
    }
  });
});

// Iniciar o servidor
app.listen(3000, function() {
  console.log('Servidor iniciado na porta 3000');
});