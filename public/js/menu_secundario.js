$(()=>{
    // Função para exibir ou ocultar menu secundário quando a página rola para baixo
    $(window).scroll(function(){
        let windowOffX = $(window).width();
        let windowOffY = $(window).scrollTop();

        if(windowOffY > 90 && windowOffX > 768){
            
            $('header-2').css('display','block');
        }
        if(windowOffY <= 90){
            
            $('header-2').fadeOut();
        }
    })
})