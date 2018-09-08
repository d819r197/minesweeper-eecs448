var express = require('express');
var router = express.Router();

router.get('/buildBoard', function(req, res) {
  console.log('GET /buildBoard');

  // getting config variables
  const board_rows = req.query.board_rows;
  const board_cols = req.query.board_cols;
  const mine_count = req.query.mine_count;

  // calling function to build board
  res.send(buildBoard(board_rows, board_cols, mine_count));
});

//Checks the given position against the size of the board to insure
//updateBoardValues() doesn't go out of the arrays range.
function isInBoundry(board_cols, board_rows, i, j)
{
  if(i > board_rows || j > board_cols)
  {
    return(false);
  }
    return(true);
}

//Takes in the newly created board and calculates the value for the cells
//and then updates the cell values to the correct numbers
function updateBoardValues(game_board, board_cols, board_rows)
{
  var counter = 0;
  for (var i = 0; i < board_rows; i++)
  {
    for (var j = 0; j < board_cols; j++)
    {
      if(game_board[i][j] == "*")
      {
        //Look -1,1
          if(game_board[i-1,j+1] == "M" && (isInBoundry(i-1, j+1)))
          {
            counter++;
          }
        //Look 0,1
          if(game_board[i,j+1] == "M" && (isInBoundry(i, j+1)))
          {
            counter++;
          }
        //Look 1,1
          if(game_board[i+1,j+1] == "M" && (isInBoundry(i+1, j+1)))
          {
            counter++;
          }
        //Look 1,0
          if(game_board[i+1,j] == "M" && (isInBoundry(i+1, j)))
          {
            counter++;
          }
        //Look 1,-1
          if(game_board[i+1,j-1] == "M" && (isInBoundry(i+1, j-1)))
          {
            counter++;
          }
        //Look 0,-1
          if(game_board[i,j-1] == "M" && (isInBoundry(i, j-1)))
          {
            counter++;
          }
        //Look -1,-1
          if(game_board[i-1,j-1] == "M" && (isInBoundry(i-1, j-1)))
          {
            counter++;
          }
        //Look -1,0
          if(game_board[i-1,j] == "M" && (isInBoundry(i-1, j)))
          {
            counter++;
          }

        //Assign the value to the cell
        game_board[i][j] == counter;
        console.log("cell value updated");
      }
    }
}
/*
  * Builds game board to spec of board_rows, board_cols, and mine_count
  * Lopps if not all mines used, returns game_board upon successful use of all mines
*/
function buildBoard(board_rows, board_cols, mine_count) {
  // boolean to tell loop to continue or stop
  var good_board = false;
  // double value to aid loop in creating proper boards for increasingly large dimensions
  var loop_count = 0.0;

  // begin attempts to build board
  while (good_board == false) {
    // counting variable to ensure all mines are used
    var used_mines = 0;
    // creating 2d array to act as game board
    var game_board = [];
    for (var i = 0; i < board_rows; i++) {
      game_board[i] = [];
    }
    // populating game board
    for (var i = 0; i < board_rows; i++) {
      for (var j = 0; j < board_cols; j++) {
        // boolean to determine if index should be mine
        // only checks if there are still mines left
        if (used_mines < mine_count) {
          const is_mine = Math.random() < .25 + loop_count;
          if (is_mine == true) {
            game_board[i][j] = "M";
            used_mines++;
          } else {
            game_board[i][j] = "*";
          }
        } else {
          game_board[i][j] = "*";
        }
      }
    }

    // stop loop
    if (used_mines == mine_count) {
      good_board = true;
      updateBoardValues(game_board, board_cols, board_rows);
    } else {
    // let loop go again if all mines weren't used
    // increase odds of mine for next loop
      loop_count += 0.15;
    }
  }
  // return good board now that out of loop
  return game_board;
}

function callBuild() {
  console.log('called');
}

module.exports = router;
