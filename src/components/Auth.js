import * as firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCOogSyrvjdA6DZ-pXnJ8O_ITGgdFMev7Y",
    authDomain: "hello-marvel.firebaseapp.com",
    databaseURL: "https://hello-marvel.firebaseio.com",
    projectId: "hello-marvel",
    storageBucket: "",
    messagingSenderId: "787675840220"
};

firebase.initializeApp(config);

//Function file: refered to '../App.js'

export function authState(current, callback) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            current.setState({ uid: user.uid })
            callback()
        }
    })
}