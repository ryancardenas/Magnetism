function circle(x, y, r, vx, vy){
  this.entity = 'circle';
  this.x = this.x0 = x || 0;
  this.y = this.y0 = y || 0;
  this.r = this.r0 = r || 10;
  this.vx = this.vx0 = vx || 0;
  this.vy = this.vy0 = vy || 0;
  this.vel = this.vel0 = magnitude2([this.vx, this.vy]);
  this.ax = this.ax0 = 0;
  this.ay = this.ay0 = 0;
  this.accel = magnitude2([this.ax, this.ay]);
  this.scale = 0.0008;
  this.m = 3; //mass
  this.q = 0.5; //charge
  this.ke = 0.5 * this.m * this.vel * this.vel;
  this.elastic = true;

  this.update = function (acceleration, dt, scalingfactor){
    this.ax = acceleration[0];
    this.ay = acceleration[1];
    this.accel = magnitude2([this.ax, this.ay]);
    this.vx += (this.ax * dt);
    this.vy += (this.ay * dt);
    this.x += scalingfactor * (this.vx * dt);
    this.y += scalingfactor * (this.vy * dt);
    this.vangle = Math.atan2(this.vy, this.vx);

    if (this.elastic){
      //check to make sure energy is conserved
      this.vel = Math.sqrt(2 * this.ke / this.m);
      this.vx = this.vel0 * Math.cos(this.vangle);
      this.vy = this.vel0 * Math.sin(this.vangle);
    }
    this.vel = this.vel0 = magnitude2([this.vx, this.vy]);

  }

}
