function circle(x, y, r, vx, vy){
  this.entity = 'circle';
  this.x = this.x0 = x || 0;
  this.y = this.y0 = y || 0;
  this.r = this.r0 = r || 10;
  this.vx = this.vx0 = vx || 0;
  this.vy = this.vy0 = vy || 0;
  this.scale = 0.0008;
}
