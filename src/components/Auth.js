import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCOogSyrvjdA6DZ-pXnJ8O_ITGgdFMev7Y",
  authDomain: "hello-marvel.firebaseapp.com",
  databaseURL: "https://hello-marvel.firebaseio.com",
  projectId: "hello-marvel",
  storageBucket: "hello-marvel.appspot.com",
  messagingSenderId: "787675840220"
};

firebase.initializeApp(config);

//Function file: refered to '../App.js'
export function anonymously() {
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });
}

export function authState(current, callback) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            current.setState({ uid: user.uid })
            callback()
        }
    })
}
