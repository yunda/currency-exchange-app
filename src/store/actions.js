import RatesApiService from '../services/RatesApiService';
import fx from 'money';

export const REQUEST_RATES = 'REQUEST_RATES';
export const RECEIVE_RATES = 'RECEIVE_RATES';
export const SET_RATE = 'SET_RATE';
export const SELECT_EXCHANGE_FROM = 'SELECT_EXCHANGE_FROM';
export const SELECT_EXCHANGE_TO = 'SELECT_EXCHANGE_TO';
export const INPUT_EXCHANGE_AMOUNT = 'INPUT_EXCHANGE_AMOUNT';
export const INPUT_EXCHANGE_RESULT = 'INPUT_EXCHANGE_RESULT';
export const SET_AMOUNT_FEE = 'SET_AMOUNT_FEE';
export const SET_RESULT_FEE = 'SET_RESULT_FEE';

export const inputAmount = (value) => {
    return {
        type: INPUT_EXCHANGE_AMOUNT,
        inputValue: value.formattedValue,
        numberValue: value.floatValue
    };
};

export const inputResult= (value) => {
    return {
        type: INPUT_EXCHANGE_RESULT,
        inputValue: value.formattedValue,
        numberValue: value.floatValue
    };
};

export const selectExchangeFrom = (account) => {
    return {
        type: SELECT_EXCHANGE_FROM,
        account
    };
};

export const selectExchangeTo = (account) => {
    return {
        type: SELECT_EXCHANGE_TO,
        account
    };
};

export const requestRates = (currencies) => {
    return {
        type: REQUEST_RATES,
        requestedAt: Date.now()
    };
};

export const receiveRates = (data) => {
    const {rates, base} = data;

    fx.rates = rates;
    fx.base = base;

    return {
        type: RECEIVE_RATES,
        rates
    };
};

export const setRate = (rate) => {
    return {
        type: SET_RATE,
        rate
    };
};

export const setAmountFee = (fee) => {
    return {
        type: SET_AMOUNT_FEE,
        fee
    };
};

export const setResultFee = (fee) => {
    return {
        type: SET_RESULT_FEE,
        fee
    };
};

export const fetchRates = () => {
    return (dispatch) => {  
        return RatesApiService.fetchAll().then((data) => {
            dispatch(receiveRates(data));
        });
    };
};

export const fetchRatesForCurrencies = (currencies) => {
    return (dispatch) => {  
        return RatesApiService.fetchRatesForCurrencies(currencies).then((data) => {
            dispatch(receiveRates(data));
        });
    };
};
