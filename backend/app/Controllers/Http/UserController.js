'use strict'

const User = use('App/Models/User')
const ApiController = use('App/Controllers/ApiController')

class UserController extends ApiController{

    constructor(){
        super()
    }

    index({ request, response, auth }){
        this.response = response;
        const user = auth.user;
        return this.respond(user)
    }

    show(){ }
    store(){ }
    update(){ }
    destroy(){ }
}

module.exports = UserController
