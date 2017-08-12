import React from 'react';
import PropTypes from 'prop-types';

import {
  TICTACTOE_PLAYER_1,
  TICTACTOE_STATUS_RUNNING
} from '../../settings/const';

import './TictactoeCell.css';
import circleImage from '../../assets/images/circle.svg';
import crossImage from '../../assets/images/cross.svg';

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
