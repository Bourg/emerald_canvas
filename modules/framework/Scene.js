/** A Scene represents a drawable view with a coherent grid */
export default class Scene {
  constructor(tileset) {
    this.tileset = tileset;
  }

  draw(context, camera, grid = false) {
    // Determine the starting tile number by seeing how many tiles need in we are
    let startTileX = Math.floor(camera.xView / this.tileset.getGridX());
    let startTileY = Math.floor(camera.yView / this.tileset.getGridY());

    // However different the scale of a single tile is to the scene position, compute shift
    let shiftX = camera.xView % this.tileset.getGridX();
    let shiftY = camera.yView % this.tileset.getGridY();

    // Continue however many tiles are needed to fill the requested size
    let endTileX =
      startTileX + Math.ceil(camera.wView / this.tileset.getGridX());
    let endTileY =
      startTileY + Math.ceil(camera.hView / this.tileset.getGridY());

    // If there are shifts, there need to be extra tiles to cover the offset
    if (shiftX != 0) {
      endTileX++;
    }

    if (shiftY != 0) {
      endTileY++;
    }

    context.save();
    context.strokeStyle = "#000";

    for (let x = startTileX; x < endTileX; x++) {
      for (let y = startTileY; y < endTileY; y++) {
        const targetX = (x - startTileX) * this.tileset.getGridX() - shiftX;
        const targetY = (y - startTileY) * this.tileset.getGridY() - shiftY;

        this.tileset.draw(context, x, y, targetX, targetY);

        if (grid) {
          context.strokeRect(
            targetX,
            targetY,
            this.tileset.getGridX(),
            this.tileset.getGridY()
          );
        }
      }
    }

    context.restore();
  }
}
