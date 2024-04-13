import { useSelector } from 'react-redux';
import './PersonalAreaHeader.scss';

function PersonalAreaHeader() {
  const admin = useSelector((state) => state.user);

  return (
    <div className="personal-area-header">
      <div className="personal-area-header__icon" />
      <h2 className="personal-area-header__title">{admin.fullName}</h2>
      <div className="personal-area-header__job">
        {admin.position || 'Руководитель'}
      </div>
    </div>
  )
}

export default PersonalAreaHeader;
