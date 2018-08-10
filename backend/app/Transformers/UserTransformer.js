
const Transformer = use('App/Transformers/Transformer')

class UserTransformer extends Transformer{
    transform(data){
        return data
    }

}

module.exports = UserTransformer