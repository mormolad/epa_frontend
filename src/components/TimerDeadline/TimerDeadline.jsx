import { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import styles from './TimerDeadline.module.scss';

function TimerDeadline({ card }) {
  const [progress, setProgress] = useState(50); // дождаться даты создания задичи от бэк
  const [colorButton, setColorButton] = useState('');
  const [textButton, setTextButton] = useState('');

  // Функция для вычисления количества дней между двумя датами
  function calculateDaysBetweenDates(startDate, endDate) {
    // Разница в миллисекундах
    const diffTime = endDate - startDate;
    // Переводим миллисекунды в дни
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return card.status === 'REVIEW' || card.status === 'DONE'
      ? 0
      : Math.floor(diffDays);
  }

  const taskData = {
    dateValue: calculateDaysBetweenDates(new Date(), new Date(card.deadLine)),
    progressValue: progress,
  };

  const handleButtonType = (status) => {
    if (status === 'needReview') {
      setColorButton('rgb(242, 72, 34)');
      setTextButton('Пора сдавать на ревью');
    }
    if (status === 'DONE') {
      setColorButton('rgb(0, 211, 127)');
      setTextButton('Well done');
    }
    if (status === 'REVIEW') {
      setColorButton('rgb(197, 182, 241)');
      setTextButton('На ревью');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(() => {
        const diff = Math.random() * 1;
        return Math.min(100 + diff, taskData.progressValue);
      });
    }, 500);
    taskData.dateValue < 0
      ? handleButtonType('needReview')
      : handleButtonType(card.status);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleDateValue = (date) => {
    if (date === (1 || 21 || 31 || 41 || 51)) {
      return `Остался ${date} день`;
    }
    if (date < (5 || 25 || 35 || 45 || 55)) {
      return `Осталось ${date} дня`;
    }
    if (date > (4 || 24 || 34 || 44 || 54)) {
      return `Осталось ${date} дней`;
    }
  };

  return (
    <div className={styles.container}>
      {taskData.dateValue <= 0 ? (
        <button
          style={{ backgroundColor: colorButton }}
          className={styles.progress}
        >
          <span className={styles.statusText}>{textButton}</span>
        </button>
      ) : (
        <button className={styles.progress}>
          <LinearProgress
            color="inherit"
            className={styles.range}
            variant="determinate"
            value={taskData.progressValue}
          />
          <span className={styles.text}>
            {handleDateValue(taskData.dateValue)}
          </span>
        </button>
      )}
    </div>
  );
}

export default TimerDeadline;
