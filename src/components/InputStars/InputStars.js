import './InputStars.scss';

function InputStars({ name, handleChange, version }) {
  return (
    <form key={version}>
      <fieldset className="input-stars">
        <div className="input-stars__container" onChange={handleChange}>
          <input className="input-stars__input" type="radio" name={name} value={1} aria-label="Ужасно" />
          <input className="input-stars__input" type="radio" name={name} value={2} aria-label="Плохо" />
          <input className="input-stars__input" type="radio" name={name} value={3} aria-label="Нормально" />
          <input className="input-stars__input" type="radio" name={name} value={4} aria-label="Хорошо" />
          <input className="input-stars__input" type="radio" name={name} value={5} aria-label="Отлично" />
        </div>
      </fieldset>
    </form>
  );
}

export default InputStars;
