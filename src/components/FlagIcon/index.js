import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class FlagIcon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    render() {
        const IconComponent = require(`./images/${this.props.name}.svgx`);

        return <IconComponent className={styles.icon} />;
    }
};
