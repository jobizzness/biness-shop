'use strict'

const ApiController = use('App/Controllers/ApiController')

class CartController extends ApiController{

    async store({ request, response, auth }){
        this.response = response;
        let cart = request.all()

        auth.user.merge({
            cart: cart
        })

        await auth.user.save()

        return this.respond(true)
        

    }

}

module.exports = CartController
