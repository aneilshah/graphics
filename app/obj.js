import EmberObject from '@ember/object';

const Obj = EmberObject.extend({
  xPos: 0,
  yPos: 0,
  xVel: 0,
  yVel: 0,
  color: "",
  mass: 1,
  radius:0,
  id: '',
  isBound: false,
  setColor(color){
    this.set('color',color);
  },
  setID(id){
    this.set('id',id);
  },
  setMass(mass){
    this.set('mass',mass);
    let rad=30*Math.sqrt(mass);
    this.set('radius',rad);
  },
  setPos(x,y){
    this.set('xPos',x);
    this.set('yPos',y);
  },
  setRadius(r){
    this.set('radius',r);
  },
  setVel(x,y){
    this.set('xVel',x);
    this.set('yVel',y);
  },
  bind(){
    if (!this.get('isBound')) {
      $('#graphContainer').append('<div' +
        ' id="one" style="left: ' + this.get('xPos') + 'px; top: ' + this.get('yPos') + 'px;' +
        ' width: ' + this.get('radius') + 'px; height: ' + this.get('radius') + 'px;' +
        ' border-radius: ' + this.get('radius') + 'px; ' +
        ' background-color: ' + this.get('color') + ';' +
        ' position: absolute;">' +
        '</div>');
      this.set('isBound',true);
    }
  },
  move(){
    let ID = '#' + this.get('id');
    let position=$(ID).position();
    $(ID).css('top', position.top+this.get('yVel'));
    $(ID).css('left', position.left+this.get('xVel'));
  }
});

export {Obj};
