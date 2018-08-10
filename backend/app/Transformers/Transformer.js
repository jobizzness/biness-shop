class Transformer {

    constructor(){

    }
    
    transform(){
        throw 'no implementation of tranform method.'
    }

    transformCollection(collection){
        return collection.map((item) => this.transform(item))
    }
}

module.exports = Transformer