import Controller from '@ember/controller';

export default Controller.extend({

  actions: {

    test(){
        let ball = document.getElementById("one");
        let container = document.getElementById('bounceContainer');

      for(let i=0; i<=100; i+=1){
        drawPie(".pies", 100, i, "orange");
      }

    },
    start() {
      window.addEventListener('load', () => {
        const container = document.getElementById('bounceContainer');

        class Ball {
          constructor(x, y, dx, dy, diameter, color) {
            // Initial model
            Object.assign(this, {x, y, dx, dy, diameter});

            // Initial view
            this.div = document.createElement('div');
            Object.assign(this.div.style, {
              left: `${x}px`,
              top: `${y}px`,
              width: `${diameter}px`,
              height: `${diameter}px`,
              borderRadius: `${diameter / 2}px`,
              backgroundColor: color,
              position: 'absolute',
            });
            container.appendChild(this.div);
          }

          move() {
            // Update the model
            [this.x, this.y] = [this.x + this.dx, this.y + this.dy];
            if (this.x < 0 || this.x > container.clientWidth - this.diameter) {
              this.x = Math.max(0, Math.min(this.x, container.clientWidth - this.diameter));
              this.dx = -this.dx;
            }
            if (this.y < 0 || this.y > container.clientHeight - this.diameter) {
              this.y = Math.max(0, Math.min(this.y, container.clientHeight - this.diameter));
              this.dy = -this.dy;
            }

            // Update the view
            [this.div.style.left, this.div.style.top] = [`${this.x}px`, `${this.y}px`];
          }
        }

        const advance = () => {
          balls.forEach(ball => ball.move());
          if (1) {
            requestAnimationFrame(advance);
          }
        };

        const balls = [
          new Ball(20, 70, 3, 2, 30, 'rgba(90, 255, 95, 0.5)'),
          new Ball(500, 300, -3, -3, 35, 'rgba(200, 41, 199, 0.5)'),
          new Ball(140, 10, 5, 5, 40, 'rgba(250, 50, 10, 0.4)'),
        ];
      });
    }
  }

});

function drawPie (id, size, percent, color) {
  var sizeString = "" + size + "px";
  var grad = 360/100*percent+90;
  var pie = $("<span></span>");

  pie.css({"width": sizeString,
    "height": sizeString,
    "display": "block",
    "border-radius": "50%",
    "background-color": color,
    "float": "left",
    "margin": "5px"
  });

  if(percent <= 50){
    pie.css({"background-image": "linear-gradient("+ grad + "deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%)"});
  } else if (percent >= 100) {
    pie.css({"background-image": "none"});
  } else {
    pie.css({"background-image": "linear-gradient("+ (grad+180) + "deg, transparent 50%, "+color+" 50%), linear-gradient(+90deg, white 50%, transparent 50%)"});
  }

  $(id).append(pie);
}
