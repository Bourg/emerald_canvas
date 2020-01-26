import Rectangle from "./Rectangle.js";

/** Based largely on jsfiddle.net/gfcarv/QKgHs/
 *
 * Credit to Gustavo Carvalho
 */
export default class Camera {
  constructor(
    xView,
    yView,
    viewportWidth,
    viewportHeight,
    worldWidth,
    worldHeight
  ) {
    this.xView = xView || 0;
    this.yView = yView || 0;

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    this.wView = viewportWidth;
    this.hView = viewportHeight;

    this.followed = null;

    this.viewportRect = new Rectangle(
      this.xView,
      this.yView,
      this.wView,
      this.hView
    );

    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
  }

  follow(gameObject, xDeadZone, yDeadZone) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  update() {
    if (this.followed != null) {
      if (this.followed.x - this.xView + this.xDeadZone > this.wView) {
        this.xView = this.followed.x - (this.wView - this.xDeadZone);
      } else if (this.followed.x - this.xDeadZone < this.xView) {
        this.xView = this.followed.x - this.xDeadZone;
      }

      if (this.followed.y - this.yView + this.yDeadZone > this.hView) {
        this.yView = this.followed.y - (this.hView - this.yDeadZone);
      } else if (this.followed.y - this.yDeadZone < this.yView) {
        this.yView = this.followed.y - this.yDeadZone;
      }
    }

    this.viewportRect.set(this.xView, this.yView);

    // If the viewport has left the world
    if (!this.viewportRect.within(this.worldRect)) {
      // Fix either the left or the right
      if (this.viewportRect.left < this.worldRect.left) {
        this.xView = this.worldRect.left;
      } else if (this.viewportRect.right > this.worldRect.right) {
        this.xView = this.worldRect.right - this.wView;
      }

      // Fix either the top or the bottom
      if (this.viewportRect.top < this.worldRect.top) {
        this.yView = this.worldRect.top;
      } else if (this.viewportRect.bottom > this.worldRect.bottom) {
        this.yView = this.worldRect.bottom - this.hView;
      }

      this.viewportRect.set(this.xView, this.yView);
    }
  }

  viewCoordinate(x, y) {
    return { x: x - this.xView, y: y - this.yView };
  }
}
