//contrala los scroll de la pagina
window.onscroll = function(){
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('#scroll-up').classList.add('display-up');
    }else{
        document.querySelector('#scroll-up').classList.remove('display-up');
    }
}

document.querySelector('#scroll-up').addEventListener('click', function(){
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    })
})

document.querySelector('#nosotros').addEventListener('click', function(){
    console.log('fun')
    window.scrollTo({
        top: 9999999999999,
        behavior: "smooth"
    })
})


//controla la salida de la pagina

const btn_Salir = document.getElementById('sing-out')

btn_Salir.addEventListener('click', function(eve){
    eve.preventDefault()

    swal({
        title: "Seguro que deseas Salir?",
        text: "Si sales de la sesion tendras que loguearte una vez mas!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("LIsto! Has salido del sistema!", {
            icon: "success",
        })
            setTimeout(function(){
                window.location.href = 'index.html'
            }, 2000)
        ;
        } else {
            swal("Ah cancelado la salida del sistema!");
        }
    });
})