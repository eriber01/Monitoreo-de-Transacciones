import { toggleSlide } from './ui.js'
import { db } from './connnectFirebase.js';

const showBalance = (balance) => {
    console.log(balance);
    let innerBalance = `\n Su balance a la Fecha es: ${balance} pesos \n`;
    document.getElementById('balance').innerHTML = innerBalance;
    document.getElementById('balance').style.padding = '10px';
    toggleSlide("balance");
}

const deposit = (userId, balance, updateBalance) => {
    if (updateBalance == "" || updateBalance == " ") {
        console.log('Debe introducir un valor por favor');

    } else {

        let newBalance = balance + Number(updateBalance);

        db.collection('balances').doc(userId).update({
            balance: newBalance
        })
    }
}

const withDraw = (userId, balance, updateBalance) => {
    if (updateBalance >= balance) {
        console.log(' No posee suficiente Balance para realizar transaccion')
    } else {
        if (updateBalance == "" || updateBalance == " ") {
            console.log('Debe introducir un valor por favor');

        } else {

            let newBalance = balance - updateBalance;

            db.collection('balances').doc(userId).update({
                balance: newBalance
            })
        }
    }
}

export {
    showBalance,
    deposit,
    withDraw
}