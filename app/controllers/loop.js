import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import {Obj} from '../obj';

export default Controller.extend({
  count:0,
  loopPerSec:50,
  loopMS: 20,
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
    start() {
      this.set('isRunning',true);
      if (!this.get('objInit'))
      {
        $('#graphContainer').append('<div' +
          ' id="cm" style="left: 800px; top: 350px;' +
          ' width: 10px; height: 10px;' +
          ' border-radius: 2px; ' +
          ' background-color: darkblue;' +
          ' position: absolute;">' +
          '</div>');
        this.set('objInit',true);
      }
      let obj1 = this.get('obj1');
      obj1.setID('one');
      obj1.setPos(1200,300);
      obj1.setVel(0.0,0.5);
      obj1.setColor('rgba(200, 41, 199, 0.5)');
      obj1.setMass(1);
      obj1.bind();

      let obj2 = this.get('obj2');
      obj2.setID('two');
      obj2.setPos(400,100);
      obj2.setVel(0.2,0.0);
      obj2.setColor('rgba(250, 50, 10, 0.5)');
      obj2.setMass(1);
      obj2.bind();

      let obj3 = this.get('obj3');
      obj3.setID('three');
      obj3.setPos(600,600);
      obj3.setVel(0,-0.3);
      obj3.setColor('rgba(90, 255, 95, 0.5)');
      obj3.setMass(1);
      obj3.bind();

      this.send('update');
    },
    stop(){
      this.set('isRunning',false);
    },
    update(){
      let self = this;
      later(this, function () {
        self.set('count', this.get('count') + 1);
        self.set('sec',Math.floor(this.get('count')/this.get('loopPerSec')));
        self.set('ms',this.get('count')%this.get('loopPerSec'));

        //let position=$('#two').position();
        //self.set('left',Math.round(position.left));
        //self.set('top', Math.round(position.top));

        self.get('obj1').move();
        //self.get('obj2').move();
        //self.get('obj3').move();

        if (self.get('isRunning')){
          self.send('update');
        }
      }, self.get('loopMS'));
    }
  }
});
