import React, { useState } from 'react';
import DatePicker from './DatePicker/DatePicker';
import Button from './Button/Button';
import styles from './App.module.css';

const App = () => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const handleCheckInClick = () => {
    setShowCheckIn(!showCheckIn);
  };

  const handleCheckOutClick = () => {
    setShowCheckOut(!showCheckOut);
  };

  return (
    <div className={styles.pageBody}>
      <div className={styles.app}>
        <div className={styles.calendars}>
          <div className={styles.container}>
            <Button title="Check In" onClick={handleCheckInClick} />
            <DatePicker isVisible={showCheckIn} />
          </div>
          <div className={styles.container}>
            <Button title="Check Out" onClick={handleCheckOutClick} />
            <DatePicker isVisible={showCheckOut} />
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};

export default App;
