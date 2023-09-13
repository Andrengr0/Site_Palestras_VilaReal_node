const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const fs = require('fs');

const path = require('path');

const app = express();

const fileupload = require('express-fileupload');

 const Palestras = require('./Palestras.js');

var session = require('express-session');
const Palestrantes = require('./Palestrantes.js');
const Usuarios = require('./Usuarios.js');

mongoose.connect('mongodb+srv://andrengr:plD3r5AJ252spvhE@cluster0.hasljf3.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('Conectado com sucesso!');
}).catch(function(err){
    console.log(err.message);
})
app.use(express.json())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 360000 }}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/js', express.static(path.join(__dirname, 'js'))); não usado
app.set('views', path.join(__dirname, '/pages'));

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));


app.get('/', async (req, res) => {
  try {
    if (req.query.busca == null) {

        const palestras1 = await Palestras.find({}).sort({data: 1});
            var palestrasReturn= palestras1.map(function(val){
                return {
                    titulo: val.titulo,
                    local: val.local,
                    data: val.data,
                    horario: val.horario,
                    slug: val.slug,
                    conteudo: val.conteudo,
                    imagem: val.imagem
                }

            })
            
        const palestrantes1 = await Palestrantes.find({}).sort({imagem: 1});
            var palestrantesReturn= palestrantes1.map(function(val){
                return {
                    id: val._id,
                    nome: val.nome,
                    biografia: val.biografia,
                    imagem: val.imagem
                }
            })
            // console.log(palestrasReturn)
            // console.log(palestrantesReturn)
            res.render('home', {palestras: palestrasReturn, palestrantes: palestrantesReturn});   
    } 
  } catch (err) {
      console.error("Ocorreu um erro:", err);
      res.status(500).send("Erro ao buscar as palestras.");
  }
});


app.get('/:slug',async(req,res)=>{
    // res.send(req.params.slug);
    const requestPalestraSlug = req.params.slug;
    try {
        const updatedPalestra = await Palestras.findOneAndUpdate(
            { slug: requestPalestraSlug },
            { new: true }
        );
        
        if(updatedPalestra != null){
            const palestrasTop = await Palestras.find({}).sort({'_id': -1}); // Espera a execução da query
        let palestrasTop2= palestrasTop.map(function(val){
                return {
                    titulo: val.titulo,
                    local: val.local,
                    data: val.data,
                    horario: val.horario,
                    slug: val.slug,
                    conteudo: val.conteudo,
                    imagem: val.imagem,
                    palestrante: val.palestrante
                }
            })

            res.render('single', { palestraSingle: updatedPalestra, palestrasTop: palestrasTop2});
        }else{
            res.redirect('/')
        }
        
    } catch (err) {
        console.error("Ocorreu um erro:", err);
        res.status(500).send("Erro ao buscar a palestra.");
    }
})


app.post('/admin/cadastro/palestra', (req, res)=>{
    // Implementar no Banco de Dados
    // res.send("cadastrado com sucesso!")
    // console.log(req.body);
    // console.log(req.files);
    let formato = req.files.arquivo.name.split('.');
    let imagem = '';
    let imgExtensao = formato[formato.length - 1];
    imagem = new Date().getTime()+"."+imgExtensao;
    req.files.arquivo.mv(__dirname+"/public/images_palestras_palestrantes/"+imagem);

    Palestras.create({
        titulo: req.body.titulo_palestra,
        local: req.body.local_palestra,
        data: req.body.data_palestra,
        horario: req.body.horario_palestra,
        palestrante: req.body.palestrante,
        conteudo: req.body.conteudo_palestra,
        imagem: "https://chatnode.shop/public/images_palestras_palestrantes/"+imagem,
        slug: req.body.slug
    });
    res.redirect('/admin/login');
})


app.post('/admin/cadastro/palestrante', (req, res)=>{
   
    let formato = req.files.arquivo_palestrante.name.split('.');
    let imagem = '';
    let imgExtensao = formato[formato.length - 1];
    imagem = new Date().getTime()+"."+imgExtensao;
    req.files.arquivo_palestrante.mv(__dirname+"/public/images_palestras_palestrantes/"+imagem);

    Palestrantes.create({
        nome: req.body.nome,
        biografia: req.body.biografia,
        imagem: "https://chatnode.shop/public/images_palestras_palestrantes/"+imagem
    });
    res.redirect('/admin/login');
})

app.get('/admin/deletar/palestra/:id/:imagem',(req,res)=>{
    fs.unlink(__dirname+"/public/images_palestras_palestrantes/"+req.params.imagem, ()=>{}); 
    // console.log(req.params.imagem);
    Palestras.deleteOne({_id:req.params.id}).then(function(){
    res.redirect('/admin/login')
    });

})

app.get('/admin/deletar/palestrante/:id/:imagem',(req,res)=>{
    fs.unlink(__dirname+"/public/images_palestras_palestrantes/"+req.params.imagem, ()=>{}); 
    // console.log(req.params.imagem);
    Palestrantes.deleteOne({_id:req.params.id}).then(function(){
        res.redirect('/admin/login')
        });
})


app.post("/admin/login", async (req, res) => {
    try {
        const { login, senha } = req.body;
        const usuario = await Usuarios.findOne({ login, senha });

        if (usuario) {
            req.session.login = usuario.login;
            res.redirect('/admin/login');
        } else {
            res.status(401).send("Credenciais inválidas.");
        }
    } catch (err) {
        console.error("Ocorreu um erro:", err);
        res.status(500).send("Erro ao autenticar o usuário.");
    }
});

app.get('/admin/login',(req,res)=>{
    if(req.session.login == null){
        res.render('admin-login')
    }else{
        Palestras.find({}).sort({'_id': -1}).then(function(palestras){
            palestras= palestras.map(function(val){
                let linkImage = (val.imagem).split("/");
                let formatLinkImage = linkImage[linkImage.length - 1];
                return {
                    id: val._id,
                    titulo: val.titulo,
                    imagem: formatLinkImage
                }
            })
            
            Palestrantes.find({}).sort({'_id': 1}).then(function(palestrantes){
                palestrantes= palestrantes.map(function(val){
                    let linkImage = (val.imagem).split("/");
                    let formatLinkImage = linkImage[linkImage.length - 1];
                    return {
                        id: val._id,
                        nome: val.nome,
                        imagem: formatLinkImage
                    }
                })
                res.render('admin-panel', {palestras: palestras, palestrantes: palestrantes});
            })  
        })  
    }
})

app.listen(5500,()=>{
    console.log('server rodando!');
})