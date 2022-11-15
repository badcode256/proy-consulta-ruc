import { CronJob } from 'cron'
import { SunatService } from '../sunat/service'
import fs from 'fs'
import readline from 'readline'
import events from 'events'

import { Customer } from '../../domain/entity/customer'
import { CustomerImplRepository } from '../../domain/repository/customerImplRepository'

import compressing from 'compressing'
export class GetGile {
  customerDb: CustomerImplRepository

  constructor(customerDb: CustomerImplRepository) {
    this.customerDb = customerDb;

  }

  async sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async start(): Promise<any> {
    const sunatService = new SunatService()
    // 1. INICIA JOB
    const job = new CronJob('0 24 20 * * *', async () => {

      const fileTxt = `files/${String(process.env.FILE_NAME)}.txt`
      console.log('start ....')
      const path = `files`
      const pathFile = `files/${String(process.env.FILE_NAME)}.zip`

      console.log('start process ', path)
      // 2. DESCARGA ARCHIVO
      const file = await sunatService.getFile()
      // 3. GUARDA ARCHIVO
      const fileres = await fs.writeFileSync(pathFile, file)
      console.log('ress --->', fileres)
      // 4. DESCOMPRIME ARCHIVO
      this.sleep(1000)
      await compressing.zip.uncompress(pathFile, path).then(() => console.log('uncompress done')).catch((e) => console.log('uncompress error -->' + e))
      let counter = 0
      this.sleep(10000)


      try {
        // 5. LEE ARCHIVO LINEA POR LINEA
        const rl = readline.createInterface({
          input: fs.createReadStream(fileTxt, { encoding: 'utf-8' }),
          crlfDelay: Infinity
        });
        let mapUsers = new Map<Number, Array<Customer>>();
        let lstCustomer: Array<Customer> = []
        const date = new Date()
        let id = 0
        let countIndex = 0
        console.log('start to-->', date.toLocaleDateString())
        rl.on('line', async (line) => {
          counter = counter + 1
          countIndex = countIndex + 1
          const array = String(line).split('|')

          const customer = new Customer({
            ruc: array[0],
            razon_social: array[1],
            estado: array[2],
            condicion: array[3],
            ubigeo: array[4],
            tipo_via: array[5],
            nombre_via: array[6],
            codigo_zona: array[7],
            tipo_zona: array[8],
            numero: array[9],
            interior: array[10],
            lote: array[11],
            departamento: array[12],
            manzana: array[13],
            kilometro: array[14],

          })

          lstCustomer.push(customer)
          if (counter === 100000) {
            id++
            console.log(' customers -->', countIndex, date.toLocaleDateString(), lstCustomer.length)
            // 6. ALMACENA REGISTROS EN MEMORIA
            mapUsers.set(id, lstCustomer)
            counter = 0
            lstCustomer = []
          }

        });

        await events.once(rl, 'close');
        console.log('end to-->', date.toLocaleDateString())
        console.log('Reading file line by line with readline done.');
        console.log('total customers -->', mapUsers.size)
        // 7. MIGRA DATA A MONGODB
        for (let [key, value] of mapUsers) {
          console.log('key , size', key)
          await this.customerDb.insertMany(value)
        }

        // 8. ELIMINAR ARCHIVO 
        try {
          fs.unlinkSync(fileTxt);
          fs.unlinkSync(pathFile);

          console.log("Delete File successfully.");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {

      }

    }, null, true, 'America/Lima')
    job.start()
  }
}


