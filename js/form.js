(function(){
    $(document).ready(function(){
        $('.atl-form').click(function(){
            $('.form-content').animate({
                height: "toggle",
                opacity: "toggle"
            }, 600)
        });
        let form_registro = document.getElementsByName('form-input');
        for (let i = 0; i < form_registro.length; i++) {
            
            form_registro[i].addEventListener('blur', function(){
                if(this.value.length >= 1){
                    this.nextElementSibling.classList.add('active');
                    this.nextElementSibling.classList.remove('error');
                }else if(this.value.length = " "){
                    this.nextElementSibling.classList.remove('active');
                    this.nextElementSibling.classList.add('error')
                }else{
                    this.nextElementSibling.classList.remove('active')
                }
            })
            
        }
    })
}())