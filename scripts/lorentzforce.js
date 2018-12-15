var main = function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d')
  var cw = canvas.width;
  var ch = canvas.height;
  var t0 = (new Date()).getTime();
  var t1 = 0;
  var delta = 0;
  var fps = 30,
    bX = 30,
    bY = 30,
    mX = 150,
    mY = 300;

  //1000 ms / 60 FPS = 16.667 ms per frame
  var frameperiod = 1000 / 60;

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
    resize(canvas);
    ctx.fillText("Width: " + cw, 10, 50);
    ctx.fillText("Height: " + ch, 10, 70);
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(200,80);
    ctx.lineTo(500,700);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(bX, bY, 20, 0, Math.PI * 360);
    ctx.fill();
    if ((bX >= cw && mX > 0) || (bX <= 0 && mX < 0)) {
        mX *= -1;
    }
    if ((bY >= ch && mY > 0) || (bY <= 0 && mY < 0)) {
        mY *= -1;
    }

    bX += (mX * delta);
    bY += (mY * delta);

  }

  function resize(canvas) {
    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;

    if (cw != displayWidth || ch != displayHeight){
          cw = displayWidth;
          ch = displayHeight;
        }
  }
}

main();
