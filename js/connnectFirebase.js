const firebaseConfig = {
    apiKey: "AIzaSyCipUSCcrJPTczcBJDADwmeErMZXoS054o",
    authDomain: "app-banco-358a7.firebaseapp.com",
    databaseURL: "https://app-banco-358a7.firebaseio.com",
    projectId: "app-banco-358a7",
    storageBucket: "app-banco-358a7.appspot.com",
    messagingSenderId: "921234661302",
    appId: "1:921234661302:web:57250d2241ad7ac4542b17"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();