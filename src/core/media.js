import { BinessShop} from './app.js'

export const Media = new class {
    constructor() {
    }

    getHeaders(){
        let r = new BinessShop.Request()
        let headers = r.options.headers
        headers.Authorization = `Bearer ${r.token}`
        delete headers['Content-Type']
        return headers;
    }

    getTarget(){
        return BinessShop.API_URL + '/media'
    }

    delete(){
        
    }

}();