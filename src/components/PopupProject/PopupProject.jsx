import './PopupProject.scss';

function PopupProject({ projects, setIsOpenPopupProject }) {
  const projectsName = projects.map((i) => i);

  projectsName.splice(0, 2);
  const handkeClickProject = () => {
    setIsOpenPopupProject(false);
  };

  return (
    <div className="popup-project">
      <ul className="popup-project__popup">
        {projectsName.map((project) => (
          <li className="popup-project__item" onClick={handkeClickProject}>
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopupProject;
