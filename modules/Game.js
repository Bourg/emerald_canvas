import Tileset from "./framework/Tileset.js";
import Scene from "./framework/Scene.js";

const PARAMS = {
  width: 240,
  height: 160,
  gridSize: 16
};

async function Game() {
  // Attach to the canvas
  const canvas = document.querySelector("canvas#game");
  const context = canvas.getContext("2d");

  // Apply width and height of the GBA viewport to the canvas
  canvas.width = PARAMS.width;
  canvas.height = PARAMS.height;

  // Test code for loading the sprite sheet
  const tileset = await Tileset.load(
    "texture/littleroot.png",
    PARAMS.gridSize,
    PARAMS.gridSize,
    16,
    16
  ).catch(() => alert("Failed to load textures"));

  if (!tileset) {
    return;
  }

  const scene = new Scene(tileset);

  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 0;
  document.addEventListener("keydown", e => {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 87:
        dx = 0;
        dy = -1;
        break;
      case 65:
        dx = -1;
        dy = 0;
        break;
      case 83:
        dx = 0;
        dy = 1;
        break;
      case 68:
        dx = 1;
        dy = 0;
        break;
      default:
        dx = 0;
        dy = 0;
    }
  });

  animate();
  function animate() {
    context.clearRect(0, 0, PARAMS.width, PARAMS.height);
    scene.draw(context, x, y, PARAMS.width, PARAMS.height);
    x += dx;
    y += dy;
    requestAnimationFrame(animate);
  }
}

window.Game = Game;

export default Game;
