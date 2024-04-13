import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ENDPOINT_ROUTES } from '../../../constants/constantsEndpointRoute';
import '../MenuAdmin/MenuAdmin.scss';

function MenuEmployee() {
  const {
    userArea,
    taskCards,
    ratingCards,
    board,
    estimate,
    questionnaire,
    analytics
  } = ENDPOINT_ROUTES;

  const { pathname } = useLocation();
  const [isPersonalArea, setIsPersonalArea] = useState(false);
  const [isBoard, setIsBoard] = useState(false);
  const [isEstimate, setIsEstimate] = useState(false);
  const [isAnalytics, setIsAnalytics] = useState(false);

  useEffect(() => {
    pathname.includes(userArea) ||
      pathname.includes(taskCards) ||
      pathname.includes(ratingCards) ?
      setIsPersonalArea(true) : setIsPersonalArea(false);

    pathname.includes(board) ?
      setIsBoard(true) : setIsBoard(false);

    pathname.includes(estimate) ||
      pathname.includes(questionnaire) ?
      setIsEstimate(true) : setIsEstimate(false);

    pathname.includes(analytics) ?
      setIsAnalytics(true) : setIsAnalytics(false);
  }, [pathname]);

  return (
    <ul className="menu">
      <Link to={userArea} className="menu__item">
        <div className={`menu__icon menu__icon-personal
          ${isPersonalArea && 'menu__icon-personal_active'}`} />
        <p className={`menu__text ${isPersonalArea && 'menu__text_active'}`}>Личный кабинет</p>
      </Link>
      <Link to={board} className="menu__item">
        <div className={`menu__icon menu__icon-kanban
          ${isBoard && 'menu__icon-kanban_active'}`} />
        <p className={`menu__text ${isBoard && 'menu__text_active'}`}>Канбан доска</p>
      </Link>
      <Link to={estimate} className="menu__item">
        <div className={`menu__icon menu__icon-assessments
          ${isEstimate && 'menu__icon-assessments_active'}`} />
        <p className={`menu__text ${isEstimate && 'menu__text_active'}`}>Оценки коллегу</p>
      </Link>
      <Link to={analytics} className="menu__item">
        <div className={`menu__icon menu__icon-analytics
          ${isAnalytics && 'menu__icon-analytics_active'}`} />
        <p className={`menu__text ${isAnalytics && 'menu__text_active'}`}>Аналитика</p>
      </Link>
    </ul>
  );
}

export default MenuEmployee;
