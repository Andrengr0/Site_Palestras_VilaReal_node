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
})