/**
 * @author Hags
 * Clase encargada de realizar las peticiones HTTP
 * @type {RequestSvc}
 */
const { NAME_HEADER_AUTH } = require("../utils/Constants");
const { getStoredValue } = require("./UseLocalStorage");

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
        };
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
        };
        let requestResponse = await fetch(endpoint, requestOptions);
        return this.processData(requestResponse);
    }

    /**
     * Hacer una petición de tipo POST con FormData
     * @param endpoint Endpoint al que se hará la petición
     * @param formData FormData que se enviará en la petición
     * @param header Headers que se desean enviar en la petición
     * @returns {Promise<{}>}
     */
    postFormData = async (endpoint, formData, header = []) => {
        let headersToRequest = this.createHeaders(header, false); // Don't set Content-Type for FormData
        const requestOptions = {
            method: 'POST',
            headers: headersToRequest,
            redirect: 'follow',
            body: formData
        };
        let requestResponse = await fetch(endpoint, requestOptions);
        return this.processData(requestResponse);
    }

    /**
     * Crear los headers para el request
     * @param headers
     * @param setContentType
     * @returns {*[]}
     */
    createHeaders = (headers = [], setContentType = true) => {
        let headersToRequest = headers;
        if (headers.length === 0) {
            headersToRequest = new Headers();
        }
        if (setContentType) {
            headersToRequest.append("Content-Type", "application/json");
        }
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
