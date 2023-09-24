// updateSquarecolor.js
function updateSquarecolor(sqs) {
    for (let n = 0; n < 64; n++) {
      if (Math.floor(n / 8) % 2 === 0) {
        sqs[n].style.background = n % 2 === 0 ? '#9ff' : '#5fa';
      } else {
        sqs[n].style.background = n % 2 === 1 ? '#9ff' : '#5fa';
      }
    }
  }
  
module.exports = updateSquarecolor;
  