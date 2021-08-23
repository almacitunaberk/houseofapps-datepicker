import React from 'react';
import styles from './Button.module.css';

const Button = ({ title, onClick }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <div className={styles.container}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Button;
