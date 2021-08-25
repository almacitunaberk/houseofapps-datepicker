import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './DatePicker.module.css';
import Button from '../Button/Button';

const DatePicker = () => {
  const date = new Date();
  const [checkInDate, setCheckInDate] = useState({
    day: date.getDate(),
    year: date.getFullYear(),
    month: date.getMonth(),
    comparisonIndex: date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate(),
  });
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [checkInTitle, setCheckInTitle] = useState(`${checkInDate.day}-${checkInDate.month}-${checkInDate.year}`);
  const coDate = new Date();
  coDate.setDate(date.getDate() + 5);
  const [checkOutDate, setCheckOutDate] = useState({
    day: coDate.getDate(),
    year: coDate.getFullYear(),
    month: coDate.getMonth(),
    comparisonIndex: coDate.getFullYear() * 10000 + coDate.getMonth() * 100 + coDate.getDate(),
  });
  const [checkOutTitle, setCheckOutTitle] = useState(`${checkOutDate.day}-${checkOutDate.month}-${checkOutDate.year}`);

  const [selectionType, setSelectionType] = useState('IN');
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
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
    date.setFullYear(year);
    var result = [];
    while (date.getMonth() == monthIndex) {
      result.push({
        day: date.getDate(),
        dayOfWeek: dayNames[date.getDay()],
        dayOfWeekIndex: date.getDay(),
        year,
        month: date.getMonth(),
        comparisonIndex: date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate(),
      });
      date.setDate(date.getDate() + 1);
    }
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

  const calendarData = getDaysArray(year, month);

  const handleDateSelection = (e, dayData) => {
    if (dayData.comparisonIndex < checkInDate.comparisonIndex) {
      setCheckInDate(dayData);
      setCheckInTitle(`${dayData.day}-${dayData.month}-${dayData.year}`);
      setSelectionType('OUT');
    } else if (dayData.comparisonIndex > checkOutDate.comparisonIndex) {
      setCheckOutDate(dayData);
      setCheckOutTitle(`${dayData.day}-${dayData.month}-${dayData.year}`);
      setSelectionType('IN');
    } else if (selectionType === 'IN') {
      setCheckInDate(dayData);
      setSelectionType('OUT');
      setCheckInTitle(`${dayData.day}-${dayData.month}-${dayData.year}`);
    } else if (selectionType === 'OUT') {
      setCheckOutDate(dayData);
      setSelectionType('IN');
      setCheckOutTitle(`${dayData.day}-${dayData.month}-${dayData.year}`);
    }
  };

  const decrementMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const incrementMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const checkInButtonClicked = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const checkOutButtonClicked = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  useEffect(() => {}, [isCalendarVisible]);

  return (
    <>
      <div className={styles.buttons}>
        <Button title={checkInTitle} onClick={checkInButtonClicked} />
        <Button title={checkOutTitle} onClick={checkOutButtonClicked} />
      </div>
      <section>
        <div className={styles.box}>
          <div className={styles.container + ' ' + (isCalendarVisible ? styles.visibleBox : styles.invisibleBox)}>
            <div className={styles.calendarRowContainer}>
              <div className={styles.calendarTopContainer}>
                <div className={styles.calendarButton} onClick={decrementMonth}>
                  &larr;
                </div>
                <div className={styles.calendarTopInfo}>{monthNames[month] + ' ' + year}</div>
                <div className={styles.calendarButton} onClick={incrementMonth}>
                  &rarr;
                </div>
              </div>
              <div className={styles.calendarRow}>
                {dayLabels.map((day) => (
                  <div className={styles.calendarDayInitial}>{day[0]}</div>
                ))}
              </div>
              {calendarData.map((row) => (
                <div className={styles.calendarRow}>
                  {row.map((dayData) =>
                    dayData.disabled ? (
                      <div className={styles.calendarItemDisabled}></div>
                    ) : (
                      <div
                        className={
                          styles.calendarItem +
                          ' ' +
                          (dayData.comparisonIndex === checkInDate.comparisonIndex ||
                          dayData.comparisonIndex === checkOutDate.comparisonIndex
                            ? styles.checkInDate
                            : '') +
                          (dayData.comparisonIndex < checkOutDate.comparisonIndex &&
                          dayData.comparisonIndex > checkInDate.comparisonIndex
                            ? styles.calendarBetweenDate
                            : '')
                        }
                        onClick={(e) => handleDateSelection(e, dayData)}
                      >
                        {dayData.day}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DatePicker;
