import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import {Obj} from '../obj';

export default Controller.extend({
  count:0,
  framePerSec:50,
  frameMS: 20,
  isRunning: false,
  objInit: false,
  left:0,
  top:0,
  sec:0,
  ms:0,
  obj1: new Obj,
  obj2: new Obj,
  obj3: new Obj,

  actions:{
    reset(){
      this.set('isRunning',false);
      let fps=this.get('framePerSec');
      let obj1 = this.get('obj1');
      obj1.setID('one');
      obj1.setPos(1200,300);
      obj1.setVel(0.0,10);
      obj1.setColor('rgba(200, 41, 199, 0.5)');
      obj1.setMass(1);
      obj1.bind();
      obj1.move(fps);

      let obj2 = this.get('obj2');
      obj2.setID('two');
      obj2.setPos(400,100);
      obj2.setVel(5,0.0);
      obj2.setColor('rgba(250, 50, 10, 0.5)');
      obj2.setMass(1);
      obj2.bind();
      obj2.move(fps);

      let obj3 = this.get('obj3');
      obj3.setID('three');
      obj3.setPos(600,600);
      obj3.setVel(0,-7);
      obj3.setColor('rgba(90, 255, 95, 0.5)');
      obj3.setMass(1);
      obj3.bind();
      obj3.move(fps);


    },
    start() {
      if (!this.get('objInit'))
      {
        this.send('reset');
        addSquare(800,350,10,'darkblue','cm');
        this.set('objInit',true);
      }
      this.set('isRunning',true);
      this.send('update');
    },
    stop(){
      this.set('isRunning',false);
    },
    update(){
      let self = this;
      let fps=this.get('framePerSec');
      later(this, function () {
        //Update Display Info
        self.set('count', this.get('count') + 1);
        self.set('sec',Math.floor(this.get('count')/fps));
        self.set('ms',this.get('count')%fps);

        //Simulate
        self.get('obj1').move(fps);
        self.get('obj2').move(fps);
        self.get('obj3').move(fps);
        self.get('obj1').draw();
        self.get('obj2').draw();
        self.get('obj3').draw();

        //Run the loop
        if (self.get('isRunning')){
          self.send('update');
        }
      }, self.get('loopMS'));
    }
  }
});

function addSquare(x,y,rad,color,id){
  $('#graphContainer').append('<div' +
    ' id="'+id+'" style="left: '+x+'px; top: '+y+'px;' +
    ' width: '+rad+'px; height: '+rad+'px;' +
    ' border-radius: '+'2'+'px; ' +
    ' background-color: '+color+';' +
    ' position: absolute;">' +
    '</div>');
}
