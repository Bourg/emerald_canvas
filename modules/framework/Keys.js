export function useArrowKeys(mountTo) {
  const directionBox = { direction: null };

  let directions = [];
  const directionsSet = new Set();
  mountTo.addEventListener("keydown", e => {
    let direction = null;

    switch (e.keyCode) {
      case 37:
        direction = "LEFT";
        break;
      case 38:
        direction = "UP";
        break;
      case 39:
        direction = "RIGHT";
        break;
      case 40:
        direction = "DOWN";
        break;
    }

    if (direction && !directionsSet.has(direction)) {
      directions.unshift(direction);
      directionsSet.add(direction);
      directionBox.direction = direction;
    }
  });

  mountTo.addEventListener("keyup", e => {
    let direction = null;

    switch (e.keyCode) {
      case 37:
        direction = "LEFT";
        break;
      case 38:
        direction = "UP";
        break;
      case 39:
        direction = "RIGHT";
        break;
      case 40:
        direction = "DOWN";
        break;
    }

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
