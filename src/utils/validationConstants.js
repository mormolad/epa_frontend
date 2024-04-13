export const PATTERN_EMAIL =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
export const PATTERN_PASSWORD = /^(?=.*[A-Z])[A-Za-z0-9.,:;?!*+%<>[\]/\\_{}$#-]{8,14}$/;
export const PATTERN_USERNAME = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,255}$/;
export const PATTERN_JOB_TITLE = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,255}$/;
export const isValidEmail = (email) => PATTERN_EMAIL.test(email);
export const isValidPassword = (password) => PATTERN_PASSWORD.test(password);
export const isValidName = (name) => PATTERN_USERNAME.test(name);
export const isValidJobTitle = (jobTitle) => PATTERN_JOB_TITLE.test(jobTitle);

export const VALIDATION_MESSAGES = {
  invalidNameOrPosition: 'Допускается кириллица, латиница, дефис и пробел, от 1 до 255 симв.',
  invalidEmail: 'Введите адрес электронной почты в формате имя@домен.домен',
  invalidPassword: 'Допускаются цифры, спецсимволы и латиница, хотя бы одна заглавная буква, от 8 до 14 симв.',
  passwordsNotMatch: 'Пароли не совпадают',
  emptyConfirmPassword: 'Пожалуйста, подтвердите пароль',
  emptyInput: 'Поле обязательно для заполнения'
};

export const validateInput = (
  name,
  value,
  errors,
  setErrors,
  validationFunction,
  errorMessage
) => {
  if (validationFunction && !validationFunction(value)) {
    setErrors({ ...errors, [name]: errorMessage });
  } else {
    setErrors({ ...errors, [name]: '' });
  }
};

export const handleChangeInput = (
  e,
  handleChange,
  errors,
  setErrors,
  validationMessage,
  isValidFunction
) => {
  handleChange(e);
  validateInput(
    e.target.name,
    e.target.value,
    errors,
    setErrors,
    isValidFunction,
    validationMessage
  );
};
