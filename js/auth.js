import { auth } from './connnectFirebase.js'

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
const handleErrorAuth = (error) => {
    if (error.code == "auth/user-not-found") {
        loginForm[0].classList.add('input-error');
        loginForm[1].classList.add('input-error');

    } else if (error.code == "auth/wrong-password") {
        loginForm[0].classList.remove('input-error');
        loginForm[1].classList.add('input-error');
    }
}

export { verifyAuth, handleErrorAuth };