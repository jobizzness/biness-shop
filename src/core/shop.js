import { BinessShop } from './app.js'

const Request = BinessShop.Request;
const API_URL = BinessShop.API_URL

export const fetchListing = async () => {
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

export const publishProduct = async (product) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await (new Request()).post(`${API_URL}/product`, {
                body: product
            })
            let data = await response.json()
            if (data.error) reject(data)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}


export const getProduct = async (slug) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await (new Request()).get(`${API_URL}/product/${slug}`, {})
            let data = await response.json()
            if (data.error) reject(data)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

export const updateCart = async (cart) => {
    return new Promise(async (resolve, reject) => {
        try {

            let response = await (new Request()).post(`${API_URL}/cart`, {
                body: cart
            })
            let data = await response.json()
            if (data.error) reject(data)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}