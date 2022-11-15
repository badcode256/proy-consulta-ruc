
import type { SunatImpl } from '../../domain/repository/sunatImpl'
import axios from 'axios'



export class SunatService implements SunatImpl {
    baseUrl: string

    constructor() {
        this.baseUrl = String(process.env.URL_SUNAT) + '/' + String(process.env.FILE_NAME) + '.zip'
    }

    getFile(): Promise<any> {
        return axios.get(`${this.baseUrl}`, { responseType: 'arraybuffer' })
            .then((response) => {
                return response.data
            })
            .catch((e) => {
                return e.response.data
            })
    }
}


