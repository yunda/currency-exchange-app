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

class ExchangeForm extends Component {

    constructor(props) {
        super(props);
        this.actions = bindActionCreators(Actions, props.dispatch);
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
        const {exchangeRates, exchangeFromAccount, exchangeToAccount} = this.props;

        if (exchangeRates !== nextProps.exchangeRates
            || exchangeFromAccount !== nextProps.exchangeFromAccount
            || exchangeToAccount !== nextProps.exchangeToAccount) {
            this.updateRate(nextProps.exchangeFromAccount, nextProps.exchangeToAccount);
        }
    }

    watchRates(accounts) {
        const symbols = accounts.map(account => account.currency);

        this.actions.fetchRatesForSymbols(symbols);

        this.ratesUpdateInteraval && clearInterval(this.ratesUpdateInteraval);

        this.ratesUpdateInteraval = setInterval(() => {
            this.actions.fetchRatesForSymbols(symbols);
        }, RATES_UPDATE_INTERVAL);
    }

    onFromAccountChange = (selectedAccount) => {
        this.actions.selectExchangeFrom(selectedAccount);
    }

    onToAccountChange = (selectedAccount) => {
        this.actions.selectExchangeTo(selectedAccount);
    }

    onAmountChange = (e, value) => {
        const {rate, exchangeToAccount} = this.props;
        const resultWithoutFee = value.floatValue * rate;
        const fee = this.calculateFee(resultWithoutFee, exchangeToAccount.currency);
        const resultValue = _.round(resultWithoutFee + fee, 2);
        
        this.actions.inputAmount(value);
        this.actions.inputResult({
            floatValue: resultValue,
            formattedValue: !!resultValue ? resultValue.toString() : ''
        });
        this.actions.setResultFee(fee);
    }
    
    onResultChange = (e, value) => {
        const {rate, exchangeFromAccount} = this.props;
        const amountWithoutFee = value.floatValue / rate;
        const fee = this.calculateFee(amountWithoutFee, exchangeFromAccount.currency);
        const amountValue = _.round(amountWithoutFee + fee, 2);

        this.actions.inputResult(value);
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

    getSignsMap(currencyOptions) {
        // creates symbol: sign map out of currency options
        return _(currencyOptions).keyBy('symbol').mapValues(item => item.sign).value();
    }

    updateRate(fromAccount, toAccount) {
        const rate = fx.convert(1, {
            from: fromAccount.currency,
            to: toAccount.currency
        });

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
        const signsMap = this.getSignsMap(currencyOptions);
        const exhcnageFromCurrencySign = signsMap[exchangeFromAccount.currency];
        const exchangeToCurrencySign = signsMap[exchangeToAccount.currency];

        return (
            <form className={styles.form}>
                <section className={styles.accountFromSection}>
                    <AccountSelect
                        accounts={accounts}
                        selectedAccount={exchangeFromAccount}
                        onChange={this.onFromAccountChange}
                        currencySign={exhcnageFromCurrencySign}
                        isValid={this.isValid()} />
                    <ExchangeInput
                        inputId={'from-account-input'}
                        value={exchangeAmountInput}
                        operationSymbol={'−'}
                        onChange={this.onAmountChange}
                        currencySign={exhcnageFromCurrencySign}
                        fee={amountFee} />
                </section>
                {rate ?
                    <RateInformer
                        rate={rate}
                        exhcnageFromCurrencySign={exhcnageFromCurrencySign}
                        exchangeToCurrencySign={exchangeToCurrencySign} />
                    : null}
                <section className={styles.accountToSection}>
                    <AccountSelect
                        accounts={accounts}
                        selectedAccount={exchangeToAccount}
                        onChange={this.onToAccountChange}
                        currencySign={exchangeToCurrencySign}
                        otherOptions />
                    <ExchangeInput
                        value={exchangeResultInput}
                        operationSymbol={'+'}
                        onChange={this.onResultChange}
                        currencySign={exchangeToCurrencySign}
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
