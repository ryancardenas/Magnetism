
var canvas = document.getElementById('sim');
var ctx = canvas.getContext("2d");

update();
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
resizeCanvas();

function resizeCanvas() {
  canvas.width = $("tesdiv").width();
  canvas.height = $("#parent").height();
  update();
}

function update() {
  ctx.beginPath();
  ctx.moveTo(20,20);
  ctx.lineTo(200,80);
  ctx.lineTo(500,700);
  ctx.stroke();
}
