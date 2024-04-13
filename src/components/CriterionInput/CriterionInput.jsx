import './CriterionInput.scss';

function CriterionInput({
  criterion,
  text,
  editing,
  handleDelete,
  values,
  handleChange,
  id
}) {
  const inputId = String(id);

  if (!values[inputId]) {
    values[inputId] = text;
  }

  return (
    <div className="criterion">
      <input
        className={`criterion__input ${editing && 'criterion__input_active'}`}
        name={inputId}
        type="text"
        placeholder="Введите новый критерий оценки"
        value={values[inputId] || ''}
        disabled={!editing}
        onChange={handleChange}
      />
      {editing &&
        <button
          type="button"
          className="criterion__button"
          onClick={() => handleDelete(criterion)} />}
    </div>
  );
}

export default CriterionInput;
