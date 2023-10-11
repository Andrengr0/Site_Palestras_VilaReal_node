$(()=>{
    // Sliders das imagem de apresentação na página inicial
    $('.bg-img-palestra .container-fluid .bg-image').slick({
        centerMode: false,
        infinite: true,
        slidesToShow: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        speed: 1000,
        autoplaySpeed: 2800
    })

    $('.palestrantes .container > .box-palestrantes').slick({
        centerMode: false,
        infinite: false,
        dots: false,
        autoplay: false,
        arrows: true,
        slidesToShow: 3,
        centerPadding: '10px',
        slidesToScroll: 2,

        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }]
    })
})