import RatesApiService from './RatesApiService';

test('RatesApiService', () => {
    expect(RatesApiService).toBeTruthy();
});

test.skip('Fetches a set of currencies', (done) => {
    const currencies = ['USD', 'EUR', 'GBP'];

    RatesApiService.fetchRatesForCurrencies(currencies).then((data) => {
        expect(data).toHaveProperty('base');
        expect(data).toHaveProperty('rates.USD');
        expect(data).toHaveProperty('rates.EUR');
        expect(data).toHaveProperty('rates.GBP');
        done();
    });
});
