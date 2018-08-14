'use strict'

const Model = use('Model')

class Product extends Model {

    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (product) => {
           product.slug = (product.slug == null) ? await Product.slugify(product.name) : product.slug
        })
    }

    static async slugExists(text){
        const results = await Product.where('slug').eq(text).fetch()
        return results.first()
    }

    static async slugify(text){
        text = text || 'product '
        const slug = text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text

            if(await Product.slugExists(text)){
                return Product.slugify(text + Date.now)
            }
            
            return slug
    }


}

module.exports = Product
