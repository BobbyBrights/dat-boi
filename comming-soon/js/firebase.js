/**
 * Created by Lukas on 20.12.2016.
 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJNib8-JVa5f3Od6N5f2Aus4QDN0aNqIs",
    authDomain: "dat-boi-bb83f.firebaseapp.com",
    databaseURL: "https://dat-boi-bb83f.firebaseio.com",
    storageBucket: "dat-boi-bb83f.appspot.com",
    messagingSenderId: "285126215766"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

function google_signIn() {


    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        login_success(user);


    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        alert("something happend!!");
    });
}