export function useArrowKeys(mountTo) {
  const directionBox = { direction: null };

  let directions = [];
  const directionsSet = new Set();
  mountTo.addEventListener("keydown", e => {
    let direction = keyCodeToDirection(e.keyCode);

    if (direction && !directionsSet.has(direction)) {
      directions.unshift(direction);
      directionsSet.add(direction);
      directionBox.direction = direction;
    }
  });

  mountTo.addEventListener("keyup", e => {
    let direction = keyCodeToDirection(e.keyCode);

    if (direction && directionsSet.has(direction)) {
      directions = directions.filter(d => d !== direction);
      directionsSet.delete(direction);

      if (directions.length > 0) {
        directionBox.direction = directions[0];
      } else {
        directionBox.direction = null;
      }
    }
  });

  return directionBox;
}

function keyCodeToDirection(keyCode) {
  switch (keyCode) {
    case 37:
    case 65:
      return "LEFT";
    case 38:
    case 87:
      return "UP";
    case 39:
    case 68:
      return "RIGHT";
    case 40:
    case 83:
      return "DOWN";
  }

  return null;
}
