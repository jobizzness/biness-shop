
const Command = use('App/Commands/Command')
const Product = use('App/Models/Product')

class CreateProductCommand extends Command {

    constructor(data) {
        super()
        this.data = data;
        return this.handle()

    }

    async handle() {

        const product = await Product.create(this.data)

        const data = {
            variants: []
        }
        return product
    }
}

module.exports = CreateProductCommand