import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import NumberFormat from 'react-number-format';

export default class RateInformer extends Component {
    static propTypes = {
        exhcnageFromSymbol: PropTypes.string,
        exchangeToSymbol: PropTypes.string,
        rate: PropTypes.number
    };    

    static defaultProps = {
        isValid: true,
        value: 0,
        currencySign: ''
    };

    render() {
        const {exhcnageFromSymbol, exchangeToSymbol, rate} = this.props;

        return (
            <div className={styles.informer}>
                <span>{exhcnageFromSymbol}1&nbsp;=&nbsp;</span>
                <NumberFormat
                    value={rate}
                    displayType={'text'}
                    prefix={exchangeToSymbol}
                    decimalPrecision={4} />
            </div>
        );
    }
};
