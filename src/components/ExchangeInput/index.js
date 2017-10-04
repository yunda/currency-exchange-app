import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import noop from 'lodash/noop';
import styles from './styles.css';
import FeeInformer from '../FeeInformer';

export default class ExchangeInput extends Component {
    static propTypes = {
        value: PropTypes.string,
        operationSymbol: PropTypes.string,
        currencySymbol: PropTypes.string,
        onChange: PropTypes.func,
        inputId: PropTypes.string,
        fee: PropTypes.number
    };    

    static defaultProps = {
        value: '',
        operationSymbol: '',
        onChange: noop,
        inputId: '',
        fee: 0
    };

    render() {
        const {value, operationSymbol, onChange, inputId, fee, currencySymbol} = this.props;

        return (
            <div className={styles.wrapper}>
                {value && <span>{operationSymbol}</span>}
                <NumberFormat
                    id={inputId}
                    className={styles.input}
                    value={value}
                    size={value.length || 1}
                    allowNegative={false}
                    type={'tel'}
                    onChange={onChange}
                    placeholder={'0'} />
                {fee ? <FeeInformer value={fee} currencySymbol={currencySymbol} /> : null}
            </div>
        );
    }
};
