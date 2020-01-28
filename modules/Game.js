import World from "./engine/world/world.js";
import FrameRateDisplay from "./engine/debug/FrameRateDisplay.js";
import { useArrowKeys } from "./engine/input/Keys.js";

const PARAMS = {
  viewportWidth: 500,
  viewportHeight: 300,
  gridSize: 24
};

function initContext() {
  // Attach to the canvas
  const canvas = document.querySelector("canvas#game");
  const context = canvas.getContext("2d");

  // Apply width and height of the GBA viewport to the canvas
  canvas.width = PARAMS.viewportWidth;
  canvas.height = PARAMS.viewportHeight;

  return context;
}

async function play() {
  const context = initContext();
  const directionBox = useArrowKeys(window);

  const world = new World(10, 10, PARAMS.gridSize);
  world.attachCamera(PARAMS.viewportWidth, PARAMS.viewportHeight);

  const frameRateDisplay = new FrameRateDisplay();

  function update(elapsedMillis) {
    world.update(elapsedMillis);
    frameRateDisplay.update(elapsedMillis);
  }

  function draw() {
    world.draw(context);
    frameRateDisplay.draw(context);
  }

  let timeBeforeUpdate = new Date();
  let timeAfterUpdate = timeBeforeUpdate;

  animate();
  function animate() {
    requestAnimationFrame(animate);

    timeBeforeUpdate = new Date();
    update(timeBeforeUpdate - timeAfterUpdate);
    timeAfterUpdate = new Date();

    draw();
  }
}

window.onload = play();
