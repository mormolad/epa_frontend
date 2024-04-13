import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import {
  getTaskDetailsByAdmin,
  updateTaskStatusByAdmin,
  updateTaskStatusByUser,
} from '../../utils/mainApi';
import InfoPopup from '../InfoPopup/InfoPopup';
import { useErrorHandler } from '../../hooks/useErrorHandler';

function CustomSelect({ task }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  const { isAdmin } = useSelector((state) => state.user);

  const options = [
    { value: 'IN_PROGRESS', label: 'В работе' },
    { value: 'REVIEW', label: 'На ревью' },
    { value: 'DONE', label: 'Выполнено' },
  ];

  useEffect(() => {
    const selectedValue = options.find(
      (option) => option.value === task.status
    );
    setSelectedOption(selectedValue);
  }, []);

  const placeholder = 'К выполнению';

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#fff',
      color: '#333232',
      width: '196px',
      height: '40px',
      borderRadius: '10px',
      border: 'none',
      outline: 'none',
      boxShadow: state.isFocused ? 'none' : 'none',
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      height: '40px',
      lineheight: '150%',
      fontSize: '16px',
      fontWeight: '500',
      textAlign: 'left',
      padding: '9px 16px',
      color: '#333232',
      '&:hover': {
        backgroundColor: '#C5B6F1',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#333232',
      fontSize: '16px',
      fontWeight: '500',
      margin: '0px',
      padding: '9px 20px',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '4px',
      width: '196px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#333232',
      padding: '10px',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform 0.3s ease',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333232',
      fontSize: '16px',
      fontWeight: '500',
      margin: '0px',
      padding: '9px 20px',
      textAlign: 'left',
    }),
  };

  const handleChange = async (selectedOption) => {
    try {
      const newStatus = selectedOption.value;

      if (isAdmin) {
        const updatedTask = await getTaskDetailsByAdmin(task.id);
        updatedTask.status = newStatus;
        await updateTaskStatusByAdmin(updatedTask);
      } else {
        await updateTaskStatusByUser(task.id, newStatus);
      }

      setSelectedOption(selectedOption);
    } catch (error) {
      handleError(error);
    }
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
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        isSearchable={false}
      />
    </>
  );
}

export default CustomSelect;
