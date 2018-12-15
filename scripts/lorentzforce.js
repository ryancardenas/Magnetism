function main(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d')

  //1000 ms / 60 FPS = 16.667 ms per frame
  var frameperiod = 1000 / 60;

  requestAnimationFrame(gameloop);

  function gameloop(){
    update();
    draw();
    requestAnimationFrame(gameloop);
  }

  function update() {
    resize(canvas);
    ctx.fillText("Width: " + canvas.width, 10, 50);
    ctx.fillText("Height: " + canvas.height, 10, 70);
    ctx.beginPath();
    ctx.moveTo(20,20);
    ctx.lineTo(200,80);
    ctx.lineTo(500,700);
    ctx.stroke();
  }

  function resize(canvas) {
    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;

    if (canvas.width != displayWidth || canvas.height != displayHeight){
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        }
  }
}

main();
