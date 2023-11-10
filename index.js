const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const fs = require('fs');

const path = require('path');

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); // Aumente esse limite conforme necessário
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Aumente esse limite conforme necessário

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

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 360000 }}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/js', express.static(path.join(__dirname, 'js'))); não usado
app.set('views', path.join(__dirname, '/pages'));

app.use(fileupload({
    useTempFiles: false //,
    // tempFileDir: path.join(__dirname, 'temp')
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


app.post('/admin/cadastro/palestra', async (req, res) => {
    try {
        const slug = new Date().getTime()+'0';
        const { titulo_palestra, local_palestra, data_palestra, horario_palestra, palestrante, conteudo_palestra } = req.body;
        const imagem = req.body.imagem_recortada; // Agora, o caminho da imagem já está no req.body

        const palestra = await Palestras.create({
            titulo: titulo_palestra,
            local: local_palestra,
            data: data_palestra,
            horario: horario_palestra,
            palestrante: palestrante,
            conteudo: conteudo_palestra,
            imagem: imagem, // Use o caminho da imagem recebido no req.body
            slug: slug
        });

        res.redirect('/admin/login');
    } catch (err) {
        console.error('Erro ao cadastrar a palestra:', err);
        res.status(500).send('Erro ao cadastrar a palestra.');
    }
});

app.post('/admin/cadastro/imagem', (req, res) => {
    const base64Data = req.body.imagemBase64;

    // Analise a extensão da imagem a partir dos dados base64
    const matches = base64Data.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return res.status(400).send('Formato de imagem inválido');
    }

    const imageExtension = matches[1];
    const fileName = new Date().getTime() + '.' + imageExtension; // Use a extensão da imagem
    const imagePath = path.join(__dirname, 'public', 'images_palestras_palestrantes', fileName);
    const imagePathMod = 'https://vilarealpalestras.com.br/public/images_palestras_palestrantes/'+ fileName;

    // Decodifique e salve a imagem
    fs.writeFile(imagePath, matches[2], 'base64', (err) => {
        if (err) {
            console.error('Erro ao salvar a imagem:', err);
            res.status(500).send('Erro ao salvar a imagem.');
        } else {
            res.json({ success: true, imagePathMod });
        }
    });
});


app.post('/admin/cadastro/palestrante', async (req, res) => {
    try {
        const { nome, biografia} = req.body;
        const imagem = req.body.imagem_recortada_palestrante; // Agora, o caminho da imagem já está no req.body

        const palestrante = await Palestrantes.create({
            nome: nome,
            biografia: biografia,
            imagem: imagem // Use o caminho da imagem recebido no req.body
        });

        res.redirect('/admin/login');
    } catch (err) {
        console.error('Erro ao cadastrar o palestrante:', err);
        res.status(500).send('Erro ao cadastrar o palestrante.');
    }
});


app.get('/admin/deletar/palestra/:id/:imagem', (req, res) => {
    fs.unlink(__dirname+'/public/images_palestras_palestrantes/'+req.params.imagem, (err) => {
        if (err) {
            console.error('Erro ao excluir o arquivo:', err);
        }
        Palestras.deleteOne({ _id: req.params.id }).then(function () {
            res.redirect('/admin/login');
        });
    });
})


app.get('/admin/deletar/palestrante/:id/:imagem',(req,res)=>{
    fs.unlink(__dirname+'/public/images_palestras_palestrantes/'+req.params.imagem, (err) => {
        if (err) {
            console.error('Erro ao excluir o arquivo:', err);
        }
    Palestrantes.deleteOne({_id:req.params.id}).then(function(){
        res.redirect('/admin/login')
        });
    })
})

app.get('/admin/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Erro ao encerrar a sessão:', err);
        res.status(500).send('Erro ao encerrar a sessão.');
      } else {
        res.redirect('/'); // Redirecione para a página inicial ou qualquer outra página desejada
      }
    });
});  

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
                let imagem = val.imagem;
                let linkImage = imagem.split("/");
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