import { CustomerImplRepository } from '../../../domain/repository/customerImplRepository'

export class Controller {
    customerDb: CustomerImplRepository

    constructor(customerDb: CustomerImplRepository) {
        this.customerDb = customerDb;

    }


    async getData(request: any, reply: any) {
        try {
            const ruc = request.params.ruc
            const data = await this.customerDb.get({ ruc: ruc })

            if (data.length === 0) {
                reply.code(500)
                reply.send({ status: 'error', msg: `No se encontraron datos con el ruc ${ruc}` })
                return
            }

            reply.code(200)
            reply.send({ status: 'success', data: data })
        } catch (error) {
            console.log('error generar lastversion-->', error)


            reply.code(500)
            reply.send({ status: 'error', msg: error })
        }
    }
}