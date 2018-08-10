
const CODES = [
    OK = 200,
    NOT_FOUND = 404
]
const ApiResponder = (_base) =>  class extends _base {

    constructor(){
        super();
        this._statusCode = CODES.OK;
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    notFound(message){

    }

    requestFailed(message = 'Could not process response'){

        return this.respondWithError(message)
    }

    respond(data, headers = []){
        this.response.type('application/json')
        this.response.send(data)
    }

    setStatusCode(value){
        this._statusCode = value
        return this
    }

    getStatusCode(){
        return this._statusCode;
    }
    
    respondNotFound(){
        this.setStatusCode(CODES.NOT_FOUND)
        return this.respondWithError('resource was not found')
    }

    respondWithError(message){
        return this.respond({
            'error': {
                'message': message
            }
        })
    }


}

module.exports = ApiResponder