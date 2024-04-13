import { useState } from 'react';
import { ERRORS, RESPONSE_TITLES, RESPONSE_MESSAGES } from '../constants/errors';

export const useErrorHandler = () => {
  const [popupTitle, setPopupTitle] = useState('');
  const [popupText, setPopupText] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleError = (error) => {
    switch (error) {
      case ERRORS.code409:
        setPopupTitle(RESPONSE_TITLES.email);
        setPopupText(RESPONSE_MESSAGES.errorEmail);
        break;
      case ERRORS.code500:
        setPopupTitle(RESPONSE_TITLES.server);
        setPopupText(RESPONSE_MESSAGES.errorServer);
        break;
      case ERRORS.code401:
        setPopupTitle(RESPONSE_TITLES.auth);
        setPopupText(RESPONSE_MESSAGES.errorAuth);
        break;
      case ERRORS.code403:
        setPopupTitle(RESPONSE_TITLES.forbidden);
        setPopupText(RESPONSE_MESSAGES.errorForbidden);
        break;
      case ERRORS.code400:
        setPopupTitle(RESPONSE_TITLES.badRequest);
        setPopupText(RESPONSE_MESSAGES.errorBadRequest);
        break;
      default:
        setPopupTitle(RESPONSE_TITLES.server);
        setPopupText(RESPONSE_MESSAGES.errorServer);
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return { popupTitle, popupText, isPopupOpen, setIsPopupOpen, handleError, closePopup };
};
