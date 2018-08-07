import firebaseApp from "firebase/app";

window.__REMI_APP__ = window.__REMI_APP__ || new class {

    get firebaseConfig() {
        return {
            apiKey: "AIzaSyCo-dZOVaM_ZzNgbTNxptrPnSB086hZMgo",
            authDomain: "reminiscebyro-b534f.firebaseapp.com",
            databaseURL: "https://reminiscebyro-b534f.firebaseio.com",
            projectId: "reminiscebyro-b534f",
            storageBucket: "reminiscebyro-b534f.appspot.com",
            messagingSenderId: "644416860629"
        }
    }

    constructor() {
        this.firebase = this._initializeFirebase(this.firebaseConfig);
        this.element = document.querySelector('remi-app');
    }

    _initializeFirebase(config) {
        return firebaseApp.initializeApp(config);
    }

}();

// We are exporting firebase app
export const firebase = () => {
    return window.__REMI_APP__.firebase.firebase_;
}


//Export remi app or something
//this is one useless comment
export const RemiApp = window.__REMI_APP__;