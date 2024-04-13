import { useState, useEffect } from 'react';
import UserForm from '../UserForm/UserForm.jsx';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import Input from '../Input/Input.jsx';
import OpenEyeIcon from '../../images/eye-open.svg';
import CloseEyeIcon from '../../images/eye-close.svg';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidEmail,
  isValidJobTitle,
  isValidName,
  isValidPassword,
} from '../../utils/validationConstants.js';
import './EditEmployeeForm.scss';
import { updateUserData } from '../../utils/mainApi.js';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function EditEmployeeForm({
  setIsEditEmployeePopupOpen,
  user,
  handleUpdateUser,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  const {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    setIsValid,
  } = useFormValidation({});

  const handleCloseEditEmployeePopup = () => {
    setIsEditEmployeePopupOpen(false);
    setErrors({
      name: '',
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    closePopup();
  };

  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        name: user.fullName || '',
        position: user.position || '',
        email: user.email || '',
      });
    }
  }, [user]);

  useEffect(() => {
    const hasErrors =
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.position;

    const hasValues = !values.name || !values.position || !values.email;
    const hasPasswordNoConfirmPassword =
      values.password && !values.confirmPassword;

    if (hasErrors || hasValues || hasPasswordNoConfirmPassword) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [errors]);

  useEffect(() => {
    if (
      values.password &&
      values.confirmPassword &&
      values.confirmPassword !== values.password
    ) {
      setErrors({ confirmPassword: VALIDATION_MESSAGES.passwordsNotMatch });
      setIsValid(false);
    } else {
      setErrors({ confirmPassword: '' });
      setIsValid(true);
    }
  }, [values.confirmPassword, values.password]);

  const editEmployeeData = (e) => {
    e.preventDefault();
    const { name, position, email, password } = values;

    updateUserData({
      id: user.id,
      fullName: name,
      position,
      email,
      password,
    })
      .then((res) => {
        handleCloseEditEmployeePopup();
        handleUpdateUser(res);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return (
    <>
      {isPopupOpen && (
        <InfoPopup
          title={popupTitle}
          text={popupText}
          handleClosePopup={closePopup}
        />
      )}
      <section className="edit-employee-form">
        <UserForm
          formTitle="Редактирование данных"
          handleSubmit={editEmployeeData}
          isValid={isValid}
          handleClosePopup={handleCloseEditEmployeePopup}
        >
          <Input
            type="text"
            name="name"
            value={values.name || ''}
            onChange={(e) =>
              handleChangeInput(
                e,
                handleChange,
                errors,
                setErrors,
                VALIDATION_MESSAGES.invalidNameOrPosition,
                isValidName
              )
            }
            error={errors.name}
            inputClassName="user-form__input"
            placeholder="Имя Фамилия"
            spanClassName="user-form__span"
            required
          />
          <Input
            type="text"
            name="position"
            value={values.position || ''}
            onChange={(e) =>
              handleChangeInput(
                e,
                handleChange,
                errors,
                setErrors,
                VALIDATION_MESSAGES.invalidNameOrPosition,
                isValidJobTitle
              )
            }
            error={errors.position}
            inputClassName="user-form__input"
            placeholder="Должность"
            spanClassName="user-form__span"
            required
          />
          <Input
            type="email"
            name="email"
            value={values.email || ''}
            onChange={(e) =>
              handleChangeInput(
                e,
                handleChange,
                errors,
                setErrors,
                VALIDATION_MESSAGES.invalidEmail,
                isValidEmail
              )
            }
            error={errors.email}
            inputClassName="user-form__input"
            placeholder="Email"
            spanClassName="user-form__span"
            required
          />
          <>
            <div className="user-form__password-field">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                inputClassName="user-form__input"
                value={values.password || ''}
                onChange={(e) =>
                  handleChangeInput(
                    e,
                    handleChange,
                    errors,
                    setErrors,
                    VALIDATION_MESSAGES.invalidPassword,
                    isValidPassword
                  )
                }
                placeholder="Пароль авторизации"
                spanClassName="user-form__span"
                error={errors.password}
                minLength={8}
              />
              <button
                type="button"
                className="user-form__password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span
                  className="user-form__eye-icon"
                  style={{
                    backgroundImage: `url(${showPassword ? OpenEyeIcon : CloseEyeIcon})`,
                  }}
                />
              </button>
            </div>
          </>
          <>
            <div className="user-form__password-field">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                inputClassName="user-form__input"
                value={values.confirmPassword || ''}
                onChange={(e) =>
                  handleChangeInput(
                    e,
                    handleChange,
                    errors,
                    setErrors,
                    VALIDATION_MESSAGES.invalidPassword,
                    isValidPassword
                  )
                }
                placeholder="Подтвердите пароль"
                autoComplete="off"
                spanClassName="user-form__span"
                error={errors.confirmPassword}
                minLength={8}
              />
              <button
                type="button"
                className="user-form__password-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <span
                  className="user-form__eye-icon"
                  style={{
                    backgroundImage: `url(${showConfirmPassword ? OpenEyeIcon : CloseEyeIcon})`,
                  }}
                />
              </button>
            </div>
          </>
        </UserForm>
      </section>
    </>
  );
}

export default EditEmployeeForm;
