// Module generating the position of computer's ships
module.exports = function shipGenerator(gridSize, callback){
  var ships = [];
  // Creation of a battleship (5 squares)
  ships.push(ship(5, gridSize));
  // Creation of 2 destroyers (4 squares)
  ships.push(ship(4, gridSize));
  ships.push(ship(4, gridSize));
  return callback(null, ships);
}

function ship(size, gridSize){
  var coordinates = [[],[]];
  // Origin coordinates randomly generated
  coordinates[0][0] = Math.round(Math.random()*gridSize);
  coordinates[0][1] = Math.round(Math.random()*gridSize);
  // Determination of the axe we will orientate the ship
  var axe = Math.round(Math.random()); //0->X 1->Y
  // Assignation of the end coordinate of axe we don't touch
  coordinates[1][1-axe] = coordinates[0][1-axe];

  var side;
  if(coordinates[0][axe] + size <= gridSize){   //Verification that the ship is'nt bigger than the map
    if(coordinates[0][axe] - size >= 0){
      // Determination of the orientation (2 possibilities)
      sign = Math.round(Math.random()) * (-2) + 1; //-1 or 1
      coordinates[1][axe] = coordinates[0][axe] + (sign*size);
    }
    else {
      coordinates[1][axe] = coordinates[0][axe] + size;
    }
  }
  else {
    coordinates[1][axe] = coordinates[0][axe] - size;
  }

  return coordinates;
}
