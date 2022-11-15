
import { MongoClient } from 'mongodb'

export class MongoConnectionManager {
  client: any
  db: any
  url: string
  dbName: string

  constructor(url: string, dbName: string) {
    this.url = url
    this.dbName = dbName
    console.log(`config databse mongodb .. ${url} ${dbName}`)
    process.on('beforeExit', async () => {
      if (this.client) await this.client.close()
      console.log('exit before')
      process.exit()
    })

    process.on('SIGINT', async () => {
      try {
        if (this.client) await this.client.close()
        process.exit()
      } catch {
        process.exit()
      }
    })
  }

  async getDB(): Promise<any> { // TODO add flow types
    this.client = await MongoClient.connect(this.url)
    this.db = this.client.db(this.dbName)
    return this.db
  }

  async getClient(): Promise<any> {
    return this.client
  }
}
