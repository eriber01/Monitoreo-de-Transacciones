import {
    loginForm,
    btnSubmit,
    formValidation,
    updateMenu,
    toggleSlide
} from './ui.js';
import { db, auth } from './connnectFirebase.js'
import { verifyAuth, handleErrorAuth } from './auth.js';
import { showBalance, deposit, withDraw } from './option.js';

let userId = undefined;
let globalDoc = undefined;

formValidation(loginForm);

/**
 * events
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('loading');
    verifyAuth();
});

btnSubmit.addEventListener('click', (ev) => {
    ev.preventDefault();

    let userAdmin = document.getElementById('correo').value;

    let user = loginForm[0].value;
    let password = loginForm[1].value;
    let email = `${user}@ab.com`;

    if (user === '' && password === '') {
        loginForm[0].classList.add('input-error');
        loginForm[1].classList.add('input-error');


    } else if (userAdmin == 'admin') {

        const reDireccionar = document.querySelector('#btn-submit');
        reDireccionar.setAttribute('href', '../master.html');
        reDireccionar.getAttribute('href');
        console.log(reDireccionar)

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
    console.log(globalDoc.data());
    showBalance(balance);
});


document.getElementById("submit-deposito").addEventListener('click', (ev) => {
    let updateBalance = document.getElementById('input-deposito').value;
    let { balance } = globalDoc.data();

    deposit(userId, balance, updateBalance);

})

document.getElementById("submit-retiro").addEventListener('click', function () {
    let updateBalance = document.getElementById('input-retiro').value;
    let { balance } = globalDoc.data();

    withDraw(userId, balance, updateBalance);

})

//logaut
document.querySelector('.atl-form').addEventListener('click', (ev) => {
    ev.preventDefault();

    auth.signOut().then(() => updateMenu());

    window.location.reload();
});

export default userId;