import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import find from 'lodash/find';
import concat from 'lodash/concat';
import Dropdown from 'react-dropdown';
import BalanceText from '../BalanceText';
import styles from './styles.css';

export default class AccountSelect extends Component {
    static propTypes = {
        accounts: PropTypes.array,
        onChange: PropTypes.func,
        value: PropTypes.object,
        isValid: PropTypes.bool,
        currencySign: PropTypes.string,
        otherOptions: PropTypes.bool
    };    

    static defaultProps = {
        options: [],
        onChange: noop,
        isValid: true
    };

    onChange = (option) => {
        this.props.onChange(find(this.props.accounts, {currency: option.value}))
    }

    mapAccounts(accounts) {
        return accounts.map(account => account.currency);
    }

    getOptions(accounts, otherOptions) {
        const accountOptions = this.mapAccounts(accounts);

        return otherOptions ? concat(accountOptions, 'Other') : accountOptions;
    }

    render() {
        const {accounts, selectedAccount, isValid, currencySign, otherOptions} = this.props;

        return (
            <div className={styles.AccountSelect}>
                <Dropdown 
                    baseClassName={'AccountSelect'}
                    options={this.getOptions(accounts, otherOptions)}
                    onChange={this.onChange}
                    value={selectedAccount.currency} />
                <BalanceText
                    value={selectedAccount.balance}
                    currencySign={currencySign}
                    isValid={isValid} />
            </div>
        );
    }
};