import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  showOverlay,
  hiddenOverlay,
  setType,
} from '../../store/slices/filterSlice.js';

import styles from './Select.module.scss';

function Select({
  query,
  buttonText,
  selectStyle,
  listStyle,
  optionStyle,
  typeSelect,
  list,
  buttonStyle,
}) {
  const [valueYear, setValueYear] = useState('');
  const [valueUser, setValueUser] = useState('');
  const [valueMonth, setValueMonth] = useState('');
  const dispatch = useDispatch();
  const { isOverlay, type } = useSelector((state) => state.filter);

  const handleShowDroplist = () => {
    dispatch(setType(typeSelect));
    dispatch(showOverlay());
  };

  const handleChange = (e) => {
    if (typeSelect === 'year') {
      setValueYear(e.target.value);
    } else if (typeSelect === 'users') {
      setValueUser(e.target.id);
    } else if (typeSelect === 'month') {
      setValueMonth(e.target.id);
    }
    dispatch(hiddenOverlay());
    typeSelect === 'year' || typeSelect === 'users' ? query() : null;
  };

  return (
    <>
      <div
        className={
          (typeSelect === 'year' && selectStyle) ||
          (typeSelect === 'users' && selectStyle) ||
          (typeSelect === 'month' && selectStyle)
        }
      >
        <button className={buttonStyle} onClick={handleShowDroplist}>
          {(typeSelect === 'year' && valueYear) ||
            (typeSelect === 'users' && valueUser) ||
            (typeSelect === 'month' && valueMonth) ||
            buttonText}
        </button>
        <ul
          className={
            isOverlay && type === typeSelect
              ? `${listStyle} ${styles.list_visible}`
              : `${listStyle}`
          }
        >
          {list.map((item, index) => (
            <li
              key={
                (typeSelect === 'year' ? index : null) ||
                (typeSelect === 'month' ? index : null) ||
                (typeSelect === 'users' ? item.id : null)
              }
              className={optionStyle}
              value={
                (typeSelect === 'users' && item.fullName) ||
                (typeSelect === 'year' && item)/*  ||
                (typeSelect === 'month' && item) */
              }
              id={
                typeSelect === 'users' ? item.fullName : '' ||
              (typeSelect === 'month' ? item : '')
              }
              onClick={handleChange}
            >
              {(typeSelect === 'year' ? item : '') ||
                (typeSelect === 'month' ? item : '') ||
                (typeSelect === 'users' ? item.fullName : '')}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => dispatch(hiddenOverlay())}
        className={
          isOverlay && type === typeSelect
            ? `${styles.overlay} ${styles.overlay_active}`
            : `${styles.overlay}`
        }
       />
    </>
  );
}

export default Select;
