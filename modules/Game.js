import Tileset from "./engine/framework/Tileset.js";
import Scene from "./engine/framework/Scene.js";
import Player from "./engine/entity/Player.js";
import Camera from "./engine/framework/Camera.js";
import { useArrowKeys } from "./engine/framework/Keys.js";

const PARAMS = {
  width: 240,
  height: 160,
  gridSize: 16
};

function initContext() {
  // Attach to the canvas
  const canvas = document.querySelector("canvas#game");
  const context = canvas.getContext("2d");

  // Apply width and height of the GBA viewport to the canvas
  canvas.width = PARAMS.width;
  canvas.height = PARAMS.height;

  return context;
}

function initTweakables() {
  const tweakables = {
    showGrid: false
  };

  const showGridCheckbox = document.querySelector('input[name="showGrid"]');
  tweakables.showGrid = showGridCheckbox.checked;
  showGridCheckbox.addEventListener("change", e => {
    tweakables.showGrid = e.target.checked;
  });

  return tweakables;
}

async function play() {
  const context = initContext();
  const tweakables = initTweakables();

  // Test code for loading the sprite sheet
  const tilesetPromise = Tileset.load(
    "texture/littleroot.png",
    PARAMS.gridSize,
    PARAMS.gridSize,
    16,
    24
  ).catch(() => alert("Failed to load textures"));

  const playerPromise = Player.load(175, 175);

  const resolvedPromises = await Promise.all([tilesetPromise, playerPromise]);

  // If anything failed to load, stop
  if (resolvedPromises.filter(p => p == null).length > 0) {
    return;
  }

  const [tileset, player] = resolvedPromises;

  const scene = new Scene(tileset);

  const camera = new Camera(
    0,
    0,
    PARAMS.width,
    PARAMS.height,
    30 * PARAMS.gridSize,
    25 * PARAMS.gridSize
  );
  camera.follow(player, PARAMS.width / 2, PARAMS.height / 2);

  const directionBox = useArrowKeys(window);

  function update() {
    player.update(directionBox.direction);
    camera.update();
  }

  function draw() {
    context.clearRect(0, 0, PARAMS.width, PARAMS.height);
    scene.draw(context, camera, { showGrid: tweakables.showGrid });
    player.draw(context, camera);
  }

  // Start the game loop
  animate();
  function animate() {
    requestAnimationFrame(animate);
    update();
    draw();
  }
}

window.onload = play();
