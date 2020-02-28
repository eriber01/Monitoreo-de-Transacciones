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