import { useState } from 'react';
import './PopupKanban.scss';
import ContainerInputPopupKanban from '../ContainerInputPopupKanban/ContainerInputPopupKanban.jsx';
import { setNewProjects, getProjectsName } from '../../utils/mainApi.js';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

export default function PopupKanban({ setIsOpenPopup, projects, setProjects }) {
  const [isNewProject, setIsNewProject] = useState(false);
  const [nameProject, setProjectName] = useState('');
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  function handleClickClose() {
    setIsOpenPopup(false);
  }

  function handleNameProject(e) {
    setProjectName(e.target.value);
  }

  function handleClickNewProject() {
    setIsNewProject(true);
  }

  function handleButtonNewProject() {
    setNewProjects(nameProject)
      .catch((err) => handleError(err))
      .finally(() => {
        setProjectName('');
        setIsNewProject(false);
        getProjectsName()
          .then((res) => {
            setProjects(res);
          })
          .catch((err) => handleError(err));
      });
  }

  return (
    <div className="popup-kanban">
      <div className="popup-kanban__popup">
        <h1 className="popup-kanban__title">Редактировать</h1>
        {projects.map((item) => (
          <ContainerInputPopupKanban
            item={item}
            key={item.name}
            setProjects={setProjects}
          />
        ))}
        {isNewProject && (
          <div className="container-input-popup-kanban__input-conteiner">
            <input
              type="text"
              className="container-input-popup-kanban__input"
              onChange={handleNameProject}
              value={nameProject}
            />
            <button
              className="container-input-popup-kanban__button container-input-popup-kanban__button_edit"
              aria-label="кнопка редактирования проекта"
              onClick={handleButtonNewProject}
            />
          </div>
        )}
        <button
          className="popup-kanban__button "
          onClick={handleClickNewProject}
        >
          Добавить новый проект +
        </button>
        <button
          className="popup-kanban__button popup-kanban__button_purple"
          aria-label="Подтвердить"
        >
          Подтвердить
        </button>
        <button
          className="popup-kanban__button popup-kanban__button_close"
          aria-label="закрыть модальное окно"
          onClick={handleClickClose}
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
