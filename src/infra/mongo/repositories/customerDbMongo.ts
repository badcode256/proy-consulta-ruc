// @flow
import type { CustomerImplRepository } from '../../../domain/repository/customerImplRepository'

// const ObjectId = require('mongodb').ObjectID
const COLLECTION_NAME = 'customers'

export class CustomerDbMongo implements CustomerImplRepository {
    model: any
    constructor(db: any) {
        this.model = db.collection(COLLECTION_NAME)
        //this.model.createIndex({ ruc: 1 }, { unique: true })
    }
    async insertMany(obj: Object): Promise<any> {
        console.log('executing ..> insert')
        return this.model
            .insertMany(obj)

    }

    async get(obj: Object): Promise<any> {
        return this.model.find(obj).toArray()
    }

}


