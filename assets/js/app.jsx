requirejs.config({
  paths: {
    'react': '/bower_components/react/react-with-addons',
    'reactdom': '/bower_components/react/react-dom',
    'jquery': '/bower_components/jquery/dist/jquery',
    'jquery.timeago': '/bower_components/jquery-timeago/jquery.timeago',
    'showdown': '/bower_components/showdown/compressed/Showdown',
    'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap',
    'app': '/js'
  },

  shim: {
    'jquery.timeago': ["jquery"]
  }
});


require(['react', 'reactdom'],
  function (React, ReactDOM) {


    function Square(props) {
      return (
        <button className="square" onClick={() => props.onClick()}>
          {props.value}
        </button>
      );
    }


    class Board extends React.Component {

      renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
      }

      render() {
        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }

    }


    class Game extends React.Component {
      constructor() {
        super();
        this.state = {
          stepNumber: 0,
          squares: Array(9).fill(null),
          history: [{
            squares: Array(9).fill(null)
          }],
          isXNext: true
        }
      }

      handleClick(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        if (squares[i] || calculateWinner(squares)) {
          return;
        }
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState(
          {
            squares: squares,
            isXNext: !this.state.isXNext,
            history: history.concat({
              squares: squares
            }),
            stepNumber: history.length
          }
        );
      }

      jumpTo(step) {

        this.setState({
          stepNumber: step,
          isXNext: (step % 2) ? false : true,
        });
      }

      render() {
        const history = this.state.history;
        const winner = calculateWinner(this.state.squares);
        const current = history[this.state.stepNumber];
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
          const desc = move ?
          'Move #' + move :
            'Game Start';
          return (
            <li key={move}>
              <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
            </li>
          );
        });

        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}/>
            </div>
            <div className="game-info">
              <div>{status}</div>
              <div><ol>{moves}</ol></div>
            </div>
          </div>
        );
      }
    }


    ReactDOM.render(
      <Game />,
      document.getElementById('container')
    );


    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }


  });


