;(function() {
  const canvas = document.createElement('canvas');

  canvas.width = 640;
  canvas.height = 480;

  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";


  class SnowFall {
    constructor() {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.fillStyle = 'white';
      this.arrSnowflake = [];
    }

    render(selector) {
      const parentElem = document.querySelector(selector);

      parentElem.prepend(this.canvas);

      window.requestAnimationFrame(this.loop.bind(this));
    }

    loop() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.arrSnowflake.length < 500) {
        this.arrSnowflake.push( new Snowflake(this.canvas.width, this.canvas.height) );
      }

      this.arrSnowflake.forEach(elem => {
        elem.fallSnowflake();
        this.ctx.beginPath();
        this.ctx.arc(elem.posX, elem.posY, elem.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });

      window.requestAnimationFrame(this.loop.bind(this));
    }

  }

  window.SnowFall = SnowFall;
})();