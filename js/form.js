
const loginForm = document.getElementsByName('form-input');
const btnSubmit = document.querySelector('#btn-submit');


auth.onAuthStateChanged(user => {
    if (user) {
        console.log(`user log in ${user.email}`)
    } else {
        console.log('log out');
    }
});

const mostrarBalances = (data) => {
    data.forEach((doc) => {
        console.log(doc.data())
    })
}

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
            /**
             * esto obtiene el balance individual de cada usuario
             */
            db.collection('balances').doc(cred.user.uid).get().then((doc) => {
                console.log(doc.data())

                /*agregar el balance a html*/

                document.getElementById('ver-blc').addEventListener('click', function verBalance(){
                    let balance = doc.data();
                    console.log(Object.values(balance));
                    innerBalance = `Su balance a la Fecha es: ${Object.values(balance)} pesos`;
                    document.getElementById('balance').innerHTML = innerBalance;
                    
                    $('#balance').animate({
                        height: "toggle"
                    }, 600);
                });
                /*fin agregar balance a html*/
            })
        }).then(() => {
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