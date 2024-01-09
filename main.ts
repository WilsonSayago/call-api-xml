import * as fs from 'fs';
import * as xml2js from 'xml2js';
import * as path from "path";
import axios from 'axios';

export class ServiceXML {

    public async callApiXML() {
        // Ruta del archivo WSDL
        const wsdlFilePath = path.join(__dirname, `./test.wsdl`);

        try {
            // Lee el contenido del archivo WSDL de manera asíncrona
            const wsdlContent = await fs.promises.readFile(wsdlFilePath, 'utf-8');

            // Parsea el contenido XML del archivo WSDL
            const parser = new xml2js.Parser({ explicitArray: false });
            const parsedWsdl = await parser.parseStringPromise(wsdlContent);

            // Realiza la sustitución de datos en el objeto XML según tu lógica
            this.replace(parsedWsdl);

            // Convierte el objeto XML modificado de nuevo a una cadena XML
            const builder = new xml2js.Builder();
            const modifiedWsdlXml = builder.buildObject(parsedWsdl);

            // Realiza la solicitud POST con el contenido modificado y esperar su respuesta
            const responseParsedZVGT = await this.makePostRequest(`${process.env.SOAP_URL}`, modifiedWsdlXml);

            console.log("🚀 response:", responseParsedZVGT)
        } catch (error) {
            console.error('Error al procesar el archivo WSDL:', error);
        }
    }

    private replace(wsdlObject): void {
        const header: any = {
            test1: "test1",
            test2: "test2",
        }
        // keys: reemplazarlos por los que se necesiten
        delete wsdlObject["keys1"]["keys2"].HEADERS;

        // Se setea los datos al xml en el lugar que se necesite
        wsdlObject["keys1"]["keys2"].HEADERS = {
            HEADER1: header.test1,
            HEADER2: header.test2,
        }
    }

    private async makePostRequest(url: string, xmlData: string): Promise<any> {
        try {
            const auth = "Basic " + Buffer.from(`${process.env.SOAP_USER}:${process.env.SOAP_PASSWORD}`).toString("base64");

            const headers = {
                'Authorization': auth,
                'Content-Type': 'application/soap+xml',
            }

            const response = await axios.post(url, xmlData, { headers: headers })
            return await this.parseResponse(response);
        } catch (error) {
            console.error('Error request post:', error);
        }
    }

    private async parseResponse(response): Promise<any> {
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedWsdl = await parser.parseStringPromise(response.data);

        const objetoResponse: any = {
            HEADER1: parsedWsdl["key1"]["key2"].HEADER1,
        }

        return objetoResponse
    }
}