import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import NumberFormat from 'react-number-format';

export default class BalanceText extends Component {
    static propTypes = {
        isValid: PropTypes.bool,
        value: PropTypes.number,
        currencySign: PropTypes.string
    };    

    static defaultProps = {
        isValid: true,
        value: 0,
        currencySign: ''
    };

    render() {
        const {isValid, value, currencySign} = this.props;
        const {regular, invalid} = styles;

        return (
            <div className={isValid ? regular : invalid}>
                <span>Balance:&nbsp;</span>
                <NumberFormat
                    value={value}
                    displayType={'text'}
                    prefix={currencySign}
                    decimalPrecision={2}
                    thousandSeparator />
            </div>
        );
    }
};
