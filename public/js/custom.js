$(()=>{

    $('.btn-cadastrar-palestra').click(function(){
        $('#form-palestra').fadeIn();

        let offSetTop = ($('#form-palestra').offset().top)-80;
        $('html,body').animate({'scrollTop':offSetTop});
    })

    $('.btn-cadastrar-palestrante').click(function(){
        $('#form-palestrante').fadeIn();

        let offSetTop = ($('#form-palestrante').offset().top)-80;
        $('html,body').animate({'scrollTop':offSetTop});
    })
})

    var redimensionar = $('#preview').croppie({
        // Ativar a leitura de orientação para renderizar corretamente a imagem
        enableExif: true,
    
        // Ativar orientação personalizada
        enableOrientation: true,
    
        // O recipiente interno do coppie. A parte visível da imagem
        viewport: {
            width: 200,
            height: 220,
            type: 'square'
        },
    
        // O recipiente externo do cortador
        boundary: {
            width: 300,
            height: 320
        }
    
    });
    
    function previewImagePalestra(input) {
        let arquivo = document.getElementById('arquivo');
        // console.log(arquivo.files[0].type);
        const formatosAceitos = ["image/png"]
        if(formatosAceitos.includes(arquivo.files[0].type) == false){
            arquivo.value = '';
            alert("Erro: formato de arquivo de imagem inválido! Converta a imagem para a extensão .png")
        }

        redimensionar.css('display','block');
        // FileReader para ler de forma assincrona o conteúdo dos arquivos
        var reader = new FileReader();
        
        // onload - Execute após ler o conteúdo
        reader.onload = function (e) {
        
            redimensionar.croppie('bind', {
                // Recuperar a imagem base64
                url: e.target.result
            });
        }
    
        // O método readAsDataURL é usado para ler o conteúdo do tipo Blob ou File
        reader.readAsDataURL(input.files[0]);
    }
   
    // Adicione um evento de clique ao botão de confirmação
    $('#cadastrar_palestra').click(function () {
        // Obtenha a imagem cortada do Croppie
        redimensionar.croppie('result', {
        type: 'base64',
        format: 'png', // Ajuste para o formato desejado (png, jpeg, etc.)
        size: 'viewport'
        }).then(function (imagemBase64) {
        $.ajax({
            url: '/admin/cadastro/imagem',
            method: 'POST',
            data: { imagemBase64 },
            success: function (response) {
                // A resposta do servidor conterá o caminho da imagem
                const imagePath = response.imagePathMod;
        
                // Você pode usar imagePath como o caminho da imagem no formulário
                // e enviá-lo junto com outros dados do formulário
                $('#imagem_recortada').val(imagePath);
                // $('#confirm-image').css('background-color', 'green');
        
                // Agora, envie o formulário completo para o endpoint de cadastro de palestra
        
                $('#form-palestra').submit(); // Substitua 'seu-formulario' pelo ID do seu formulário
            },
            error: function (err) {
                console.error('Erro ao enviar a imagem:', err);
            }
            });
        });
    });

// ********************************************************************************
// ********************************************************************************


    var redimensionar_palestrante = $('#preview-palestrante').croppie({
        // Ativar a leitura de orientação para renderizar corretamente a imagem
        enableExif: true,
    
        // Ativar orientação personalizada
        enableOrientation: true,
    
        // O recipiente interno do coppie. A parte visível da imagem
        viewport: {
            width: 200,
            height: 220,
            type: 'square'
        },
    
        // O recipiente externo do cortador
        boundary: {
            width: 300,
            height: 320
        }
    
    });
    
    function previewImage(input) {
        let arquivo = document.getElementById('arquivo_palestrante');
    // console.log(arquivo.files[0].type);
    const formatosAceitos = ["image/png"]
    if(formatosAceitos.includes(arquivo.files[0].type) == false){
        arquivo.value = '';
        alert("Erro: formato de arquivo de imagem inválido! Converta a imagem para a extensão .png")
    }
        redimensionar_palestrante.css('display','block');
        // FileReader para ler de forma assincrona o conteúdo dos arquivos
        var reader = new FileReader();
        
        // onload - Execute após ler o conteúdo
        reader.onload = function (e) {
        
            redimensionar_palestrante.croppie('bind', {
                // Recuperar a imagem base64
                url: e.target.result
            });
        }
    
        // O método readAsDataURL é usado para ler o conteúdo do tipo Blob ou File
        reader.readAsDataURL(input.files[0]);
    }
   
    // Adicione um evento de clique ao botão de confirmação
    $('#cadastrar_palestrante').click(function () {
        // Obtenha a imagem cortada do Croppie
        redimensionar_palestrante.croppie('result', {
        type: 'base64',
        format: 'png', // Ajuste para o formato desejado (png, jpeg, etc.)
        size: 'viewport'
        }).then(function (imagemBase64) {
        $.ajax({
            url: '/admin/cadastro/imagem',
            method: 'POST',
            data: { imagemBase64 },
            success: function (response) {
                // A resposta do servidor conterá o caminho da imagem
                const imagePath = response.imagePathMod;
        
                // Você pode usar imagePath como o caminho da imagem no formulário
                // e enviá-lo junto com outros dados do formulário
                $('#imagem_recortada_palestrante').val(imagePath);
                // $('#confirm-image').css('background-color', 'green');
        
                // Agora, envie o formulário completo para o endpoint de cadastro de palestra
        
                $('#form-palestrante').submit(); // Substitua 'seu-formulario' pelo ID do seu formulário
            },
            error: function (err) {
                console.error('Erro ao enviar a imagem:', err);
            }
            });
        });
    });