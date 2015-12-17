var readline = require('readline');
var shipGenerator = require('./shipGenerator');
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// Stream reading interface
input = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

var play = true;

// Stream
console.log("Welcome on Battleships ! To begin choose the size of the grid. Must be less than 26 (10 adviced). Tap 'exit' ('e') to quit the game. \n");
input.on("line", function(ans){
    if(Number(ans) == ans && ans < 26 && ans >= 5){
      displayGrid(ans);
      shipGenerator(ans, function(err, data){
        if (err)
          console.error("Ship generating error: " + err);
        console.log(data);
      });
      console.log("Game started ! Tap the coordinates of the case you want to bomb (ex: A5).\nTap exit ('e') to quit the game.\n");
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

function displayGrid(l){
  var row = "";
  for(var k=1; k<=l; k++){
    row = row + " " + k;
  }
  console.log(row);
  for(var i=0; i<l; i++){
    row = alphabet[i];
    for(var j=0; j<l; j++){
      row = row + "_|";
    }
    console.log(row);
  }
}
