import { useState, useEffect } from 'react';
import UserForm from '../UserForm/UserForm.jsx';
import Input from '../Input/Input.jsx';
import OpenEyeIcon from '../../images/eye-open.svg';
import CloseEyeIcon from '../../images/eye-close.svg';
import { addNewUser } from '../../utils/mainApi.js';
import { useFormValidation } from '../../hooks/useFormValidation.js';
import {
  handleChangeInput,
  VALIDATION_MESSAGES,
  isValidEmail,
  isValidJobTitle,
  isValidName,
  isValidPassword,
} from '../../utils/validationConstants.js';
import './AddEmployeeForm.scss';
import InfoPopup from '../InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function AddEmployeeForm({ setIsAddEmployeePopupOpen, handleAddNewEmployee }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } = useErrorHandler();

  const { values, handleChange, errors, setErrors, isValid, setIsValid } =
    useFormValidation({
      name: '',
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

  useEffect(() => {
    const hasErrors =
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.position;

    const hasValues =
      !values.name ||
      !values.position ||
      !values.email ||
      !values.password ||
      !values.confirmPassword;

    setIsValid(!hasErrors && !hasValues);
  }, [errors]);

  useEffect(() => {
    if (values.confirmPassword !== values.password) {
      setErrors({ confirmPassword: VALIDATION_MESSAGES.passwordsNotMatch });
    }
  }, [values.confirmPassword]);

  const registerEmployee = (e) => {
    e.preventDefault();
    const { name, position, email, password } = values;
    addNewUser({ fullName: name, position, email, password }).then(
      (user) => {
        handleAddNewEmployee(user);
      }
    ).catch((error) => {
      handleError(error)
    })
  };

  const handleCloseAddEmployeePopup = () => {
    setIsAddEmployeePopupOpen(false);
    closePopup()
  };

  return (
    <>
    {isPopupOpen && <InfoPopup title={popupTitle} text={popupText} handleClosePopup={closePopup}/>}
    <section className="add-employee-form">
      <UserForm
        formTitle="Регистрация сотрудника"
        handleSubmit={registerEmployee}
        isValid={isValid}
        handleClosePopup={handleCloseAddEmployeePopup}
      >
        <Input
          type="text"
          name="name"
          value={values.name || ""}
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
          minLength={1}
          maxLenght={255}
          required
        />
        <Input
          type="text"
          name="position"
          value={values.position || ""}
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
          minLength={1}
          maxLenght={255}
          required
        />
        <Input
          type="email"
          name="email"
          value={values.email || ""}
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
          minLength={3}
          maxLenght={255}
          required
        />
        <>
          <div className="user-form__password-field">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              inputClassName="user-form__input"
              value={values.password || ""}
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
              maxLenght={14}
              required
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
              value={values.confirmPassword || ""}
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
              maxLenght={14}
              required
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

export default AddEmployeeForm;
