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
           
        })
    }
}

module.exports = Product
