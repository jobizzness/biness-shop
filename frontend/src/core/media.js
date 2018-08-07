import storage from "firebase/storage";
import { firebase } from '../core/app.js';

export const Media = new class {
    constructor() {
        console.log()
        this._progressListeners = [];
        this._completeListeners = [];
    }

    upload(file, folder, filename){
        const ref = firebase().storage().ref(
            `media/${folder}/${filename ? filename : file.name}`
        )
        const metadata = { contentType: file.type };

        return ref.put(file, metadata)
    }

}();