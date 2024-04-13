import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentCard from '../../components/AssessmentCard/AssessmentCard.jsx';
import { setIsAppreciated } from '../../store/slices/isAppreciatedSlices.js';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import {
  checkActivitySurveyButton,
  doQuestionnaireSurvey,
  getListComplitedQuestionnaires,
  getListNewQuestionnaires
} from '../../utils/mainApi.js';
import './AssessmentBlock.scss';

function AssessmentBlock() {
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const isAppreciated = useSelector((state) => state.isAppreciated.isAppreciated);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [users, setUsers] = useState([]);
  const [isActivitySurveyButton, setIsActivitySurveyButton] = useState(false);
  const [visiblePictureBoy, setVisiblePictureBoy] = useState(false);
  const [visiblePictureGirl, setVisiblePictureGirl] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      checkActivitySurveyButton()
        .then((res) => {
          setIsActivitySurveyButton(res);
        })
        .catch((err) => handleError(err));
    }
  }, []);

  useEffect(() => {
    if (isAppreciated) {
      getListNewQuestionnaires()
        .then((res) => {
          setUsers(res);
          showPictureEmptyList(res);
        })
        .catch((err) => handleError(err));
    } else {
      getListComplitedQuestionnaires()
        .then((res) => {
          setUsers(res);
          showPictureEmptyList(res);
        })
        .catch((err) => handleError(err));
    }
  }, [isAppreciated])

  function showPictureEmptyList(arrayUsers) {
    arrayUsers.length === 0 && isActivitySurveyButton ?
      setVisiblePictureBoy(true) :
      setVisiblePictureBoy(false);
    arrayUsers.length === 0 && !isActivitySurveyButton ?
      setVisiblePictureGirl(true) :
      setVisiblePictureGirl(false);
  }

  function handleChangeFilterState(e) {
    setVisiblePictureBoy(false);
    setVisiblePictureGirl(false);

    if (e.target.id === 'isAppreciated') {
      localStorage.setItem('isAppreciated', true)
      dispatch(setIsAppreciated(true));
      setUsers([]);
    } else {
      localStorage.setItem('isAppreciated', false);
      dispatch(setIsAppreciated(false));
      setUsers([]);
    }
  }

  function handleClickSurveyButton() {
    doQuestionnaireSurvey()
      .then(() => {
        getListNewQuestionnaires()
          .then((res) => {
            showPictureEmptyList(res);
            setUsers(res);
          })
          .catch((err) => handleError(err));
      })
      .catch((err) => handleError(err));
  }

  return (
    <section className="assessment-block">
      {isPopupOpen && <InfoPopup title={popupTitle} text={popupText} handleClosePopup={closePopup} />}
      <div className="assessment-block__container">
        <div className={`assessment-block__header ${!isAdmin && "assessment-block__header_is-user"}`}>
          <div className="header__wrapper">
            <div className="header__icon" />
            <h3 className="header__title">
              {`${isAdmin ? 'Оценка эффективности сотрудников' : 'Оцени коллегу'}`}
            </h3>
          </div>
          {!isAdmin &&
            <p className="header__subtitle">
              Анкеты анонимные. Постарайся быть объективным и внимательным при оценке коллег.
            </p>}
          {isAdmin && <button
            className={`header__button ${!isActivitySurveyButton && 'header__button_inactive'}`}
            onClick={handleClickSurveyButton}
            disabled={!isActivitySurveyButton}
          >
            Провести анкетирование
          </button>}
        </div>
        <div className="assessment-block__filters">
          <h3 className="filters__text">Фильтры:</h3>
          <button
            className={`filters__items filters__button
            ${isAppreciated && 'filters__button_active'}`}
            id="isAppreciated"
            onClick={handleChangeFilterState}
          >
            Оценить
          </button>
          <button
            className={`filters__items filters__button filters__button_done
            ${!isAppreciated && 'filters__button_active'}`}
            id="isAppreciated_done"
            onClick={handleChangeFilterState}
          >
            Оценка поставлена
          </button>
          <input
            type="text"
            placeholder="Поиск"
            className="filters__items filters__search"
          />
          <form className="filters__items filters__calendar">Календарь</form>
        </div>
        {visiblePictureBoy && (
          <>
            <div className="assessment-block__image_empty" />
            <p className="assessment-block__span">Список пока что пуст.</p>
            <p className="assessment-block__span">
              {isAdmin ? `Новые карточки для оценки сотрудников можете
              добавить с помощью кнопки «Провести анкетирование»` :
                `Уточнить дату анкетирования Вы можете у руководителя.`}
            </p>
          </>
        )}
        {visiblePictureGirl && (
          <>
            <div className="assessment-block__image_done" />
            <p className="assessment-block__span">Спасибо за ваше мнение!</p>
            <p className="assessment-block__span">
              {isAdmin ? `Новые карточки для оценки сотрудников можете
              добавить с помощью кнопки «Провести анкетирование»` :
                `Уточнить дату следующего анкетирования Вы можете у руководителя.`}
            </p>
          </>
        )}
        <ul className="assessment-block__list">
          {users.map((user) => (
            <AssessmentCard
              key={user.employeeId + user.questionnaireId + user.questionnaireCreated}
              fullName={user.employeeFullName}
              position={user.employeePosition}
              date={user.questionnaireCreated}
              questionnaireId={user.questionnaireId}
              employeeId={user.employeeId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AssessmentBlock;
