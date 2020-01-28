/** The Entity represents a drawable entity in a world
 *
 *  The Entity has jurisdiction over:
 *    - The physics footprint of the entity, in tiles
 *    - The position of the entity within the world
 *
 *  The Entity does NOT have jurisdiction over:
 *    - Its position within the viewport (passed in on draw)
 *    - The scale of the world's grid (passed in on draw)
 */

export default class Entity {
  COLORS = {
    stroke: "red",
    fill: "blue"
  };

  /**
   * Create a new Entity
   *
   * @param {number} sizeTiles The number of tiles occupied by the Entity's physics footprint, square
   * @param {*} colors The color palate to render this entity with when there is no texture
   */
  constructor(sizeTiles, colors) {
    this.sizeTiles = sizeTiles;
    this.colors = colors || COLORS;
  }

  update(elapsedMillis) {}

  draw(context, xView, yView, tileResolution) {
    // Untextured implementation, simply draw a rectangle of the correct size
    const sizePixels = this.sizeTiles * tileResolution;

    context.save();

    context.fillStyle = this.colors.fill;
    context.strokeStyle = this.colors.stroke;
    context.fillRect(xView, yView, sizePixels, sizePixels);
    context.strokeRect(xView, yView, sizePixels, sizePixels);

    context.restore();
  }
}
