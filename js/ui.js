
export const loginForm = document.getElementsByName('form-input');
export const btnSubmit = document.querySelector('#btn-submit');

export const formValidation = (form) => {
    form.forEach((input) => {
        input.addEventListener('blur', () => {
            if (input.value.length >= 1) {
                input.nextElementSibling.classList.add('active');
                input.nextElementSibling.classList.remove('error');
            } else if (input.value.length = " ") {
                input.nextElementSibling.classList.remove('active');
                input.nextElementSibling.classList.add('error')
            } else {
                input.nextElementSibling.classList.remove('active')
            }
        });
    });
}

export const updateMenu = () => {
    $('.form-content').animate({
        height: "toggle",
        opacity: "toggle"
    }, 600);
}

export const toggleSlide = (id) => {
    // map selector with id
    let selector = `#${id}`;
    // class to add when the slide is toggled
    let className = "openned";

    // check if element is open, if true close it, otherwise, open it
    if ($(selector).hasClass(className)) {

        $(selector).toggleClass(className);
        $(selector).slideUp();
    } else {

        $(selector).slideDown();
        $(selector).addClass(className);
    }

    // Get all slide elements
    let slideList = $(".slide");


    // Get other slides
    let otherSlides = slideList.filter(x => {
        var actual = slideList[`${x}`];
        var cond = actual.id !== id;
        return cond;
    });


    // Close other slides
    for (let slide in otherSlides) {
        var actualEl = otherSlides[`${slide}`];
        var elId = '#' + actualEl.id;
        $(elId).slideUp();
        $(elId).removeClass(className);
    }
}