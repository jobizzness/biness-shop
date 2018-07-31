import "firebase/firestore";
import { firebase } from '../core/app.js';

export const User = new class {

    constructor() {
        const settings = { timestampsInSnapshots: true };
        firebase().firestore().settings(settings);
    }

    /**
    * @desc when user changes we check if they already exists
    * if not we create them
    * @param {auth, whenDone} - auth is the data whenDone is the callback()
    * @return a promise - success or failure
    */
    async onChanged(auth, whenDone){

        whenDone(await this._getRealUser(auth));
    }

    _getRealUser(auth) {
        return new Promise(async (resolve, reject) => {

            let ref = firebase().firestore().doc(`/users/${auth.uid}`);
            try {
                const doc = await ref.get();
                if(doc && doc.exists){
                    resolve(doc.data())
                }else{
                    await ref.set(this._makeUserFromAuth(auth))
                    ref.get();
                    resolve(doc.data())
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    _makeUserFromAuth(auth){
        return {
            roles: {
                customer: true,
                
            },
            email: auth.email,
            avatar: auth.photoURL,
            fullname: '',
            verified: auth.emailVerified,
            phone: auth.phoneNumber,
            addresses: {},
            address: {},
            cart: {
                items: [],
                total: 0,
                numItems: 0
            },
            purchases: []

        }
    }

}();