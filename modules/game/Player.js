export default class Player {
  constructor(image, x, y, facingDirection = "DOWN") {
    this.image = image;
    this.x = x;
    this.y = y;
    this.facingDirection = facingDirection;

    this.walkDistance = 0;
    this.walkFrame = 0;
  }

  static load(x, y) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = "/texture/player.png";
      image.onload = () => resolve(new Player(image, x, y));
      image.onerror = () => reject();
    });
  }

  draw(context, camera) {
    const { x, y } = camera.viewCoordinate(this.x, this.y);

    const animationStep =
      this.walkDistance > 0 ? Math.floor(this.walkFrame / 32) % 4 : 1;
    let sy = 0;

    if (animationStep == 0) {
      sy = 22;
    } else if (animationStep == 2) {
      sy = 44;
    }

    let sx = 0;
    switch (this.facingDirection) {
      case "UP":
        sx = 15;
        break;
      case "DOWN":
        sx = 0;
        break;
      case "LEFT":
        sx = 30;
        break;
      case "RIGHT":
        sx = 300;
        break;
    }

    context.drawImage(this.image, sx, sy, 14, 21, x + 2, y - 6, 14, 21);
  }

  update(direction) {
    // Start walking if not already walking
    if (this.walkDistance <= 0) {
      if (direction) {
        this.facingDirection = direction;
        this.walkDistance = 16;
      } else {
        this.walkFrame = 0;
      }
    }

    if (this.walkDistance <= 0) {
      return;
    }

    const speed = 0.5;

    switch (this.facingDirection) {
      case "UP":
        this.y -= speed;
        break;
      case "DOWN":
        this.y += speed;
        break;
      case "LEFT":
        this.x -= speed;
        break;
      case "RIGHT":
        this.x += speed;
        break;
      default:
        // Corrupt animation, self repair
        console.error(`Invalid facing direction '${this.facingDirection}'`);
        this.facingDirection = "DOWN";
        return null;
    }

    this.walkFrame++;
    this.walkDistance -= speed;
  }
}
