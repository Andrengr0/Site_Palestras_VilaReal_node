const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuariosSchema = new Schema({
  login: String,
  senha: String
}, {collection:'usuarios'});

var Usuarios = mongoose.model("Usuarios", usuariosSchema);

module.exports = Usuarios;