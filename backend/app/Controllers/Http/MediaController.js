'use strict'

const ApiController = use('App/Controllers/ApiController')
const admin = require("firebase-admin");
const serviceAccount = require("../../../biness-shop-firebase-adminsdk-hsqut-bb0f3ff485.json");
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

//Extract to IOC if needed
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "biness-shop.appspot.com"
});

class MediaController extends ApiController{

    constructor(){
        super()
        this.bucket = admin.storage().bucket();
    }

    async store({ params, request, auth, response }){
        this.response = response;
        let res = null;

        request.multipart.file('file', {}, async (file) => {
            res = await this.saveFile(file);
        })
        
        try {
            await request.multipart.process()
            return this.respond({
                data: {
                    url: res
                }
            })
        } catch (error) {
            console.log(error)
        }
        
        
    }

    async saveFile(file){

        return new Promise((resolve, reject) => {
            if (!file) {
                reject('No image file');
            }
            let newFileName = `${file.clientName}_${Date.now()}`;
            let fileUpload = this.bucket.file(newFileName);

            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: `${file.type}/${file.subtype}`
                }
            });

            blobStream.on('error', (error) => {
                reject(error);
            });

            blobStream.on('finish', () => {
                // The public URL can be used to directly access the file via HTTP.
                fileUpload.makePublic().then(() => {});
                const url = util.format(`https://storage.googleapis.com/${this.bucket.name}/${fileUpload.name}`);
                resolve(url);
            });

            file.stream.pipe(blobStream);
        });

    }
}

module.exports = MediaController
