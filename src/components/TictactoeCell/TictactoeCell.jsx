import React from 'react';
import PropTypes from 'prop-types';

import './TictactoeCell.css';
import circleImage from '../../assets/images/circle.svg';
import crossImage from '../../assets/images/cross.svg';

export const TICTACTOE_PLAYER_1 = 'PLAYER_1';
export const TICTACTOE_PLAYER_2 = 'PLAYER_2';

export const TICTACTOE_STATUS_DRAW = 'TICTACTOE_STATUS_DRAW';
export const TICTACTOE_STATUS_RUNNING = 'TICTACTOE_STATUS_RUNNING';
export const TICTACTOE_STATUS_PLAYER1WIN = 'TICTACTOE_STATUS_PLAYER1WIN';
export const TICTACTOE_STATUS_PLAYER2WIN = 'TICTACTOE_STATUS_PLAYER2WIN';

function TictactoeCell({col, onClick, row, status, value}) {
  const attributes = {
    className: 'TictactoeCell'
  }
  if (!value && status === TICTACTOE_STATUS_RUNNING) {
    attributes.onClick = handleClick;
  }

  return (
    <div {...attributes} >
      {value && (value === TICTACTOE_PLAYER_1 ? (
        <img alt="Player 1" className="TictactoeCell__img" src={crossImage} />
      ) : (
        <img alt="Player 2" className="TictactoeCell__img" src={circleImage} />
      ))}
    </div>
  );

  function handleClick(event) {
    event.preventDefault();
    onClick(row, col);
  }
}

TictactoeCell.propTypes = {
  col: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  status: PropTypes.string,
  value: PropTypes.string
};

TictactoeCell.defaultProps = {
  status: TICTACTOE_STATUS_RUNNING
};

export default TictactoeCell;
