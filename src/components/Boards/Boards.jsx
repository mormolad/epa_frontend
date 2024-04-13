import { useEffect, useState } from 'react';
import Board from '../Board/Board.jsx';
import './Boards.scss';
import { boardsData } from '../../constants/boardsList.js';

function Boards({ tasks }) {
  const [cardsLists, setCardsLists] = useState([]);
  const [dropCard, setDropCard] = useState(null);
  const [startBoard, setStartBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  useEffect(() => {
    const arrBords = boardsData.map((board) => {
      function filterTask(task) {
        return task.status === board.status;
      }
      board.items = tasks.filter(filterTask);
      return board;
    });
    setCardsLists(arrBords);
  }, []);

  return (
    <div className="boards">
      {cardsLists.map((board) => (
        <Board
          cardsLists={cardsLists}
          key={board.id}
          board={board}
          setCardsLists={setCardsLists}
          dropCard={dropCard}
          setDropCard={setDropCard}
          startBoard={startBoard}
          setStartBoard={setStartBoard}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          // boardsData={boardsData}
        />
      ))}
    </div>
  );
}

export default Boards;
