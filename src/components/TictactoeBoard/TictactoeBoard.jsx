import React from 'react';
import PropTypes from 'prop-types';

import TictactoeCell, { TICTACTOE_STATUS_RUNNING } from '../TictactoeCell/TictactoeCell.jsx';
import './TictactoeBoard.css';

function TictactoeBoard({board, onClick, status}) {
  return (
    <div className="TictactoeBoard" >
      {board.map((row, rowIndex) => (
        <div className="TictactoeBoard__row" key={rowIndex} >
          {row.map((cell, colIndex) => (
            <div className="TictactoeBoard__cell" key={colIndex} >
              <TictactoeCell
                col={colIndex}
                onClick={onClick}
                row={rowIndex}
                status={status}
                value={cell}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

TictactoeBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array),
  status: PropTypes.string
};

TictactoeBoard.defaultProps = {
  status: TICTACTOE_STATUS_RUNNING
};

export default TictactoeBoard;
