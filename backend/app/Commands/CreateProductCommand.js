
const Command = use('App/Commands/Command')
const Product = use('App/Models/Product')

class CreateProductCommand extends Command {

    constructor(data) {
        super()
        this.data = data;
        return this.handle()

    }

    async handle() {

        let variants = this._formatVariants(this.data.variants)
    
        const data = {
            ...this.data,
            variants
        }

        const product = await Product.create(data)

        return product
    }

    _formatVariants(variants = []){
        let index = 0;
        return variants.map((element) => {
            return {
                ...element,
                id: index++
            }
        })
    }
}

module.exports = CreateProductCommand