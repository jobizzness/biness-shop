
const Command = use('App/Commands/Command')
const Product = use('App/Models/Product')

class UpdateProductCommand extends Command {

    /**
    * @desc opens a modal window to display a message
    * @param  data, product - the message to be displayed
    * @return bool - success or failure
    */
    constructor(data) {
        super()

        this.data = data

        return this.handle()

    }

    async handle() {

        const data = {
            ...this.data,
            variants: this._formatVariants(this.data.variants)
        }

        const product = await Product.findOrFail(this.data._id);
        product.merge(data)
        await product.save()

        return product
    }

    /**
    * @desc opens a modal window to display a message
    * @param string msg - the message to be displayed
    * @return bool - success or failure
    */
    _formatVariants(variants = []) {
        let lastID = this._getLastID(variants)

        return variants.map((element) => {
            return {
                ...element,
                id: (element.id ? element.id : lastID++)
            }
        })
    }

    /**
    * @desc opens a modal window to display a message
    * @param Array msg - the message to be displayed
    * @return bool - success or failure
    */
    _getLastID(data){
        let id = 0;

        data.forEach((item) => {
            id = (!item.id || id > item.id) ? id : item.id
        })

        return id;
    }
}

module.exports = UpdateProductCommand