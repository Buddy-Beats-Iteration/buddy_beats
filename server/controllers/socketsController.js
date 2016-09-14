const socketsController = {};

socketsController.serverBoard = [
        [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0],
        [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]
      ];
socketsController.serverBoardName = '';
socketsController.dropdownValue = 0;

socketsController.toggleServer = function(arr){
	if (socketsController.serverBoard[arr[0]][arr[1]] === 0) {
      socketsController.serverBoard[arr[0]][arr[1]] = 1;
  } else {
    socketsController.serverBoard[arr[0]][arr[1]] = 0;
  }
}

module.exports = socketsController;