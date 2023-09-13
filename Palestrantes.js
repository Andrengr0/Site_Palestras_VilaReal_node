var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var palestranteSchema = new Schema({
    nome: String,
    biografia: String,
    imagem: String
},{collection:'palestrantes'});

var Palestrantes = mongoose.model("Palestrantes",palestranteSchema);

module.exports = Palestrantes;