
const Command = use('App/Commands/Command')
const User = use('App/Models/User')

class CreateUserCommand extends Command{

    constructor(data){
        super()
        this.data = data;
        return this.handle()
        
    }

    async handle(){

        const user = await User.create({
            email: this.data.email,
            password: this.data.password
        })
        
        return user
    }
}

module.exports = CreateUserCommand