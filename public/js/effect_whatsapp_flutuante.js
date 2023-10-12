$(()=>{
    // Icone do whatsapp flutuante ficar pulsando
    setInterval(function(){
        $('.icon-whatsapp-flutuante').css('scale', '1.105');
        setTimeout(function(){
          $('.icon-whatsapp-flutuante').css('scale', '0.95');
        },1000)
      },2000);
})