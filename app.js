var readline = require('readline');
var Ship = require('./shipGenerator');
var gridSize = 10;  //Size of the grid (= 10 by default)
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var ships; //Computer's ships table
var hits = []; //User's hits
var play = false; //Boolean to tell wether the game began or not


// Stream reading interface
input = readline.createInterface({
  input : process.stdin,
  output: process.stdout
});

// Stream
console.log("Welcome on Battleships ! To begin a 10x10 grid game type 'start' ('s').\n To change the grid size type 'settings n' with n the number of squares.\n Type 'exit' to quit the game.");
input.on("line", function(ans){
  // We split the input if the user wants to change the grid size
  var param = ans.split(" ");

  switch(param[0]){
    case "start":     //If the input is start or s & the game didn't started
    case "s":         //We start the game
      if(!play){
        displayGrid(gridSize, null);    //We display the grid
        // We generate the computer's ships randomly
        ships = Ship.generate(gridSize, function(err, data){
          if (err)    //Error display
          console.error("Error:"+ err);
          // We store the ships into array
          return data;
        });
        console.log(ships);
        // Initialisation of the table of hits of the player with null
        for(var i=0; i<gridSize; i++){
        	hits[i] = [];
        	for(var j=0; j<gridSize; j++){
          	hits[i][j] = null;
          }
        }
        console.log("Game started ! To bomb a case, type its coordinates with the format 'A5' for example.");
        play = true;
      }
      else {
        console.error("The game already started ! ");
      }
      break;

    case "settings":        //If the input is settings
      if(!play){            //And the game didn't start
        if(Number(param[1]) == param[1] && param[1] < 26 && param[1] >= 5){     //If second input argument is a int between 5 and 26
          console.log("The changes have been saved. Your game will be on a "+param[1]+"x"+param[1]+" grid.\n  Type 'start' ('s') to begin.");
          gridSize = param[1];    //We change the grid size
        }
        else {      //Else
          console.error("Number of squares must be between 5 & 26. Try again");   //We display an error
        }
      }
      else {
        console.error("The game already started, you can't change the grid size ! ");
      }
      break;

    case "exit":      //If exit
      console.log("See you ! ");    //Message displayed and stream closed
      input.close();
      break;

    default:      //If no command recognised -> error displayed
      if(play){     //Game interface
        if(typeof ans[0] == "string"){
          // We get the index of the letter entered
          letterIndex = alphabet.indexOf(ans[0]);
          if(letterIndex > gridSize){ //We check the letter is part of the grid
            console.error(ans[0]+" is not part a coordinate of the grid, you must enter a letter between A and "+alphabet[gridSize]);
          }
          else {
            // We get the number entered
            var number = ans.substring(1, ans.length);
            if(Number(number) == number && number < gridSize && number > 0){ //We check the number is part of the grid
              if(hits[number-1][letterIndex] == null){
                console.log(number-1);
                console.log(letterIndex);
                if(Ship.isHit([number-1, letterIndex], ships)){
                  hits[number-1][letterIndex] = true;
                }
                else {
                  hits[number-1][letterIndex] = false;
                }
                displayGrid(gridSize, hits);
                console.log(hits[number-1][letterIndex]);
              }
              else {
                console.log("You already bomb that case. Try another one");
              }
            }
            else {
              console.error("You must enter a number inferior to " + gridSize);
            }
          }
        }
        else {
          console.error("You must type the coordinate of the case with the format 'A5' or 'E3' ...")
        }
      }
      else {
        console.error("Input not recognised. Type 'start' ('s') to begin.\nType 'settings n' with n the number of squares to change the grid size.\nType 'exit' to quit.");
      }
      break;
  }
});

// Grid displaying function
function displayGrid(l, hits){
  var row = " ";
  console.log(hits);
  // Colomns' numbers display
  for(var k=0; k<l; k++){
    row = row + " " + alphabet[k];
  }
  console.log(row);
  // Grid display
  for(var i=0; i<l; i++){
    if(i >= 9){
      row = i+1;
    }
    else {
      row = i+1 + " ";
    }
    for(var j=0; j<l; j++){
      if(hits != null && hits[i][j] != null){
        if(hits[i][j] == true){
          char = "x";
        }
        else if(hits[i][j] == false){
          char = "o";
        }
        row = row + char + "|";
      }
      else {
        row = row + "_|";
      }
    }
    console.log(row);
  }
}
