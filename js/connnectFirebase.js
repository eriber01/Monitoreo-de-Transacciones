// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAFVW6eXDo1WkwrJKH8xSs9b4uflUNlYDg",
    authDomain: "monitor-de-transacciones.firebaseapp.com",
    databaseURL: "https://monitor-de-transacciones.firebaseio.com",
    projectId: "monitor-de-transacciones"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

