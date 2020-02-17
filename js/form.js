
const loginForm = document.getElementsByName('form-input');
const btnSubmit = document.querySelector('#btn-submit');

//validation form
loginForm.forEach((input) => {
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

//login
btnSubmit.addEventListener('click', (ev) => {
    ev.preventDefault();

    let user = loginForm[0].value;
    let password = loginForm[1].value;
    let email = `${user}@ab.com`;

    if (user === '' && password === '') {
        loginForm[0].classList.add('input-error');
        loginForm[1].classList.add('input-error');

    } else {
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            document.querySelector('.cod-form').reset();
            $('.form-content').animate({
                height: "toggle",
                opacity: "toggle"
            }, 600);
        })
            .catch((err) => {
                if (err.code == "auth/user-not-found") {
                    loginForm[0].classList.add('input-error');
                    loginForm[1].classList.add('input-error');

                } else if (err.code == "auth/wrong-password") {
                    loginForm[0].classList.remove('input-error');
                    loginForm[1].classList.add('input-error');
                }
            });
    }
});

//logaut
document.querySelector('.atl-form').addEventListener('click', (ev) => {
    ev.preventDefault();
    auth.signOut().then(() => {
        $('.form-content').animate({
            height: "toggle",
            opacity: "toggle"
        }, 600);
    });
});