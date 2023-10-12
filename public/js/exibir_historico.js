$(()=>{
    // $(document).ready(function(){
    //     console.log("jQuery ready!");
    // });
    
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
})
