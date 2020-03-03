
/**
 * global variables
 */

const loginForm = document.getElementsByName('form-input');
const btnSubmit = document.querySelector('#btn-submit');
let userId = undefined;
let globalDoc = undefined;



/*
* Alert Funtion
*/

function Alert(){
    swal("La transaccion se realizo de manera exitosa");
}


//verify if user log in
const verifyAuth = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(`user log in ${user.email}`)
        } else {
            console.log('log out');
        }
    });
}

//handle error auth firebase
handleErrorAuth = (error) => {
    if (error.code == "auth/user-not-found") {
        loginForm[0].classList.add('input-error');
        loginForm[1].classList.add('input-error');

    } else if (error.code == "auth/wrong-password") {
        loginForm[0].classList.remove('input-error');
        loginForm[1].classList.add('input-error');
    }
}


const showBalance = (balance) => {
    console.log(balance);
    innerBalance = `\n Su balance a la Fecha es: ${balance} pesos \n`;
    document.getElementById('balance').innerHTML = innerBalance;
    document.getElementById('balance').style.padding = '10px';
    toggleSlide("balance");
}

const deposit = (lastBalance, updateBalance) => {
    if (updateBalance == "" || updateBalance == " ") {
        console.log('Debe introducir un valor por favor');

    } else {

        let newBalance = lastBalance + Number(updateBalance);

        db.collection('balances').doc(userId).update({
            balance: newBalance
        })


        db.collection('balances').doc(userId).get().then((snapshot) => {
            let username = snapshot.data().username;

            const newTransaction = {
                processType: 'deposit',
                username,
                lastBalance,
                newBalance,

            }

            addTransaction(newTransaction);
        });
        Alert()
    }
}

const withDraw = (lastBalance, updateBalance) => {
    if (updateBalance >= lastBalance) {
        console.log(' No posee suficiente Balance para realizar transaccion')
    } else {
        if (updateBalance == "" || updateBalance == " ") {
            console.log('Debe introducir un valor por favor');

        } else {

            let newBalance = lastBalance - updateBalance;

            db.collection('balances').doc(userId).update({
                balance: newBalance
            })

            db.collection('balances').doc(userId).get().then((snapshot) => {
                let username = snapshot.data().username;

                const newTransaction = {
                    username,
                    lastBalance,
                    newBalance,
                    processType: 'withDraw'
                }

                addTransaction(newTransaction);
            });
            Alert();
        }
    }
}

const addTransaction = (payload) => {
    console.log(payload);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    db.collection('transactions').add({
        ...payload,
        createdAt: timestamp()
    });
}

const formValidation = (form) => {
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

const updateMenu = () => {
    $('.form-content').animate({
        height: "toggle",
        opacity: "toggle"
    }, 600);
}

const toggleSlide = (id) => {
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
    for (slide in otherSlides) {
        var actualEl = otherSlides[`${slide}`];
        var elId = '#' + actualEl.id;
        $(elId).slideUp();
        $(elId).removeClass(className);
    }
}

formValidation(loginForm);

/**
 * events
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('loading');
    verifyAuth();
});

btnSubmit.addEventListener('click', (ev) => {
    /* ev.preventDefault(); */

    /*    let userAdmin = document.getElementById('correo').value;
     */
    let user = loginForm[0].value;
    let password = loginForm[1].value;
    let email = `${user}@ab.com`;

    if (user === '' && password === '') {
        loginForm[0].classList.add('input-error');
        loginForm[1].classList.add('input-error');


    } else if (user == 'admin') {

        window.location.href = '../master.html';

        console.log('funciona')
    }

    else {

        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            //este es el id del usuario
            userId = cred.user.uid;

            //esto obtiene el balance
            db.collection('balances').doc(userId).onSnapshot((doc) => {
                globalDoc = doc;
            })
        }).then(() => {
            document.querySelector('.cod-form').reset();

            updateMenu();
        })
            .catch((err) => handleErrorAuth(error));
    }
});


document.getElementById('retirar-click').addEventListener('click', () => {
    toggleSlide("retirar");
});

document.getElementById('depositar-click').addEventListener('click', () => {
    toggleSlide("depositar");
});


document.getElementById('ver-blc').addEventListener('click', () => {
    let { balance } = globalDoc.data();

    showBalance(balance);
});


document.getElementById("submit-deposito").addEventListener('click', (ev) => {
    let updateBalance = document.getElementById('input-deposito').value;
    /* swal('el') */
    let { balance } = globalDoc.data();

    deposit(balance, updateBalance);
    document.getElementById('input-deposito').value = "";
})

document.getElementById("submit-retiro").addEventListener('click', function () {
    let updateBalance = document.getElementById('input-retiro').value;
    let { balance } = globalDoc.data();

    withDraw(balance, updateBalance);
    document.getElementById('input-retiro').value = "";
})

//logaut
document.querySelector('.atl-form').addEventListener('click', (ev) => {
    ev.preventDefault();

    auth.signOut().then(() => updateMenu());

    window.location.reload();
});