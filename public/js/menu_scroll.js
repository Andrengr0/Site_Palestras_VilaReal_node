$(()=>{
    // Função para rolar a barra até a seção escolhida pelo clique no menu
    $(function(){
        $('.nav a').click(function(){
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

    const scales = ['1.1', '1.0']

    var i = 0;
    let interval = setInterval(function(){
      $('.icon-whatsapp-flutuante').css('scale', '1.1');
      setTimeout(function(){
        $('.icon-whatsapp-flutuante').css('scale', '0.95');
      },1000)
    },2000);

})