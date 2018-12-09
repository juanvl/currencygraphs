const axios = require('axios');

const BASE_URL = 'http://localhost:8000/'
const RESOURCE = 'quotation/'

const getCurrencyQuotations = (limit=null) => {
    const api = axios.create({
        baseURL: BASE_URL+RESOURCE,
    });

    const response = api.get('currencyquotations/', {
        params: {
            limit: limit
        }
    });
    return response;
};

export {getCurrencyQuotations}