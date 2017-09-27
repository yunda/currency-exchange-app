import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import NumberFormat from 'react-number-format';
import infoIcon from './info-icon.svg'

export default class FeeInformer extends Component {
    static propTypes = {
        value: PropTypes.number,
        currencySign: PropTypes.string
    };    

    static defaultProps = {
        value: 0,
        currencySign: ''
    };

    render() {
        const {value, currencySign} = this.props;

        return (
            <div className={styles.feeInformer}>
                <span>Inc. fee:&nbsp;</span>
                <NumberFormat
                    value={value}
                    displayType={'text'}
                    prefix={currencySign}
                    decimalPrecision={2} />
                <img className={styles.icon} src={infoIcon} alt="" />
            </div>
        );
    }
};
