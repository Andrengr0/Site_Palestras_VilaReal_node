// // Carregar o espaço para o preview da imagem
// var redimensionar = $('#preview').croppie({
//     // Ativar a leitura de orientação para renderizar corretamente a imagem
//     enableExif: true,

//     // Ativar orientação personalizada
//     enableOrientation: true,

//     // O recipiente interno do coppie. A parte visível da imagem
//     viewport: {
//         width: 200,
//         height: 220,
//         type: 'square'
//     },

//     // O recipiente externo do cortador
//     boundary: {
//         width: 300,
//         height: 300
//     }

// });

// // Executar a instrução quando o usuário selecionar uma imagem
// $('#arquivo').on('change', function () {

//     // FileReader para ler de forma assincrona o conteúdo dos arquivos
//     var reader = new FileReader();

//     // onload - Execute após ler o conteúdo
//     reader.onload = function (e) {
//         redimensionar.croppie('bind', {
//             // Recuperar a imagem base64
//             url: e.target.result
//         });
//     }

//     // O método readAsDataURL é usado para ler o conteúdo do tipo Blob ou File
//     reader.readAsDataURL(this.files[0]);
// });


// // Dentro do bloco de código onde você faz o recorte com o Croppie
// redimensionar.croppie('result', {
//     type: 'base64',
//     format: 'png', // Ajuste para o formato desejado (png, jpeg, etc.)
//     size: 'viewport'
// }).then(function (imagemBase64) {
//     $.ajax({
//         url: '/admin/cadastro/imagem',
//         method: 'POST',
//         data: { imagemBase64 },
//         success: function (response) {
//             // A resposta do servidor conterá o caminho da imagem
//             const imagePath = response.imagePath;

//             // Você pode usar imagePath como o caminho da imagem no formulário
//             // e enviá-lo junto com outros dados do formulário
//             $('#arquivoC').val(imagePath);

//             // Agora, envie o formulário completo para o endpoint de cadastro de palestra
//             // Certifique-se de ajustar o código HTML do formulário para incluir um campo para a imagem
//             // e quaisquer outros campos necessários

//             $('#form-palestra').submit(); // Substitua 'seu-formulario' pelo ID do seu formulário
//         },
//         error: function (err) {
//             console.error('Erro ao enviar a imagem:', err);
//         }
//     });
// });

