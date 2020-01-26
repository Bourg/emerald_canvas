function app() {
  // Attach to the canvas
  const canvas = document.querySelector("canvas#game");
  const context = canvas.getContext("2d");

  // Apply width and height of the GBA viewport to the canvas
  canvas.width = 240;
  canvas.height = 160;
}
