function dot() {
  var len = arguments[0] && arguments[0].length;
  var argsLen = arguments.length;
  var i, j = len;
  var prod, sum = 0;

  // If no arguments supplied, return undefined
  if (!len) {
    return;
  }

  // If all vectors not same length, return undefined
  i = argsLen;
  while (i--) {
    if (arguments[i].length != len) {
      return;  // return undefined
    }
  }

  // Sum terms
  while (j--) {
    i = argsLen;
    prod = 1;

    while (i--) {
      prod *= arguments[i][j];
    }
    sum += prod;
  }
  return sum;
}


function cross3(a, b) {
  // Check lengths
  if (a.length != 3 || b.length != 3) {
     return;
  }

  return [a[1]*b[2] - a[2]*b[1],
          a[2]*b[0] - a[0]*b[2],
          a[0]*b[1] - a[1]*b[0]];
}

function magnitude2(a) {
  if (a.length != 2){
    return;
  }

  return Math.sqrt(a[0]*a[0] + a[1]*a[1]);
}

function magnitude3(a) {
  if (a.length != 3){
    return;
  }

  return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
}
