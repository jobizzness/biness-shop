'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (collection) => {
      collection.index('uid', { uid: 1 })
      collection.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
