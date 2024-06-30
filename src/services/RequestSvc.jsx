/**
 * @author Hags
 * Clase encargada de realizar las peticiones HTTP
 * @type {RequestSvc}
 */
const {NAME_HEADER_AUTH} = require("../utils/Constants");
const {getStoredValue} = require("./UseLocalStorage");
module.exports = class RequestSvc {
    /**
     * Hacer una petición de tipo POST
     * @param endpoint Endpoint al que se hará la petición
     * @param payload Datos que se enviarán en la petición
     * @param header Headers que se desean enviar en la petición
     * @returns {Promise<{}>}
     */
    post = async (endpoint, payload, header = []) => {
        let headersToRequest = this.createHeaders(header);
        const requestOptions = {
            method: 'POST',
            headers: headersToRequest,
            redirect: 'follow',
            body: JSON.stringify(payload)
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return this.processData(requestResponse);
    }
    /**
     * Hacer una petición de tipo GET
     * @param endpoint Endpoint al que se hará la petición
     * @param header Headers que se desean enviar en la petición
     * @returns {Promise<{}>}
     */
    get = async (endpoint, header = []) => {
        let headersToRequest = this.createHeaders(header);
        const requestOptions = {
            method: 'GET',
            headers: headersToRequest,
            redirect: 'follow'
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return this.processData(requestResponse);
    }
    /**
     * Crear los headers para el request
     * @param headers
     * @returns {*[]}
     */
    createHeaders = (headers = []) => {
        let headersToRequest = headers;
        if (headers.length === 0) {
            headersToRequest = new Headers();
        }
        headersToRequest.append("Content-Type", "application/json");
        let auth = getStoredValue(NAME_HEADER_AUTH)
        if (auth) {
            headersToRequest.append("Authorization", `Bearer ${auth}`);
        }
        return headersToRequest;
    }
    /**
     * Procesar la respuesta de cada petición.
     * @param requestResponse
     * @returns {Promise<{}>}
     */
    processData = async (requestResponse) => {
        let structResponse = {}
        try {
            structResponse.status_code = requestResponse.status
            let response = await requestResponse.json();
            if (requestResponse.status !== 200) {
                let errorStruct = {};
                errorStruct.code = requestResponse.status;
                errorStruct.messages = response.msg;
                throw errorStruct;
            }
            structResponse.data = response.data;
        } catch (err) {
            structResponse.error = true;
            structResponse.messages = err.messages ?? 'Unexpected error';
            structResponse.code = err.code ?? 500;
            structResponse.status_code = err.code ?? 500;
        }
        return structResponse;
    }

}