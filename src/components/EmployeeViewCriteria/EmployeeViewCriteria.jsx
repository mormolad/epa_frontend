import SetStars from '../SetStars/SetStars';
import styles from './EmployeeViewCriteria.module.scss';

function EmployeeViewCriteria({ text, adminScore, colleaguesScore }) {
  return (
    <div className={styles.employeeViewCriteria__card}>
      <p className={styles.employeeViewCriteria__text}>{text}</p>
      <div className={styles.employeeViewCriteria__starbox}>
        <SetStars
          rating={adminScore}
          starOut={styles.employeeViewCriteria__star_out}
          starIn={styles.employeeViewCriteria__star_in}
        />
      </div>
      <div className={styles.employeeViewCriteria__starbox}>
        <SetStars
          rating={colleaguesScore}
          starOut={styles.employeeViewCriteria__star_out}
          starIn={styles.employeeViewCriteria__star_in}
        />
      </div>
    </div>
  );
}

export default EmployeeViewCriteria;
