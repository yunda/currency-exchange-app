export const mockRatesApi = () => {
    jest.mock('../services/RatesApiService', () => ({
        fetchRatesForSymbols: () => {
            const random = require('lodash/random');
            const getFakeRates = () => {
                return {
                    base: 'USD',
                    rates: {
                        USD: 1,
                        EUR: random(0.8, 0.95001),
                        GBP: random(0.74, 0.80001)
                    }
                }
            }
            const fakeRates = getFakeRates();
    
            return Promise.resolve(fakeRates);
        }
    }));
};

export const unmockRatesApi = () => {
    jest.unmock('../services/RatesApiService');
};

export const mockConnect = () => {
    jest.mock('react-redux', () => ({
        connect: () => (obj) => obj
    }));
};

export const unmockReactRedux = () => {
    jest.unmock('react-redux');
};
