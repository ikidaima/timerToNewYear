;(function() {
  const START_POSITION_Y = -5;
  const MIN_RADIUS = 1;
  const MAX_RADIUS = 3;
  const MAX_FALLING_SPEED = 2;
  const MIN_FALLING_SPEED = 1;
  const MAX_OSCILLATION_RANGE = 6;
  const MIN_OSCILLATION_RANGE = 3;

  class Snowflake {
    constructor(widthCanvas, hightCanvas) {
      this.posY = START_POSITION_Y;
      this.posX = Math.floor( Math.random() * widthCanvas );
      this.centerPosX = this.posX;
      this.radius = Math.floor( Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS );
      this.oscillationRange = Math.random() * MAX_OSCILLATION_RANGE + MIN_OSCILLATION_RANGE;
      this.stepOscillation = 0.2;
      this.dropHight = hightCanvas + 10;
      this.fallingSpeed = Math.random() * MAX_FALLING_SPEED + MIN_FALLING_SPEED;
    }

    fallSnowflake() {

      if (this.posY < this.dropHight) {
        this.posY += this.fallingSpeed;

        if (this.posX > this.centerPosX - this.oscillationRange && this.posX < this.centerPosX + this.oscillationRange) {
          this.posX += this.stepOscillation;
        } else {
          this.stepOscillation = -this.stepOscillation;
          this.posX += this.stepOscillation;
        }

      } else {
        this.posY = START_POSITION_Y;
      }

    }

  }

  window.Snowflake = Snowflake;
})();