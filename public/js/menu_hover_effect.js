$(()=>{
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
            if(elOffY-350 < windowOffY){
                $('header a, header-2 a').css('border','0');
                let target = $(this).attr('target');
                $('.'+target).css('border-bottom','2px solid #ffffff');
                return;
            }else if(windowOffY <= windowHeight+30){
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
})