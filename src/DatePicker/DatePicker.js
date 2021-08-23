import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './DatePicker.module.css';
import Button from '../Button/Button';

const DatePicker = ({ isVisible }) => {
  useEffect(() => {}, [isVisible]);
  const date = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysArray = (year, month) => {
    let monthIndex = month;

    let date = new Date(year, monthIndex, 1);
    console.log(date);
    date.setFullYear(year);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push({ day: date.getDate(), dayOfWeek: dayNames[date.getDay()], dayOfWeekIndex: date.getDay() });
      date.setDate(date.getDate() + 1);
    }
    console.log(result);
    console.log(date);
    const firstDay = result[0];
    const index = dayNames.indexOf(firstDay.dayOfWeek);
    const realIndex = index ? index - 1 : 6;
    const toAppend = [];
    for (let i = 0; i < realIndex; i++) {
      toAppend.push({ disabled: true });
    }
    result = [...toAppend, ...result];
    const rowData = [];
    const rowSize = Math.floor(result.length / 7) + (result.length % 7 ? 1 : 0);
    for (let i = 0; i < rowSize; i++) rowData.push([]);

    result.forEach((item, ind) => rowData[Math.floor(ind / 7)].push(item));
    return rowData;
  };
  console.log(date.getDay());
  console.log(date.getFullYear());
  console.log(date.getMonth());
  const calendarData = getDaysArray(date.getFullYear(), date.getMonth());
  console.log(calendarData);

  return (
    <section>
      <div className={styles.box}>
        <div className={styles.container + ' ' + (isVisible ? styles.visibleBox : styles.invisibleBox)}>
          <div className={styles.calendarRowContainer}>
            <div className={styles.calendarTopContainer}>
              <div className={styles.calendarButton}>&larr;</div>
              <div className={styles.calendarTopInfo}>{monthNames[date.getMonth()] + ' ' + date.getFullYear()}</div>
              <div className={styles.calendarButton}>&rarr;</div>
            </div>
            <div className={styles.calendarRow}>
              {dayLabels.map((day) => (
                <div className={styles.calendarItem}>{day[0]}</div>
              ))}
            </div>
            {calendarData.map((row) => (
              <div className={styles.calendarRow}>
                {row.map((dayData) =>
                  dayData.disabled ? (
                    <div className={styles.calendarItem}></div>
                  ) : (
                    <div className={styles.calendarItem}>{dayData.day}</div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatePicker;
