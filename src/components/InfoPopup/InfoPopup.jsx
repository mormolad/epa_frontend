import CloseIcon from '../../images/closeIcon.png';
import './InfoPopup.scss';

function InfoPopup({title, text, handleClosePopup}) {
  return (
    <div className="popup">
      <div className="popup__container">
        <h3 className="popup-title">{title}</h3>
        <p className="popup__text">{text}</p>
        <button
        className="popup__icon-block"
        type="button"
        onClick={handleClosePopup}
      >
        <span
          style={{backgroundImage: `url(${CloseIcon})`}}
          className="popup__icon"
        />
      </button>
      </div>
    </div>
  );
};

export default InfoPopup;
