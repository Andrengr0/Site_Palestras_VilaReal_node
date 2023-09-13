var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var palestraSchema = new Schema({
    titulo: String,
    local: String,
    data: String,
    horario: String,
    palestrante: String,
    imagem: String,
    conteudo: String,
    slug: String
},{collection:'palestras'})

var Palestras = mongoose.model("Palestras",palestraSchema);

module.exports = Palestras;