import queryString from 'query-string';

const RATES_API_ENDPOINT = 'https://openexchangerates.org/api/latest.json';
const APP_ID = '8474015f5a7e4879b488633af03d6aeb';

export default class RatesApiService {
    static fetchAll() {
        const q = queryString.stringify({
            app_id: APP_ID
        });
        const url = `${RATES_API_ENDPOINT}?${q}`;

        return fetch(url)
            .then(res => res.json())
            .catch(error => console.error(error)); 
    }

    static fetchRatesForSymbols(currencies) {
        const q = queryString.stringify({
            app_id: APP_ID,
            symbols: currencies.join(',')
        });
        const url = `${RATES_API_ENDPOINT}?${q}`;

        return fetch(url)
            .then(res => res.json())
            .catch(error => console.error(error)); 
    }
}
