import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeeViewCard from '../EmployeeViewCard/EmployeeViewCard';
import styles from './EmployeeViewBlock.module.scss';

function EmployeeViewBlock({ tasks, marks, employeeId }) {
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (tasks.length === 0 && !employeeId) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [tasks]);

  return (
    <>
      <ul className={styles.employeeViewBlock__list}>
        {viewMarks
          ? marks.map((card) => (
              <EmployeeViewCard
                type="marks"
                key={card.idQuestionnaire}
                idQuestionnaire={card.idQuestionnaire}
                date={card.createQuestionnaire}
                rating={card.middleScore}
                employeeId={employeeId}
              />
            ))
          : tasks &&
            tasks.map((task) => (
              <EmployeeViewCard type="tasks" key={task.id} task={task} />
            ))}
      </ul>
      {tasks && isEmpty && !viewMarks && (
        <div className={styles.employeeViewBlock__empty}>
          <div className={styles.employeeViewBlock__image} />
          <p>Список задач пуст.</p>
        </div>
      )}
    </>
  );
}

export default EmployeeViewBlock;
