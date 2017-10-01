import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import find from 'lodash/find';
import Dropdown from 'react-dropdown';
import BalanceText from '../BalanceText';
import styles from './styles.css';

const OTHER_OPTION = 'Other';

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
        isValid: true,
        otherOptions: false
    };

    onChange = (option, e) => {
        if (option.value === OTHER_OPTION) {
            return console.log(option, e);
        }
        this.props.onChange(find(this.props.accounts, {currency: option.value}))
    }

    getOptions(accounts, otherOptions) {
        const accountOptions = accounts.map(account => account.currency);

        return otherOptions ? [...accountOptions, OTHER_OPTION] : accountOptions;
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