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

        if(data._id){
            return await this.update({request, response, auth})
        }

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
            console.log(error)
            this.respondWithError(error)
        }
        
    }
    async update({ request, response, auth }) { 
        this.response = response
        let data = request.all()

        if (!data._id) {
            return await this.store({ request, response, auth })
        }

        const rules = {
            email: 'required',
            password: 'required'
        }

        // const validation = await validateAll(data, rules)
        // if (validation.fails()) return this.validationFails(validation)

        try {
            const product = await Product.findOrFail(data._id)
            product.merge(this.data)
            await product.save()
            return this.respond(this.transformer.transform(product))
        } catch (error) {
            return this.respondWithError(error)
        }
    }
    destroy() { }
}

module.exports = ProductController
