'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const ApiController = use('App/Controllers/ApiController')
const CreateUserCommand = use('App/Commands/CreateUserCommand')
const UserTransformer = use('App/Transformers/UserTransformer')

const LOGIN_ACTION = 'login'
const REGISTER_ACTION = 'register'
const RECOVER_ACTION = 'recover'

class AuthController extends ApiController{

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    constructor(){
        super();
        this.resource = User
        this.transformer = new UserTransformer()
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async index({params, request, auth, response}){

        this.response = response;
        let action = params.action

        switch (action) {
            case LOGIN_ACTION:
                return await this.login(request, auth)
            case REGISTER_ACTION:
                return await this.register(request, auth)
            case RECOVER_ACTION:
                return await this.recover(request);
            default:
                return this.unknownAction(request)
        }
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async login(request, auth){

        let data = request.only(['password', 'email']);

        const rules = {
            email: 'required',
            password: 'required'
        }

        const validation = await validateAll(data, rules)
        if (validation.fails()) return this.validationFails(validation)
    
        try {
            let res = await auth.attempt(data.email, data.password)
            return this.respond({
                data: res
            })
        } catch (error) {
            return this.accountNotFound(error)
        }
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async register(request, auth){

        let data = request.only(['password', 'email']);

        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required'
        }

        const validation = await validateAll(data, rules)
        
        if(validation.fails()){
            return this.validationFails(validation)
        }

        //Create the user and respond with the data
        const user = await (new CreateUserCommand(data));
        let res = await auth.attempt(data.email, data.password)
        // event(new UserWasCreated(user))

        return this.respond({
            data: res
        })
        

    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    async recover(){}

    unknownAction(){
        return this.respondNotFound('This route does not exist eh!');
    }

    validationFails(validation){
        return this.requestFailed(validation.messages());
    }

    accountNotFound(error){
        return this.respondNotFound();
        
    }
}

module.exports = AuthController
