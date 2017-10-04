import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import find from 'lodash/find';
import get from 'lodash/get';
import Dropdown from 'react-dropdown';
import styles from './styles.css';

// components
import BalanceText from '../BalanceText';
import FlagIcon from '../FlagIcon';

const OTHER_OPTION = 'Other';

export default class AccountSelect extends Component {

    static propTypes = {
        accounts: PropTypes.array,
        currencyOptions: PropTypes.array,
        onChange: PropTypes.func,
        selectedAccount: PropTypes.object,
        isValid: PropTypes.bool,
        otherOption: PropTypes.bool
    };    

    static defaultProps = {
        accounts: [],
        onChange: noop,
        isValid: true,
        otherOption: false
    };

    onChange = (option, e) => {
        if (option.value === OTHER_OPTION) {
            return console.log(option, e);
        }
        this.props.onChange(find(this.props.accounts, {currency: option.value}))
    }

    getOptions(accounts, currencyOptions, otherOption) {
        const accountOptions = accounts.map(account => {
            const currencyOption = find(currencyOptions, {code: account.currency});

            return {
                value: account.currency,
                label: (
                    <div className={styles.option}>
                        <span className={styles.optionText}>{account.currency}</span>
                        <FlagIcon name={currencyOption.flag} />
                    </div>
                )
            };
        });

        return otherOption ? [...accountOptions, OTHER_OPTION] : accountOptions;
    }

    render() {
        const {accounts, currencyOptions, selectedAccount, isValid, otherOption} = this.props;
        const selectedAccountSymbol = get(find(currencyOptions, {code: selectedAccount.currency}), 'symbol', '');
        const options = this.getOptions(accounts, currencyOptions, otherOption);
        const value = find(options, {value: selectedAccount.currency});

        return (
            <div className={styles.AccountSelect}>
                <Dropdown 
                    baseClassName={'AccountSelect'}
                    options={options}
                    onChange={this.onChange}
                    value={value} />
                <BalanceText
                    value={selectedAccount.balance}
                    currencySymbol={selectedAccountSymbol}
                    isValid={isValid} />
            </div>
        );
    }
};