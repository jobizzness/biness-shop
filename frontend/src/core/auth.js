import auth from "firebase/auth";
import { firebase } from '../core/app.js';

export const Auth = new class {
    constructor() {
    }

    login({email, password}) {
        switch ('dsds') {
            case 'facebook':
                return this._loginWithFacebook();
        
            default:
                return this._loginWithEmail(email, password);
        }
    }

    _onAuthChange(callback){
        return firebase().auth().onAuthStateChanged(callback);
    }

    _loginWithEmail(email, password){
        return firebase().auth().signInWithEmailAndPassword(email, password)
    }

    _loginWithFacebook(){

        let provider = firebase().auth.GoogleAuthProvider;
        firebase().auth().signInWithPopup(new provider()).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

}();