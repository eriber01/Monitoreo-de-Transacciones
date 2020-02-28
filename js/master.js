;(function(){




    let varScroll = false

    console.log($(window).height());

    $(window).scroll(function(){
        const ScrollDirection = EvaluarScroll()

        if ( window.screen.availHeight > 480 && ScrollDirection && !varScroll) {
            
            console.log("abajo")
            varScroll = true
            MostrarNavigation()
        }
        if (!ScrollDirection && varScroll) {
            
            console.log("arriba")
            varScroll = false
            OcultarNavigation();
        }
    })

    function MostrarNavigation(){
        $("#navegacion").addClass("nav-top")
    
        
        
    }

    function OcultarNavigation(){
        $("#navegacion").removeClass("nav-top")
     
    }

    function EvaluarScroll(){
        const $description = $("#navegacion")
        const descriptionHeight = $description.height()

        return $(window).scrollTop() > $(window).height() - (descriptionHeight * 11)
    }

})()


