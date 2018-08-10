
const Command = use('App/Commands/Command')
const Product = use('App/Models/Product')

class GetProductListingCommand extends Command {

    constructor() {
        super()
        
        return this.handle()

    }

    async handle() {
        let page = 1;

        const products = await Product.query().paginate(page)
        return products
    }
}

module.exports = GetProductListingCommand