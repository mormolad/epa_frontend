import { useState } from 'react';
import { useSelector } from 'react-redux';
import InputStars from '../InputStars/InputStars';
import styles from './EmployeeViewFilter.module.scss';

function EmployeeViewFilter({
  handleChange,
  showAllCards,
  version,
  getTasksByStatus,
}) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);
  const [selectedStatus, setSelectedStatus] = useState('NEW');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    getTasksByStatus(status);
  };

  return viewMarks ? (
    <div className={styles.employeeViewFilter__container}>
      <div className={styles.employeeViewFilter__marks}>
        <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
        <div className={styles.employeeViewFilter__stars}>
          <InputStars
            name="stars"
            handleChange={handleChange}
            version={version}
          />
        </div>
        <button
          type="button"
          className={`${styles.employeeViewFilter__button_marks} ${styles.employeeViewFilter__button}`}
          onClick={showAllCards}
        >
          Все
        </button>
      </div>
      <div className={styles.employeeViewFilter__calendar}>
        <input
          type="text"
          className={`${styles.employeeViewFilter__input_marks} ${styles.employeeViewFilter__input}`}
          placeholder="Календарь"
        />
        <button type="button" className={styles.employeeViewFilter__icon} />
      </div>
    </div>
  ) : (
    <form className={styles.employeeViewFilter__container}>
      <h3 className={styles.employeeViewFilter__title}>Фильтры:</h3>
      <div
        className={styles.employeeViewFilter__inputs}
        onChange={handleChange}
      >
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="new"
          value="new"
          aria-label="К выполнению"
          defaultChecked
          onClick={() => handleStatusChange('NEW')}
        />
        <label
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'NEW' ? styles.selected : ''}`}
          htmlFor="new"
        >
          К выполнению
        </label>
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="inProgress"
          value="inProgress"
          aria-label="В работе"
          onClick={() => handleStatusChange('IN_PROGRESS')}
        />
        <label
          htmlFor="inProgress"
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'IN_PROGRESS' ? styles.selected : ''}`}
        >
          В работе
        </label>
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="review"
          value="review"
          aria-label="На ревью"
          onClick={() => handleStatusChange('REVIEW')}
        />
        <label
          htmlFor="review"
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'REVIEW' ? styles.selected : ''}`}
        >
          На ревью
        </label>
        <input
          className={styles.employeeViewFilter__input_task}
          type="radio"
          name="filterTask"
          id="done"
          value="done"
          aria-label="Выполнено"
          onClick={() => handleStatusChange('DONE')}
        />
        <label
          htmlFor="done"
          className={`${styles.employeeViewFilter__label} ${selectedStatus === 'DONE' ? styles.selected : ''}`}
        >
          Выполнено
        </label>
      </div>
      <input
        type="text"
        className={styles.employeeViewFilter__input}
        placeholder="Поиск"
      />
    </form>
  );
}

export default EmployeeViewFilter;
