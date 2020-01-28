export default class FrameRateDisplay {
  constructor(sampleFrames = 5) {
    this.sampleFrames = sampleFrames;

    this.currentFrameRate = "??";
    this.samples = [];
  }

  update(elapsedMillis) {
    this.samples.push(elapsedMillis);
    if (this.samples.length > this.sampleFrames) {
      this.samples.shift();
    }

    const totalElapsedSeconds = this.samples.reduce((a, b) => a + b, 0) / 1000;

    this.currentFrameRate = `${Math.floor(
      this.samples.length / totalElapsedSeconds
    )}`;
  }

  draw(context) {
    context.save();

    // Background
    context.fillStyle = "black";
    context.fillRect(0, 0, 27, 20);

    // Frame count
    context.fillStyle = "green";
    context.font = "12px monospace";
    context.fillText(this.currentFrameRate, 2, 14);

    context.restore();
  }
}
