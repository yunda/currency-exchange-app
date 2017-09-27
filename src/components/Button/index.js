import React from 'react';
import styles from './styles.css';

const Button = (props) => {
    return <button className={styles.primary} {...props}>{props.children}</button>;
};

export default Button;
