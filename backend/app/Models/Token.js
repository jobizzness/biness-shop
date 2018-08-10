'use strict'

const Model = use('Model')

class Token extends Model {

    /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Token
