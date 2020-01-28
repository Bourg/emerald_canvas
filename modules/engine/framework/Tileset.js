/** Tileset is a thin wrapper around a png image which provides simplified
 * primitives for working with a consistently laid out tileset */
export default class Tileset {
  constructor(image, gridX, gridY, startX, startY) {
    this.image = image;
    this.gridX = gridX;
    this.gridY = gridY || gridX;
    this.startX = startX || 0;
    this.startY = startY || 0;
  }

  static load(url, gridX, gridY, startX, startY) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = url;
      image.onload = () =>
        resolve(new Tileset(image, gridX, gridY, startX, startY));
      image.onerror = () => reject();
    });
  }

  draw(context, tileX, tileY, canvasX, canvasY) {
    context.drawImage(
      this.image,
      tileX * this.gridX + this.startX,
      tileY * this.gridY + this.startY,
      this.gridX,
      this.gridY,
      canvasX,
      canvasY,
      this.gridX,
      this.gridY
    );
  }

  getGridX() {
    return this.gridX;
  }

  getGridY() {
    return this.gridY;
  }

  getWidth() {
    return Math.floor((this.image.width - startX) / gridX);
  }

  getHeight() {
    return Math.floor((this.image.width - startY) / gridY);
  }
}
