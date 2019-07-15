import EmberObject from '@ember/object';

const Obj = EmberObject.extend({
  xPos: 0,
  yPos: 0,
  xVel: 0,
  yVel: 0,
  xForce: 0,
  yForce: 0,
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
        ' id="'+this.get('id')+'" style="left: ' + this.get('xPos') + 'px; top: ' + this.get('yPos') + 'px;' +
        ' width: ' + this.get('radius') + 'px; height: ' + this.get('radius') + 'px;' +
        ' border-radius: ' + this.get('radius') + 'px; ' +
        ' background-color: ' + this.get('color') + ';' +
        ' position: absolute;">' +
        '</div>');
      this.set('isBound',true);
    }
  },
  draw(){
    let ID = '#' + this.get('id');
    $(ID).css('top', this.get('yPos'));
    $(ID).css('left', this.get('xPos'));
  },
  move(fps){
    this.set('xPos',this.get('xPos')+this.get('xVel')/fps);
    this.set('yPos',this.get('yPos')+this.get('yVel')/fps);
  },
  resetForce(){
    this.set('xForce',0);
    this.set('yForce',0);
  },
  addForce(obj){

  }
});

export {Obj};
