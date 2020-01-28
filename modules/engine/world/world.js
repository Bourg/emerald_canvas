import Camera from "../framework/Camera.js";

/** The World class represents the contents of the game world.
 *
 * The World has jurisdiction over:
 *   - The size of the world and the world's grid
 *   - The terrain elements within the world
 *   - The entities within the world
 */

export default class World {
  COLORS = {
    background: "#BEE9E8",
    tile: {
      fill: "#7698B3",
      stroke: "black"
    },
    // TODO this is literally just to not lose these colors while doing super rough debugging work
    unusedColors: { yellow: "#FFBA49", red: "#C84630", green: "#06D6A0" }
  };

  /**
   * Creates an empty world of a given size and scale
   *
   * @param {number} xTiles The width of this World in tiles
   * @param {number} yTiles The height of this World in tiles
   * @param {number} tileResolution The number of pixels allotted to each tile on the grid
   * @param {*} colors The colorset to use when there is no texture
   */
  constructor(xTiles, yTiles, tileResolution, colors) {
    this.xTiles = xTiles;
    this.yTiles = yTiles;
    this.tileResolution = tileResolution;
    this.colors = colors || this.COLORS;

    this.entities = [];

    // TODO consider leaving the camera out of the world directly
  }

  get xPixels() {
    return this.xTiles * this.tileResolution;
  }

  get yPixels() {
    return this.yTiles * this.tileResolution;
  }

  attachCamera(viewportWidth, viewportHeight) {
    this.camera = new Camera(
      0,
      0,
      viewportWidth,
      viewportHeight,
      this.xPixels,
      this.yPixels
    );
  }

  update(elapsedMillis) {}

  draw(context) {
    // If there is no camera, the world cannot be drawn
    if (!this.camera) {
      return;
    }

    context.save();

    // Draw the flat background color
    this.drawBackground(context);

    // Naively draw all possible tile positions regardless of whether they are in view or not
    // TODO this should be optimized to only call draw on tiles which are in view
    for (let yTile = 0; yTile < this.yTiles; yTile++) {
      for (let xTile = 0; xTile < this.xTiles; xTile++) {
        // Get the camera's view of the coordinate in pixels
        const { x: xView, y: yView } = this.camera.viewCoordinate(
          xTile * this.tileResolution,
          yTile * this.tileResolution
        );

        // Pass the necessary render information to drawTile
        this.drawTile(context, xView, yView);
      }
    }

    context.restore();
  }

  /**
   * Draw the full default background to the canvas, regardless of where the world is visible
   *
   * @param {*} context The 2D context onto which to draw the background
   */
  drawBackground(context) {
    context.fillStyle = this.colors.background;
    context.fillRect(0, 0, this.camera.wView, this.camera.hView);
  }

  /**
   * Draw a single tile
   *
   * @param {*} context The 2D context onto which to draw the tile
   * @param {number} xView The x position within the current viewport to locate the tile's root
   * @param {number} yView The y position within the current viewport to locate the tile's root
   */
  drawTile(context, xView, yView) {
    context.fillStyle = this.colors.tile.fill;
    context.strokeStyle = this.colors.tile.stroke;

    context.fillRect(xView, yView, this.tileResolution, this.tileResolution);
    context.strokeRect(xView, yView, this.tileResolution, this.tileResolution);
  }
}
