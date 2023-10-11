$(()=>{
    // $(document).ready(function(){
    //     console.log("jQuery ready!");
    // });

    // Função para exibir ou ocultar menu mobile
    $('.container-menu-mobile').click(function(){
        if($('#check-icon').is(':checked') == true){
            $('.container-menu-mobile > ul').show(300);
	    $('.container-menu-mobile > ul').css('z-index','333');
        }else{
            $('.container-menu-mobile > ul').hide(300);
        }
    })
    $('.header-2 > h5').click(function(){
			var offSetTop = $('#inicio');
			$('html,body').animate({'scrollTop':offSetTop});
			return false;
    })

    // Função para exibir ou ocultar menu secundário quando a página rola para baixo
    $(window).scroll(function(){
        let windowOffX = $(window).width();
        let windowOffY = $(window).scrollTop();

        if(windowOffY > 90 && windowOffX > 768){
            $('header').css('display:none');
            $('header-2').fadeIn();
        }
        if(windowOffY < 100){
            $('header').fadeIn();
            $('header-2').fadeOut();
        }
    })
    
    // Funções para dar o efeito hover em cada opção do menu conforme o scroll vai rolando
    $('.id-inicio').css('border-bottom','2px solid #ffffff');
    $(window).scroll(function(){
        let windowOffY = $(window).scrollTop();
        let windowHeight = $(window).height();
        // console.log(windowOffY)
        // console.log(windowHeight)
        
        $('section').each(function(){
            let elOffY = $(this).offset().top;
            // console.log(elOffY)
            let elOffContato = ($('.contato').offset().top)-500;
            if(elOffY-350 < windowOffY && windowOffY > windowHeight){
                $('header a, header-2 a').css('border','0');
                let target = $(this).attr('target');
                $('.'+target).css('border-bottom','2px solid #ffffff');
                return;
            }else if(windowOffY <= windowHeight){
                $('.id-inicio').css('border-bottom','2px solid #ffffff');
                $('.id-palestras').css('border','0');
                return;
            }else if(elOffContato < window){
                $('header a').css('border','0');
                $('.id-contato').css('border-bottom','2px solid #ffffff');
                $('.id-quem-somos').css('border','0');
            }   
        }) 
    })

    // Função para exibir e ocultar Historico de Palestras
    $('.btn-exibir-historico').click(function(){
        $('.box-historico-palestras').slideToggle();
        if(controler == 0){
            $('.btn-exibir-historico i').css('transform','rotate(0deg)').css('transition','0.3s');
            controler = 1;
        }else{
            $('.btn-exibir-historico i').css('transform','rotate(90deg)').css('transition','0.3s');
            controler = 0;
        }
    })
    // Alternativa para colocar efeito do icone "Arrow" do botão exibir historico
    $('.btn-exibir-historico').click()
    var controler = 1;
    $('.btn-exibir-historico i').css('transform','rotate(0deg)')

    // Função para rolar a barra até a seção escolhida pelo clique no menu
    $(function(){
        $('nav a').click(function(){
            var href = $(this).attr('href');
            // console.log($(this).attr('href'))
            let offSetTop = ($(href).offset().top)-160;
            // console.log(offSetTop);
            $('html,body').animate({'scrollTop':offSetTop});
            $('#check-icon').prop( "checked", false );
            $('.container-menu-mobile > ul').hide(300);
            return false;
        })
    })

})
