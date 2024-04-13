import { Link } from 'react-router-dom';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import PersonalAreaHeader from '../../components/PersonalAreaHeader/PersonalAreaHeader.jsx';
import PersonalAreaForm from '../../components/PersonalAreaForm/PersonalAreaForm.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import './PersonalArea.scss';

function PersonalArea() {
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();
  const { criteria } = ENDPOINT_ROUTES;

  return (
    <section className="personal-area">
      {isPopupOpen && <InfoPopup title={popupTitle} text={popupText} handleClosePopup={closePopup} />}
      <PersonalAreaHeader />
      <div className="personal-area__section">
        <PersonalAreaForm handleError={handleError} />
        <div className="personal-area__questionnaire">
          <h3 className="personal-area__questionnaire-title">
            Анкета для оценки
          </h3>
          <Link
            to={criteria}
            className="personal-area__questionnaire-link"
          >
            <div className="personal-area__questionnaire-container">
              <p className="personal-area__questionnaire-text">
                {`Вы можете редактировать анкету
              для оценки сотрудника.
              Добавлять новые критерии
              и менять заданные.`}
              </p>
              <p className="personal-area__questionnaire-text">
                {`У вас есть возможность выбрать,
              что будет влиять на рейтинг
              сотрудника, только Ваши оценки или
              оценки всей команды.`}
              </p>
              <p className="personal-area__questionnaire-text">
                Перейти к анкете
                <span className="personal-area__questionnaire-link-icon" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PersonalArea;
