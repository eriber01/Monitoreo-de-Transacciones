
const loginForm = document.getElementsByName('form-input');
const btnSubmit = document.querySelector('#btn-submit');
let userId;
let globalDoc = undefined;


//verificamos si el usuario se logueo 
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(`user log in ${user.email}`)
    } else {
        console.log('log out');
    }
});

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

formValidation(loginForm);

const updateMenu = () => {
    $('.form-content').animate({
        height: "toggle",
        opacity: "toggle"
    }, 600);
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

const depositarDinero = (balanceActual) => {
    db.collection('balances').doc(userId).update({
        balance: balanceActual
    })
}

const showBalance = (bal) => {
    console.log(bal);
    innerBalance = `\n Su balance a la Fecha es: ${bal} pesos \n`;
    document.getElementById('balance').innerHTML = innerBalance;
    document.getElementById('balance').style.padding = '10px';
    toggleSlide("balance");
}

function toggleSlide(id){
    // map selector with id
    let selector = "#"+id;
    // class to add when the slide is toggled
    let className = "openned";

    // check if element is open, if true close it, otherwise, open it
    if($(selector).hasClass(className)){

        $(selector).toggleClass(className);
        $(selector).slideUp();
    }else{

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
    for(slide in otherSlides){
        var actualEl = otherSlides[`${slide}`];
        var elId = '#'+actualEl.id;
        $(elId).slideUp();
        $(elId).removeClass(className);
    }
}



//login
btnSubmit.addEventListener('click', (ev) => {
    /* ev.preventDefault(); */
    
   let userAdmin = document.getElementById('correo').value;

    let user = loginForm[0].value;
    let password = loginForm[1].value;
    let email = `${user}@ab.com`;
    
    if (user === '' && password === '') {
        loginForm[0].classList.add('input-error');
        loginForm[1].classList.add('input-error');


    }else if (userAdmin == 'admin') {
        
        const reDireccionar = document.querySelector('#btn-submit');
        reDireccionar.setAttribute('href', '../master.html');
        reDireccionar.getAttribute('href');
        console.log(reDireccionar)

        console.log('funiona')
    }
    
    else {

        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            //este es el id del usuario
            userId = cred.user.uid;

            //esto obtiene el balance individual de cada usuario
            db.collection('balances').doc(userId).onSnapshot((doc) => {
                globalDoc = doc;
                /*agregar el balance a html*/
                /*fin agregar balance a html*/
                /**datos al DOM de Depositar*/
            })
        }).then(() => {
            document.querySelector('.cod-form').reset();
            
            updateMenu();
        })
            .catch((err) => handleErrorAuth(error));
    }
});
document.getElementById('ver-blc').addEventListener('click', () => {
    showBalance(globalDoc.data().balance);
});
document.getElementById('depositar-click').addEventListener('click', function input_deposito() {
    console.log('depositar');
    toggleSlide("depositar");
    // document.getElementById('balance').style.display = 'none';
    // document.getElementById('retirar').style.display = 'none';
});


//tomar datos del input al hacer click
document.getElementById("submit-deposito").addEventListener('click', function (ev) {
    let dataDeposito = document.getElementById('input-deposito').value;

    if (dataDeposito == "" || dataDeposito == " ") {
        console.log('Debe introducir un valor por favor');

    } else {
        // console.log(typeof (dataDeposito));
        // console.log(`el monto de deposito es ${dataDeposito}`);

        let balanceActual = globalDoc.data().balance + Number(dataDeposito);
        console.log(balanceActual);

        db.collection('balances').doc(userId).update({
            balance: balanceActual
        })
    }

})


/**datos al DOM de retirar*/
document.getElementById('retirar-click').addEventListener('click', function input_retiro() {

    
    console.log('retiraar');
    toggleSlide("retirar");
    // document.getElementById('balance').style.display = 'none';
    // document.getElementById('depositar').style.display = 'none';
});

//tomar datos del input al hacer click

document.getElementById("submit-retiro").addEventListener('click', function () {
    let balRetiro = globalDoc.data();
    let dataRetiro = document.getElementById('input-retiro').value;
    console.log(balRetiro);

    if (dataRetiro > balRetiro.balance) {
        console.log(' No posee suficiente Balance para realizar transaccion')
    } else {
        if (dataRetiro == "" || dataRetiro == " ") {
            console.log('Debe introducir un valor por favor');
        } else {
            console.log(typeof (dataRetiro));
            console.log(`el monto de retiro es ${dataRetiro}`);
            let balanceActual = balRetiro.balance - dataRetiro;

            db.collection('balances').doc(userId).update({
                balance: balanceActual
            })
        }
    }

})

//logaut
document.querySelector('.atl-form').addEventListener('click', (ev) => {
    ev.preventDefault();

    auth.signOut().then(() => {
        updateMenu();
   
    });
   window.location.reload();
});