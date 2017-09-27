import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import NumberFormat from 'react-number-format';

export default class RateInformer extends Component {
    static propTypes = {
        exhcnageFromCurrencySign: PropTypes.string,
        exchangeToCurrencySign: PropTypes.string,
        rate: PropTypes.number
    };    

    static defaultProps = {
        isValid: true,
        value: 0,
        currencySign: ''
    };

    render() {
        const {exhcnageFromCurrencySign, exchangeToCurrencySign, rate} = this.props;

        return (
            <div className={styles.informer}>
                <span>{exhcnageFromCurrencySign}1&nbsp;=&nbsp;</span>
                <NumberFormat
                    value={rate}
                    displayType={'text'}
                    prefix={exchangeToCurrencySign}
                    decimalPrecision={4} />
            </div>
        );
    }
};
