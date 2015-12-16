var readline = require('readline');
var shipGenerator = require('./shipGenerator');

// Stream reading interface
input = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

var play = true;

// Stream
console.log("Welcome on Battleships ! Tape 'start' to begin a game or 'exit' to quit this app : \n");
input.on("line", function(ans){
    if(ans == "start"){
      shipGenerator(function(err, data){
        if (err)
        console.error("Ship generating error: " + err);
        console.log(data);
      });
      input.question("Game started ! Tap the coordinates of the case you want to bomb (ex: A5).\nTap exit to quit the game.\n",
       function(answer){
        if(answer == "exit"){
          input.close();
        }
      });
    }
    else if(ans == "exit"){
      input.close();
    }
    else {
      console.log("Input not recognised. Tap 'start' to play or 'exit' to quit.");
    }
});
