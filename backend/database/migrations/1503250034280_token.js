'use strict'

const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (collection) => {
      collection.index('_id', { _id: 1 })
      collection.timestamps()
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
