'use strict'

const { validateAll } = use('Validator')
const ApiController = use('App/Controllers/ApiController')
const GetProductListingCommand = use('App/Commands/GetProductListingCommand')
const CreateProductCommand = use('App/Commands/CreateProductCommand')
const ProductTransformer = use('App/Transformers/ProductTransformer')
const Product = use('App/Models/Product')

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

    async show({ request, response, params, auth }) {

        this.response = response
        const slug = params.id
        const results = await Product.where('slug').eq(slug).fetch()
        const product = results.first()
        
        if (!product){
            return this.respondNotFound()
        }

        return this.respond(this.transformer.transform(product))

    }

    async store({ request, response, auth }) {
        this.response = response
        let data = request.all()
        //validate the data

        const rules = {
            email: 'required',
            password: 'required'
        }

        // const validation = await validateAll(data, rules)
        // if (validation.fails()) return this.validationFails(validation)

        try {
            let product = await(new CreateProductCommand(data))
            return this.respond({
                data: product
            })
        } catch (error) {
            
        }
        
    }
    update() { }
    destroy() { }
}

module.exports = ProductController
