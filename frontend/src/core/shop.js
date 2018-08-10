import { BinessShop } from './app.js'

const Request = BinessShop.Request;
const API_URL = BinessShop.API_URL

export const fetchListing = async () =>{
        return new Promise(async (resolve, reject) => {
            try {

                let response = await (new Request()).get(`${API_URL}/product`, {})
                let data = await response.json()
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
        
}
