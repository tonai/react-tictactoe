import React from 'react';

import {
  TICTACTOE_PLAYER_1,
  TICTACTOE_PLAYER_2,
  TICTACTOE_STATUS_DRAW,
  TICTACTOE_STATUS_RUNNING,
  TICTACTOE_STATUS_PLAYER1WIN,
  TICTACTOE_STATUS_PLAYER2WIN
} from '../../settings/const';

import TictactoeBoard from '../TictactoeBoard/TictactoeBoard.jsx';
import circleImage from '../../assets/images/circle.svg';
import crossImage from '../../assets/images/cross.svg';
import './TictactoeGame.css';

class TictactoeGame extends React.PureComponent {
  handleClick = (row, col) => {
    this.setState(prevState => {
      const board = this.cloneBoard(prevState.board);
      board[row][col] = prevState.currentPlayer;
      const status = this.checkVictory(board, row, col);
      return {
        board,
        currentPlayer: prevState.currentPlayer === TICTACTOE_PLAYER_1
          ? TICTACTOE_PLAYER_2
          : TICTACTOE_PLAYER_1,
        status
      };
    });
  };

  restart = () => {
    this.setState(this.getInitialState());
  }

  checkVictory(board, row, col) {
    const player = this.checkVictoryCol(board, col)
      || this.checkVictoryDiagonals(board)
      || this.checkVictoryRow(board, row);

    const countEmptyCell = board.reduce(
      (acc, row) => acc + row.reduce(
        (acc, cell) => acc + Number(cell === null), 0
      ), 0
    );

    switch(player) {
      case TICTACTOE_PLAYER_1:
        return TICTACTOE_STATUS_PLAYER1WIN;

      case TICTACTOE_PLAYER_2:
        return TICTACTOE_STATUS_PLAYER2WIN;

      default:
        if (countEmptyCell === 0) {
          return TICTACTOE_STATUS_DRAW;
        }
        return TICTACTOE_STATUS_RUNNING;
    }
  }

  checkVictoryCol(board, index) {
    if (board[0][index] === board[1][index] && board[0][index] === board[2][index]) {
      return board[0][index];
    }
  }

  checkVictoryDiagonals(board) {
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0];
    } else
    if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2];
    }
  }

  checkVictoryRow(board, index) {
    if (board[index][0] === board[index][1] && board[index][0] === board[index][2]) {
      return board[index][0];
    }
  }

  cloneBoard(board) {
    return board.map(row => [...row]);
  }

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      currentPlayer: TICTACTOE_PLAYER_1,
      status: TICTACTOE_STATUS_RUNNING
    };
  }

  render() {
    return (
      <div className="TictactoeGame">
        <TictactoeBoard
          board={this.state.board}
          onClick={this.handleClick}
          status={this.state.status}
        />
        <div className="TictactoeGame__message">
          {this.state.status === TICTACTOE_STATUS_RUNNING && (
            <p>
              Current player : {this.state.currentPlayer === TICTACTOE_PLAYER_1 ? (
                <img alt="Player 1" className="TictactoeGame__img" src={crossImage} />
              ) : (
                <img alt="Player 2" className="TictactoeGame__img" src={circleImage} />
              )}
            </p>
          )}
          {this.state.status === TICTACTOE_STATUS_PLAYER1WIN && (
            <p>Player 1 win</p>
          )}
          {this.state.status === TICTACTOE_STATUS_PLAYER2WIN && (
            <p>Player 2 win</p>
          )}
          {this.state.status === TICTACTOE_STATUS_DRAW && (
            <p>Draw</p>
          )}
          <button onClick={this.restart} >Restart</button>
        </div>
      </div>
    );
  }
}

TictactoeGame.propTypes = {};

TictactoeGame.defaultProps = {};

export default TictactoeGame;
