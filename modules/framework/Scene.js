/** A Scene represents a drawable view with a coherent grid */
export default class Scene {
  constructor(tileset) {
    this.tileset = tileset;
  }

  draw(context, sceneX, sceneY, width, height) {
    // Determine the starting tile number by seeing how many tiles need in we are
    let startTileX = Math.floor(sceneX / this.tileset.getGridX());
    let startTileY = Math.floor(sceneY / this.tileset.getGridY());

    // However different the scale of a single tile is to the scene position, compute shift
    let shiftX = sceneX % this.tileset.getGridX();
    let shiftY = sceneY % this.tileset.getGridY();

    // Continue however many tiles are needed to fill the requested size
    let endTileX = startTileX + Math.ceil(width / this.tileset.getGridX());
    let endTileY = startTileY + Math.ceil(height / this.tileset.getGridY());

    // If there are shifts, there need to be extra tiles to cover the offset
    if (shiftX != 0) {
      endTileX++;
    }

    if (shiftY != 0) {
      endTileY++;
    }

    for (let x = startTileX; x < endTileX; x++) {
      for (let y = startTileY; y < endTileY; y++) {
        this.tileset.draw(
          context,
          x,
          y,
          (x - startTileX) * this.tileset.getGridX() - shiftX,
          (y - startTileY) * this.tileset.getGridY() - shiftY
        );
      }
    }
  }
}
