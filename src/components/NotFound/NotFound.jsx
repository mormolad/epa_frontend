import { useNavigate } from 'react-router-dom';
import { ENDPOINT_ROUTES } from '../../constants/constantsEndpointRoute.js';
import './NotFound.scss';

function NotFound() {
  const { personalArea } = ENDPOINT_ROUTES;
  const navigate = useNavigate();

  function handleClickBack() {
    navigate(personalArea);
  }

  return (
    <section className="not-found">
      <div className="not-found__container">
        <div className="not-found__image" />
        <h2 className="not-found__title">Страница не найдена</h2>
        <button type="button" className="not-found__back" onClick={handleClickBack}>
          Вернуться
          <div className="not-found__back-image" />
        </button>
      </div>
    </section>
  );
}

export default NotFound;
