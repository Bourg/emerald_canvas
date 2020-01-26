export default class Player {
  constructor(image, x, y, facingDirection = "DOWN") {
    this.image = image;
    this.x = x;
    this.y = y;
    this.facingDirection = facingDirection;

    this.currentAnimation = null;
    this.currentAnimationFrame = 0;
    this.animationQueue = [];
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

    context.drawImage(this.image, -1, -2, 16, 24, x + 1, y - 8, 16, 24);
  }

  update() {
    // Pick up a new animation if none is ongoing
    if (!this.currentAnimation) {
      this.currentAnimation = this.animationQueue.shift();
    }

    // If no animation was picked up, there's nothing to update
    if (!this.currentAnimation) {
      return;
    }

    // Execute the ongonig animation
    switch (this.currentAnimation.action) {
      case "TURN":
        // Turn animation is instant
        this.facingDirection = this.currentAnimation.direction;
        this.currentAnimation = null;
        break;
      case "WALK":
        this.currentAnimation = this.handleWalkingAnimation(
          this.currentAnimation
        );
        break;
    }

    // Advance the current animation, or zero the frame if the animation ended
    if (this.currentAnimation) {
      this.currentAnimationFrame++;
    } else {
      this.currentAnimationFrame = 0;
    }
  }

  onDirection(direction) {
    // Ongoing animations are blocking
    if (this.currentAnimation || this.animationQueue.length > 0) {
      return;
    }

    this.animationQueue = [
      {
        action: "TURN",
        direction
      },
      {
        action: "WALK",
        speed: 0.5,
        distance: 16 //TODO this is bad
      }
    ];
  }

  handleWalkingAnimation(animation) {
    animation.distance -= animation.speed;

    switch (this.facingDirection) {
      case "UP":
        this.y -= animation.speed;
        break;
      case "DOWN":
        this.y += animation.speed;
        break;
      case "LEFT":
        this.x -= animation.speed;
        break;
      case "RIGHT":
        this.x += animation.speed;
        break;
      default:
        // Corrupt animation, self repair
        console.error(`Invalid facing direction '${this.facingDirection}'`);
        this.facingDirection = "DOWN";
        return null;
    }

    return animation.distance > 0 ? animation : null;
  }
}
