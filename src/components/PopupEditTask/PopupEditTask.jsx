import { useState, useEffect } from 'react';
import './PopupEditTask.scss';
import DropdownMenu from '../DropDownMenu/DropDownMenu';
import OneDatePicker from '../OneDatePicker/OneDatePicker.jsx';
import { getAllUsers, patchAdminTask } from '../../utils/mainApi.js';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function PopupEditTask({
  setIsOpenPopup,
  title,
  projects,
  taskOldContent,
  setIsTaskEdited,
}) {
  /* так должны выглядеть пропсы.
<PopupEditTask
          setIsOpenPopup={setIsOpenPopupAddTask}
          idProject={currentProgect.id}
          title="Редактировать здачу"
          projects={projects}
          taskOldContent={{
            name: "fp8JzvbDEU4OA",
            description: "Jzj5tXmoFRO1",
            project: { name: 'projectfdsfsf', id: 9 },
            employee: { name: 'employeedfssfs', id: 133 },
            deadLine: "2024-04-08",
            status: "NEW",
            basicPoints: 11110,
            penaltyPoints: 10,
            taskId: 48
          }
          }
        />
       */
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();
  const [startDate, setStartDate] = useState(taskOldContent.deadLine);
  const [taskName, setTaskName] = useState(taskOldContent.name);
  const [project, setProject] = useState(taskOldContent.project);
  const [employee, setEmployee] = useState(taskOldContent.employee);
  const [pointTask, setPointTask] = useState(taskOldContent.basicPoints);
  const [pointsPenalty, setPointsPenalty] = useState(
    taskOldContent.penaltyPoints
  );
  const [taskContent, setTaskContent] = useState(taskOldContent.description);
  const [employees, setEmployees] = useState([]);
  const [isOpenDropMenuProjects, setIsOpenDropMenuProjects] = useState(false);
  const [isOpenDropMenuEmployees, setIsOpenDropMenuEmployees] = useState(false);

  function handleClickSubmit() {
    patchAdminTask(taskOldContent.taskId, {
      name: taskName,
      description: taskContent,
      projectId: project.id,
      executorId: employee.id,
      deadLine: convertDate(startDate),
      status: taskOldContent.status,
      basicPoints: pointTask * 1,
      penaltyPoints: pointsPenalty,
    })
      .then(() => {
        setIsTaskEdited && setIsTaskEdited(true);
        setIsOpenPopup(false);
      })
      .catch((err) => handleError(err));
  }

  function convertDate(dateStr) {
    const dateObj = new Date(Date.parse(dateStr));
    const isoDate = dateObj.toISOString().split('T')[0];
    return isoDate;
  }

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setEmployees(res.map((item) => ({ id: item.id, name: item.fullName })));
      })
      .catch((err) => handleError(err));
  }, []);

  return (
    <div className="popup-edit-task">
      <div className="popup-edit-task__popup">
        <h1 className="popup-edit-task__title">{title}</h1>
        <form className="popup-edit-task__container-inputs">
          <div className="popup-edit-task__input-container">
            <input
              type="text"
              className="popup-edit-task__input "
              placeholder="Название задачи"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            />
          </div>
          <div className="popup-edit-task__input-container">
            <input
              type="text"
              className="popup-edit-task__input"
              placeholder="Проект к которому относится задача"
              onChange={(e) =>
                setProject({ name: e.target.value, id: project.id })
              }
              value={project.name}
            />
            <button
              type="button"
              className={`
              popup-edit-task__button-input popup-edit-task__button-input_arrow-down`}
              aria-label={'Выбрать проект к которому относится задача"'}
              onClick={() => {
                setIsOpenDropMenuProjects(true);
              }}
            />
            {isOpenDropMenuProjects && (
              <DropdownMenu
                setIsOpen={setIsOpenDropMenuProjects}
                items={projects}
                onSelect={setProject}
              />
            )}
          </div>
          <OneDatePicker
            title="Дедлайн"
            startDate={startDate}
            setStartDate={setStartDate}
          />
          <div className="popup-edit-task__input-container">
            <input
              type="text"
              className="popup-edit-task__input "
              placeholder="Исполнитель"
              onChange={(e) =>
                setEmployee({ name: e.target.value, id: employee.id })
              }
              value={employee.name}
            />
            <button
              type="button"
              className={`
              popup-edit-task__button-input popup-edit-task__button-input_arrow-down`}
              aria-label='редактировать поле "Исполнитель"'
              onClick={() => {
                setIsOpenDropMenuEmployees(true);
              }}
            />
            {isOpenDropMenuEmployees && (
              <DropdownMenu
                setIsOpen={setIsOpenDropMenuEmployees}
                items={employees}
                onSelect={setEmployee}
              />
            )}
          </div>
          <div className="popup-edit-task__input-container">
            <input
              type="text"
              className="popup-edit-task__input "
              placeholder="Баллы за задачу"
              onChange={(e) => setPointTask(e.target.value)}
              value={pointTask}
            />
          </div>
          <div className="popup-edit-task__input-container">
            <input
              type="text"
              className="popup-edit-task__input "
              placeholder="Бонусные и штрафные баллы"
              onChange={(e) => setPointsPenalty(e.target.value)}
              value={pointsPenalty}
            />
          </div>
          <div className="popup-edit-task__input-container popup-edit-task__input-container_big">
            <span className="popup-edit-task__span">
              Баллы, которые нужно списать за каждый день нарушения дедлайна или
              начислить за сдачу раньше срока
            </span>
            <textarea
              type="text"
              className="popup-edit-task__input_textarea"
              placeholder="Описание задачи"
              onChange={(e) => setTaskContent(e.target.value)}
              value={taskContent}
            />
          </div>
        </form>
        <button
          className="popup-edit-task__button popup-edit-task__button_purple"
          aria-label="Подтвердить"
          onClick={handleClickSubmit}
        >
          Подтвердить
        </button>
        <button
          className="popup-edit-task__button popup-edit-task__button_close"
          aria-label="закрыть модальное окно"
          onClick={() => setIsOpenPopup(false)}
        />
      </div>
      {isPopupOpen && (
        <InfoPopup
          title={popupTitle}
          text={popupText}
          handleClosePopup={closePopup}
        />
      )}
    </div>
  );
}

export default PopupEditTask;
