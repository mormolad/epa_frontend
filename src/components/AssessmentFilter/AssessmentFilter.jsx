import styles from './AssessmentFilter.module.scss';

function AssessmentFilter() {
  return (
    <div className={styles.assessmentFilter__container}>
      <div className={styles.assessmentFilter__filter}>Фильтры:</div>
      <div className={styles.assessmentFilter__buttons}>
        <button className={styles.assessmentFilter__torate}>Оценить</button>
        <button className={styles.assessmentFilter__rated}>
          Оценка поставлена
        </button>
      </div>
      <div className={styles.assessmentFilter__search}>
        <input type="text" className={styles.assessmentFilter__input} />
        <div className={styles.assessmentFilter__icon} />
      </div>
    </div>
  );
}

export default AssessmentFilter;
