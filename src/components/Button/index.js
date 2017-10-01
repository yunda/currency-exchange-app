import React from 'react';
import styles from './styles.css';

const Button = ({ children, ...props }) => {
    return <button className={styles.primary} {...props}>{children}</button>;
};

export default Button;
