import './UserForm.scss';
import CloseIcon from '../../images/closeIcon.png';

function UserForm({
  formTitle,
  handleSubmit,
  children,
  isValid,
  handleClosePopup,
}) {
  return (
    <div className="user-form__wrapper">
      <h3 className="user-form__title">{formTitle}</h3>
      <form className="user-form__form" onSubmit={handleSubmit}>
        <fieldset className="user-form__fieldset">{children}</fieldset>
        <button
          type="submit"
          className="user-form__submit-button"
          disabled={!isValid}
        >
          Подтвердить
        </button>
      </form>
      <button
        className="user-form__close-icon-block"
        type="button"
        onClick={handleClosePopup}
      >
        <span
          style={{backgroundImage: `url(${CloseIcon})`}}
          className="user-form__closeIcon"
        />
      </button>
    </div>
  );
}

export default UserForm;
