import React, { useState } from 'react';
import DatePicker from './DatePicker/DatePicker';
import Button from './Button/Button';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.pageBody}>
      <div className={styles.app}>
        <div className={styles.calendars}>
          <div className={styles.container}>
            <DatePicker />
          </div>
          <div className={styles.container}></div>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default App;
