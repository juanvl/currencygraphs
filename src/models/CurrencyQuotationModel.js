const axios = require('axios');

const BASE_URL = process.env.API_BASE_URL + ":" + process.env.API_BASE_PORT
const RESOURCE = '/quotation/'

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

const getCurrencyVariations = () => {
    const api = axios.create({
        baseURL: BASE_URL+RESOURCE,
    });

    const response = api.get('currencyquotations/variation/');
    return response;
};

export {getCurrencyQuotations, getCurrencyVariations}