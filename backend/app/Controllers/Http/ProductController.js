'use strict'

const ApiController = use('App/Controllers/ApiController')
const GetProductListingCommand = use('App/Commands/GetProductListingCommand')
const ProductTransformer = use('App/Transformers/ProductTransformer')

class ProductController extends ApiController{

    constructor() {
        super()
        this.transformer = new ProductTransformer()
    }

    async index({ request, response, auth }) {
        
        this.response = response;
        let results = await (new GetProductListingCommand())
        results = results.toJSON();
        results.data = this.transformer.transformCollection(results.data);
        return this.respond(results)

    }

    show() { }
    store() { }
    update() { }
    destroy() { }
}

module.exports = ProductController
