import EmployeeProfileCard from '../EmployeeProfileCard/EmployeeProfileCard.jsx';
import './EmployeeList.scss';

function EmployeeList({ employeeList, handleOpenEditEmployeeForm, handleDeleteEmployee }) {
  return (
    <section className="employeeList">
      {employeeList.map((employee) => (
        <EmployeeProfileCard
          user={employee}
          key={employee.id}
          handleOpenEditEmployeeForm={handleOpenEditEmployeeForm}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      ))}
    </section>
  );
}

export default EmployeeList;
