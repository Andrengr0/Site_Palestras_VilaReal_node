$(()=>{
    // Função para exibir ou ocultar menu mobile
    let iconMenu = $('.container-menu-mobile');
    iconMenu.click(function(){
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
})