import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeViewHeader from '../../components/EmployeeViewHeader/EmployeeViewHeader.jsx';
import Switch from '../../components/Switch/Switch.jsx';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import EmployeeViewFilter from '../../components/EmployeeViewFilter/EmployeeViewFilter.jsx';
import EmployeeViewBlock from '../../components/EmployeeViewBlock/EmployeeViewBlock.jsx';
import { useFormValidation } from '../../hooks/useFormValidation';
import { setViewMarks } from '../../store/slices/viewMarksSlices.js';
import styles from './EmployeeViewPage.module.scss';
import {
  getCurrentUser,
  getUserTasksWithStatusByAdmin,
  getTasksWithStatusByUser,
  getQuestionnaireListByAdmin,
  getQuestionnaireListByUser,
  getRatingByAdmin,
  getRatingByUser,
  getStatPointsByAdmin,
  getStatPointsByUser,
} from '../../utils/mainApi.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function EmployeeViewPage() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();

  const user = useSelector((state) => state.user);
  const viewMarks = useSelector((state) => state.viewMarks.viewMarks);

  const { values, handleChange, setValues } = useFormValidation();
  const [viewTask, setViewTask] = useState(viewMarks);
  const [allMarks, setAllMarks] = useState([]);
  const [currentMarks, setCurrentMarks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [version, setVersion] = useState(0);
  const [employee, setEmployee] = useState({});

  const [rating, setRating] = useState(0);
  const [points, setPoints] = useState(0);

  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userData;
        let tasksData;
        let ratingData;
        let pointsData;
        let questionnaireList;

        if (employeeId && user.isAdmin) {
          userData = await getCurrentUser(employeeId);
          tasksData = await getUserTasksWithStatusByAdmin(employeeId, 'NEW');
          ratingData = await getRatingByAdmin(employeeId);
          pointsData = await getStatPointsByAdmin(employeeId);
          questionnaireList = await getQuestionnaireListByAdmin(employeeId);
        } else {
          userData = await getCurrentUser(user.id);
          tasksData = await getTasksWithStatusByUser('NEW');
          ratingData = await getRatingByUser();
          pointsData = await getStatPointsByUser();
          questionnaireList = await getQuestionnaireListByUser();
        }
        setEmployee(userData);
        setCurrentTasks(tasksData);
        setRating(ratingData);
        setPoints(pointsData);
        setAllMarks(questionnaireList);
        setCurrentMarks(questionnaireList);
      } catch (error) {
        handleError(error);
      }
    };

    fetchData();
  }, [employeeId]);

  // Сортировка анкет по дате
  useEffect(() => {
    const sorted = allMarks.sort((a, b) =>
      b.createQuestionnaire.localeCompare(a.createQuestionnaire)
    );
    setAllMarks(sorted);
  }, []);

  useEffect(() => {
    if (values.stars) {
      setCurrentMarks(
        allMarks.filter(
          (i) => Math.round(Number(i.middleScore)) === Number(values.stars)
        )
      );
    } else {
      setCurrentMarks(allMarks);
    }
  }, [values]);

  useEffect(() => {
    dispatch(setViewMarks(viewTask));
  }, [viewTask]);

  function showAllCards() {
    setCurrentMarks(allMarks);
    setValues({});
    resetStarsFilter();
  }

  function resetStarsFilter() {
    setVersion(version + 1);
  }

  async function getTasksByStatus(status) {
    const tasks = user.isAdmin
      ? await getUserTasksWithStatusByAdmin(employeeId, status)
      : await getTasksWithStatusByUser(status);

    setCurrentTasks(tasks);
  }

  return (
    <>
      {isPopupOpen && (
        <InfoPopup
          title={popupTitle}
          text={popupText}
          handleClosePopup={closePopup}
        />
      )}
      <section className={styles.employeeViewPage__container}>
        <EmployeeViewHeader
          employee={employee}
          rating={rating}
          points={points}
        />
        <Switch
          labelLeft="Задачи"
          labelRight="Оценки"
          isChecked={viewTask}
          setIsChecked={setViewTask}
        />
        <EmployeeViewFilter
          handleChange={handleChange}
          showAllCards={showAllCards}
          version={version}
          getTasksByStatus={getTasksByStatus}
        />
        <EmployeeViewBlock
          tasks={currentTasks}
          marks={currentMarks}
          employeeId={employeeId}
        />
      </section>
    </>
  );
}

export default EmployeeViewPage;
