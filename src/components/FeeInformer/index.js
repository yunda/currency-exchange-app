import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import NumberFormat from 'react-number-format';
import infoIcon from './info-icon.svg'

export default class FeeInformer extends Component {
    static propTypes = {
        value: PropTypes.number,
        currencySymbol: PropTypes.string
    };    

    static defaultProps = {
        value: 0,
        currencySymbol: ''
    };

    render() {
        const {value, currencySymbol} = this.props;

        return (
            <div className={styles.feeInformer}>
                <span>Inc. fee:&nbsp;</span>
                <NumberFormat
                    value={value}
                    displayType={'text'}
                    prefix={currencySymbol}
                    decimalPrecision={2} />
                <img className={styles.icon} src={infoIcon} alt="" />
            </div>
        );
    }
};
