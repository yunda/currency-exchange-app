import find from 'lodash/find';
import accounts from '../mocks/accounts';
import currencyOptions from '../mocks/currencyOptions'
import feeParams from '../mocks/feeParams';
import {
    RECEIVE_RATES,
    SELECT_EXCHANGE_FROM,
    SELECT_EXCHANGE_TO,
    INPUT_EXCHANGE_AMOUNT,
    INPUT_EXCHANGE_RESULT,
    SET_RATE,
    SET_AMOUNT_FEE,
    SET_RESULT_FEE
  } from "./actions";

export const initialState = {
    accounts: accounts,
    exchangeRates: {},
    currencyOptions: currencyOptions,
    exchangeAmount: 0,
    exchangeResult: 0,
    exchangeAmountInput: '',
    exchangeResultInput: '',
    exchangeFromAccount: find(accounts, {currency: 'GBP'}),
    exchangeToAccount: find(accounts, {currency: 'USD'}),
    rate: null,
    feeParams: feeParams,
    amountFee: 0,
    resultFee: 0
};

function exchangeReducer(state = initialState, action) {
    switch(action.type) {
        case INPUT_EXCHANGE_AMOUNT:
            return {
                ...state,
                exchangeAmount: action.numberValue,
                exchangeAmountInput: action.inputValue
            };
        case INPUT_EXCHANGE_RESULT:
            return {
                ...state,
                exchangeResult: action.numberValue,
                exchangeResultInput: action.inputValue
            };
        case SELECT_EXCHANGE_FROM:
            return {
                ...state,
                exchangeFromAccount: action.account
            };
        case SELECT_EXCHANGE_TO:
            return {
                ...state,
                exchangeToAccount: action.account
            };
        case RECEIVE_RATES: 
            return {
                ...state,
                exchangeRates: action.rates
            }
        case SET_RATE: 
            return {
                ...state,
                rate: action.rate
            }
        case SET_AMOUNT_FEE: 
            return {
                ...state,
                amountFee: action.fee,
                resultFee: 0
            }
        case SET_RESULT_FEE: 
            return {
                ...state,
                resultFee: action.fee,
                amountFee: 0
            }
        default:
            return state;
    }
}

export default exchangeReducer;
