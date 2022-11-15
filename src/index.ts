import fastify from 'fastify'
import dotenv from 'dotenv'
import { MongoConnectionManager } from './infra/mongo/connectionManager'

import { startHttpServer } from './infra/rest/server'
import { GetGile } from './infra/cronjob/getFile.job'
import { Controller } from './infra/rest/contoller/contoller'
import { CustomerDbMongo } from './infra/mongo/repositories/customerDbMongo'
dotenv.config()
async function start() {

  const db_url = String(process.env.URL_DATABASE)
  const datbase = String(process.env.DATABASE)
  console.log('ural conex bd -->', db_url, datbase)

  const db = await new MongoConnectionManager(String(process.env.URL_DATABASE), String(process.env.DATABASE)).getDB()
  const serverHt = fastify({ logger: true })


  const customerDb = new CustomerDbMongo(db)
  const getFile = new GetGile(customerDb)
  const controller = new Controller(customerDb)
  getFile.start()
  startHttpServer(serverHt, controller)
}

start()
