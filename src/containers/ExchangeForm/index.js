import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../store/actions';
import _ from 'lodash';
import fx from 'money';
import styles from './styles.css';

// Components
import AccountSelect from '../../components/AccountSelect';
import RateInformer from '../../components/RateInformer';
import ExchangeInput from '../../components/ExchangeInput';
import Button from '../../components/Button';

const RATES_UPDATE_INTERVAL = 10000;
const AMOUNT_INPUT_NAME = 'amount';
const RESULT_INPUT_NAME = 'result';

class ExchangeForm extends Component {

    constructor(props) {
        super(props);
        this.actions = bindActionCreators(Actions, props.dispatch);

        this.lastInputChanged = null;
    }

    componentWillMount() {
        this.watchRates(this.props.accounts);
    }

    componentWillUnmount() {
        this.ratesUpdateInteraval && clearInterval(this.ratesUpdateInteraval);
    }

    componentDidMount() {
        const amountInput = document.getElementById('from-account-input');
        
        amountInput && amountInput.focus();
    }

    componentWillReceiveProps(nextProps) {
        const {
            exchangeRates,
            exchangeFromAccount,
            exchangeToAccount,
            exchangeAmount,
            exchangeResult} = this.props;
        const ratesChanged = exchangeRates !== nextProps.exchangeRates;
        const accountFromChanged = exchangeFromAccount !== nextProps.exchangeFromAccount;
        const accountToChanged = exchangeToAccount !== nextProps.exchangeToAccount;
        const accountChanged = accountFromChanged || accountToChanged;
        const lastChangedAmount = this.lastInputChanged === AMOUNT_INPUT_NAME;
        const lastChangedResult = this.lastInputChanged === RESULT_INPUT_NAME;
        const nextRate = this.getConversionRate(nextProps.exchangeFromAccount.currency, nextProps.exchangeToAccount.currency);

        if (accountChanged || ratesChanged) {
            this.updateRate(nextRate);
        }

        if ((accountChanged || ratesChanged) && lastChangedAmount) {
            this.syncResultInput(exchangeAmount, nextProps.exchangeFromAccount.currency, nextRate);
        }

        if ((accountChanged || ratesChanged) && lastChangedResult) {
            this.syncAmountInput(exchangeResult, nextProps.exchangeToAccount.currency, nextRate);
        }
    }

    watchRates(accounts) {
        const currencyCodes = accounts.map(account => account.currency);

        this.actions.fetchRatesForCurrencies(currencyCodes);

        this.ratesUpdateInteraval && clearInterval(this.ratesUpdateInteraval);

        this.ratesUpdateInteraval = setInterval(() => {
            this.actions.fetchRatesForCurrencies(currencyCodes);
        }, RATES_UPDATE_INTERVAL);
    }

    onFromAccountChange = (selectedAccount) => {
        const {exchangeFromAccount, exchangeToAccount} = this.props;
        
        if (_.eq(selectedAccount, exchangeToAccount)) {
            this.actions.selectExchangeTo(exchangeFromAccount);
        }

        this.actions.selectExchangeFrom(selectedAccount);
    }

    onToAccountChange = (selectedAccount) => {
        const {exchangeFromAccount, exchangeToAccount} = this.props;

        if (_.eq(selectedAccount, exchangeFromAccount)) {
            this.actions.selectExchangeFrom(exchangeToAccount);
        }

        this.actions.selectExchangeTo(selectedAccount);
    }

    onAmountChange = (e, value) => {
        const {rate, exchangeToAccount} = this.props;
        
        this.actions.inputAmount(value);
        this.syncResultInput(value.floatValue, exchangeToAccount.currency, rate);

        this.lastInputChanged = AMOUNT_INPUT_NAME;
    }

    syncResultInput(amountValue, currency, rate) {
        const resultWithoutFee = amountValue * rate;
        const fee = this.calculateFee(resultWithoutFee, currency);
        const resultValue = _.round(resultWithoutFee + fee, 2);

        this.actions.inputResult({
            floatValue: resultValue,
            formattedValue: !!resultValue ? resultValue.toString() : ''
        });
        this.actions.setResultFee(fee);
    }
    
    onResultChange = (e, value) => {
        const {rate, exchangeFromAccount} = this.props;
        
        this.actions.inputResult(value);
        this.syncAmountInput(value.floatValue, exchangeFromAccount.currency, rate);

        this.lastInputChanged = RESULT_INPUT_NAME;
    }

    syncAmountInput(resultValue, currency, rate) {
        const amountWithoutFee = resultValue / rate;
        const fee = this.calculateFee(amountWithoutFee, currency);
        const amountValue = _.round(amountWithoutFee + fee, 2);

        this.actions.inputAmount({
            floatValue: amountValue,
            formattedValue: !!amountValue ? amountValue.toString() : ''
        });
        this.actions.setAmountFee(fee);
    }

    calculateFee(value, currency) {
        const {rate, freeLimit, limitCurrency} = this.props.feeParams;
        const valueInLimitCurrency = fx.convert(value, {
            from: currency,
            to: limitCurrency
        });

        return valueInLimitCurrency > freeLimit ? value * rate : 0;
    }

    getSymbolsMap(currencyOptions) {
        // creates symbol: sign map out of currency options
        return _(currencyOptions).keyBy('code').mapValues(item => item.symbol).value();
    }

    getConversionRate(from, to) {
        return fx.convert(1, {from, to});
    }

    updateRate(rate) {
        this.actions.setRate(rate);
    }

    isValid() {
        const {exchangeAmount, exchangeFromAccount} = this.props;

        return exchangeAmount <= exchangeFromAccount.balance;
    }

    render() {
        const {
            accounts,
            currencyOptions,
            exchangeFromAccount,
            exchangeToAccount,
            exchangeAmountInput,
            exchangeResultInput,
            rate,
            amountFee,
            resultFee } = this.props;
        const symbolsMap = this.getSymbolsMap(currencyOptions);
        const exhcnageFromSymbol = symbolsMap[exchangeFromAccount.currency];
        const exchangeToSymbol = symbolsMap[exchangeToAccount.currency];

        return (
            <form className={styles.form}>
                <section className={styles.accountFromSection}>
                    <AccountSelect
                        accounts={accounts}
                        currencyOptions={currencyOptions}
                        selectedAccount={exchangeFromAccount}
                        onChange={this.onFromAccountChange}
                        isValid={this.isValid()} />
                    <ExchangeInput
                        inputId={'from-account-input'}
                        value={exchangeAmountInput}
                        operationSymbol={'−'}
                        onChange={this.onAmountChange}
                        currencySymbol={exhcnageFromSymbol}
                        fee={amountFee} />
                </section>
                {rate ?
                    <RateInformer
                        rate={rate}
                        exhcnageFromSymbol={exhcnageFromSymbol}
                        exchangeToSymbol={exchangeToSymbol} />
                    : null}
                <section className={styles.accountToSection}>
                    <AccountSelect
                        accounts={accounts}
                        currencyOptions={currencyOptions}
                        selectedAccount={exchangeToAccount}
                        onChange={this.onToAccountChange} />
                    <ExchangeInput
                        value={exchangeResultInput}
                        operationSymbol={'+'}
                        onChange={this.onResultChange}
                        currencySymbol={exchangeToSymbol}
                        fee={resultFee} />
                </section>
                <section className={styles.actions}>
                    <Button disabled={!this.isValid()}>Exchage</Button>
                </section>
            </form>
        );
    }
}

const selector = state => ({ ...state });

export default connect(selector)(ExchangeForm);
