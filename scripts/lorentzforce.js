//function main(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d')
  var cw = window.innerWidth;
  var ch = window.innerHeight;
  var t0 = (new Date()).getTime();
  var t1 = 0;
  var delta = 0;
  var fps = 30;
  var windowsize = oldwindowsize = cw > ch ? cw : ch;
  var deltasize;

  var bfieldstrength = 10; //units of 1 nT = 1 E-9 T
  var bfielddirection = 'out';
  var key = '';

  var obj = new circle(30, 30, 20, 150, 300);

  //1000 ms / 60 FPS = 16.667 ms per frame
  var frameperiod = 1000 / 60;

  window.addEventListener('keydown', usercontrols);
  window.requestAnimationFrame(gameloop);

  function gameloop(){
    t1 = (new Date()).getTime();
    delta = (t1 - t0) / 1000;
    update(delta);
    t0 = t1;
    window.requestAnimationFrame(gameloop);
  }

  function update() {
    ctx.clearRect(0,0,cw,ch);
    resize(canvas, obj);

    /*insert draw loop here -- make it iterate over every entity,
      determine what type of entity, and based on the type go through
      the appropriate steps to draw.
    */
    drawfield(bfieldstrength, bfielddirection);

    //width and height indicators
    ctx.fillStyle = 'red';
    ctx.fillText("Width: " + cw, 10, 50);
    ctx.fillText("Height: " + ch, 10, 70);
    ctx.fillText("Key: " + obj.r, 10, 130);

    //bouncing ball

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();
    if ((obj.x >= cw && obj.vx > 0) || (obj.x <= 0 && obj.vx < 0)) {
        obj.vx *= -1;
    }
    if ((obj.y >= ch && obj.vy > 0) || (obj.y <= 0 && obj.vy < 0)) {
        obj.vy *= -1;
    }
    obj.x += (obj.vx * delta);
    obj.y += (obj.vy * delta);

  }

  function resize(canvas, obj) {
    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;


    if (cw != displayWidth || ch != displayHeight){
          cw = displayWidth;
          ch = displayHeight;
          windowsize = cw > ch ? cw : ch;
    }

    obj.r = obj.r0 * obj.scale * windowsize;
    // obj.vx *= obj.scale * deltasize;
    // obj.vy *= obj.scale * deltasize;

  }

  //draw magnetic field
  function drawfield(strength, direction) {
    var r = 15;
    var x, y;
    var xmaxflux = 100; //specifies max flux along x-axis
    var flux, windowsize, spacing;
    var scale = 0.0008

    //determine flux density
    flux = xmaxflux * strength / 100;
    windowsize = cw > ch ? cw : ch;
    spacing = Math.ceil(windowsize / flux);
    r *= scale * windowsize;
    x = y = spacing / 2;

    while (x <= cw + r){
      while (y <= ch + r){
        //draw an 'X'
        if (direction === 'into'){
          ctx.beginPath();
          ctx.strokeStyle = 'green';
          ctx.lineWidth = 3 * scale * windowsize;
          ctx.moveTo(x - r, y - r);
          ctx.lineTo(x + r, y + r);
          ctx.stroke();
          ctx.moveTo(x + r, y - r);
          ctx.lineTo(x - r, y + r);
          ctx.stroke();
        }

        //draw a dot
        else if ( direction === 'out'){
          ctx.beginPath();
          ctx.fillStyle = 'rgba(0, 128, 0, 0.6)';
          ctx.arc(x, y, r / 1.5, 0, 2 * Math.PI);
          ctx.fill();
        }
        y += spacing;
      }
      y = spacing / 2;
      x += spacing;
    }
    //for debugging/////////////////////////////////////////////////////////////////////////////////////
    ctx.fillStyle = 'red';
    ctx.fillText("spacing: " + spacing, 10, 90);
    ctx.fillText("flux: " + flux, 10, 110);
  }

  function usercontrols(e) {
    switch (e.which) {
            case 81: bfielddirection = 'into'; key = e.which; break;
            case 69: bfielddirection = 'out'; key = e.which; break;
            default: key = e.which;
        }
  }

//}

//main();
