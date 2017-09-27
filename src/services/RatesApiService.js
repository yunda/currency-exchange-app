import queryString from 'query-string';

const RATES_API_ENDPOINT = 'https://openexchangerates.org/api/latest.json';
const APP_ID = 'f873747ea60e4f96a7550602d6f12b99';

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
