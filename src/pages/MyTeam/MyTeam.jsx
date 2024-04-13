import './MyTeam.scss';
import { useEffect, useState } from 'react';
import EmptyList from '../../images/EmptyList.png';
import UsersThree from '../../images/UsersThree.svg';
import PlusIcon from '../../images/Plus.svg';
import { getAllUsers, deleteUser } from '../../utils/mainApi.js';
import AddEmployeeForm from '../../components/AddEmployeeForm/AddEmployeeForm.jsx';
import EmployeeList from '../../components/EmployeeList/EmployeeList.jsx';
import EditEmployeeForm from '../../components/EditEmployeeForm/EditEmployeeForm.jsx';
import InfoPopup from '../../components/InfoPopup/InfoPopup.jsx';
import { useErrorHandler } from '../../hooks/useErrorHandler.js';

function MyTeam() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isAddEmployeePopupOpen, setIsAddEmployeePopupOpen] = useState(false);
  const [isEditEmployeePopupOpen, setIsEditEmployeePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { popupTitle, popupText, isPopupOpen, handleError, closePopup } =
    useErrorHandler();

  const handleOpenAddEmployeeForm = () => {
    setIsAddEmployeePopupOpen(true);
  };

  const handleOpenEditEmployeeForm = (user) => {
    setSelectedUser(user);
    setIsEditEmployeePopupOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setEmployeeList((prevList) =>
      prevList.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteEmployee = (id) => {
    deleteUser(id).then(() => {
      setEmployeeList((prevList) => prevList.filter((user) => user.id !== id));
    });
  };

  const handleAddNewEmployee = (user) => {
    setEmployeeList((prevList) => [...prevList, user]);
    setIsAddEmployeePopupOpen(false);
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('token'));
    if (token) {
      getAllUsers()
        .then((res) => {
          if (res) {
            setEmployeeList(res);
          }
        })
        .catch((err) => handleError(err));
    }
  }, [setEmployeeList]);

  return (
    <>
      {isPopupOpen && (
        <InfoPopup
          title={popupTitle}
          text={popupText}
          handleClosePopup={closePopup}
        />
      )}
      <section className="my-team">
        {isAddEmployeePopupOpen && (
          <AddEmployeeForm
            setIsAddEmployeePopupOpen={setIsAddEmployeePopupOpen}
            handleAddNewEmployee={handleAddNewEmployee}
          />
        )}
        {isEditEmployeePopupOpen && (
          <EditEmployeeForm
            setIsEditEmployeePopupOpen={setIsEditEmployeePopupOpen}
            user={selectedUser}
            handleUpdateUser={handleUpdateUser}
          />
        )}
        <div className="my-team__main">
          <nav className="my-team__nav">
            <div className="my-team__icon-block">
              <img
                src={UsersThree}
                alt="Иконка команды"
                className="my-team__icon"
              />
              <p className="my-team__label">Моя команда</p>
            </div>
            <button
              type="button"
              className="my-team__button"
              onClick={handleOpenAddEmployeeForm}
            >
              Добавить сотрудника
              <img
                src={PlusIcon}
                alt="Иконка добавления сотрудника"
                className="my-team__button-icon"
              />
            </button>
          </nav>
          <div className="my-team__content">
            {employeeList.length ? (
              <EmployeeList
                employeeList={employeeList}
                handleOpenEditEmployeeForm={handleOpenEditEmployeeForm}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            ) : (
              <div className="my-team__content_type_empty">
                <img
                  src={EmptyList}
                  alt=""
                  className="my-team__content-image"
                />
                <p>
                  Список пуст. <br /> Добавьте сотрудников в список.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MyTeam;
