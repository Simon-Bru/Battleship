var readline = require('readline');
var shipGenerator = require('./shipGenerator');

// Stream reading interface
input = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

var play = true;

// Stream
console.log("Welcome on Battleships ! Tape 'start' ('s') to begin a game or 'exit' ('e') to quit this app : \n");
input.on("line", function(ans){
    if(ans == "start" || ans == "s"){
      displayGrid(10, 10);
      shipGenerator(function(err, data){
        if (err)
          console.error("Ship generating error: " + err);
        console.log(data);
      });
      console.log("Game started ! Tap the coordinates of the case you want to bomb (ex: A5).\nTap exit to quit the game.\n");
      input.on("line", function(answer){

      });
    }
    else if(ans == "exit" || ans == "e"){
      input.close();
    }
    else {
      console.log("Input not recognised.");
    }
});

function displayGrid(l, L){
  var row;
  for(var i=0; i<l; i++){
    row = "";
    for(var j=0; j<L; j++){
      row = row + "_|";
    }
    console.log(row);
  }
}
