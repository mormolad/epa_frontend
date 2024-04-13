import SetStars from '../SetStars/SetStars';
import styles from './EmployeeViewHeader.module.scss';
import { formPointsText } from '../../utils/utils';
import IconUser from '../../images/icon-user-header.svg';

function EmployeeViewHeader({ employee, rating, points }) {
  const month = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className={styles.employeeViewHeader__container}>
      <div className={styles.employeeViewHeader__bio}>
        <img
          className={styles.employeeViewHeader__image}
          alt="иконка пользователя"
          src={IconUser}
        />
        <p className={styles.employeeViewHeader__name}>{employee.fullName}</p>
        <p className={styles.employeeViewHeader__job}>
          {employee.position || 'Должность неизвестна'}
        </p>
      </div>
      <div className={styles.employeeViewHeader__rating}>
        <p>Рейтинг за {month}</p>
        <div className={styles.employeeViewHeader__stars}>
          <SetStars
            rating={rating}
            starOut={styles.employeeViewHeader__star_out}
            starIn={styles.employeeViewHeader__star_in}
          />
        </div>
      </div>
      <div className={styles.employeeViewHeader__point}>
        {points || '0'} {formPointsText(points)}
      </div>
    </div>
  );
}

export default EmployeeViewHeader;
