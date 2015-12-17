// Module generating the position of computer's ships
module.exports = function shipGenerator(callback){
  var ships = [];
  // Creation of a battleship (5 squares)
  ships.push(ship(5));
  // Creation of 2 destroyers (4 squares)
  ships.push(ship(4));
  ships.push(ship(4));
  return callback(null, ships);
}

function ship(size){
  var coordinates = [[],[]];
  // Origin coordinates randomly generated
  coordinates[0][0] = parseInt(Math.random()*10);
  coordinates[0][1] = parseInt(Math.random()*10);
  // Determination of the axe we will orientate the ship
  var axe = parseInt(Math.random()); //0->X 1->Y
  // Assignation of the end coordinate of axe we don't touch
  switch(axe){
    case 0:
      coordinates[1][1] = coordinates[0][1];
      break;

    case 1:
      coordinates[1][0] = coordinates[0][0];
      break;
  }

  var side;
  if(coordinates[0][axe] + size <= 10){
    if(coordinates[0][axe] - size >= 0){
      // Determination of the orientation (2 possibilities)
      sign = parseInt(Math.random()*(-2)+1); //-1 or 1
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
