import './NotFoundTask.scss';
import empty from '../../images/Illustrator Drawing With Ipad 2.svg';

export function NotFoundTask() {
  return (
    <div className="not-found-task">
      <img
        className="not-found-task__img"
        src={empty}
        alt="отсутствуют задания"
      />
      <h1 className="not-found-task__title">
        Список пуст.
        <br />
        Создайте свою первую задачу.
      </h1>
    </div>
  );
}
