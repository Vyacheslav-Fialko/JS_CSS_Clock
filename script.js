const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

// canvas
const canvasClock = document.getElementById('clock');
const contextClock = canvasClock.getContext('2d');
const canvasWidth = canvasClock.width;
const canvasHeight = canvasClock.height;

const radiusClock = canvasWidth / 2 - 5;
const xCenterClock = canvasWidth / 2;
const yCenterClock = canvasHeight / 2;

function setDate() {
  const { secondsDegres, minutesDegres, hoursDegres } = { ...getDeg() };

  hourHand.style.transform = `rotate(${hoursDegres + 90}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegres + 90}deg)`;
  secondHand.style.transform = `rotate(${secondsDegres + 90}deg)`;
}

function getDeg() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const secondsDegres = seconds * 6;
  const minutesDegres = minutes * 6 + seconds / 10;
  const hoursDegres = hours * 30 + minutes / 10;

  return {
    secondsDegres,
    minutesDegres,
    hoursDegres,
  };
}

function drawCircle(x, y, radius, lineWidth, strokeStyle, fillStyle = null) {
  contextClock.strokeStyle = strokeStyle || "black";
  contextClock.lineWidth = lineWidth || 1;
  contextClock.beginPath();
  contextClock.arc(x, y, radius, 0, 2 * Math.PI, true);
  contextClock.moveTo(x, y);
  if (fillStyle) {
    contextClock.fillStyle = fillStyle;
    contextClock.fill();
  }
  contextClock.stroke();
  contextClock.closePath();
}

function drawClockPoint() {
  const radiusNum = radiusClock - 10;
  let radiusPoint;
  let fill;
  for (let tm = 0; tm < 60; tm++) {
    if (tm % 5 == 0) {
      radiusPoint = 5;
      fill = 'darkred';
    } else {
      radiusPoint = 2;
      fill = 'darkgreen';
    }

    //для выделения часовых рисочек
    let xPointM = xCenterClock + radiusNum * Math.cos(-6 * tm * (Math.PI / 180) + Math.PI / 2);
    let yPointM = yCenterClock - radiusNum * Math.sin(-6 * tm * (Math.PI / 180) + Math.PI / 2);
    drawCircle(xPointM, yPointM, radiusPoint, 1, null, fill);
  }
}

function drawClockDigitsFace() {
  const radiusNum = radiusClock - 35;
  for (let th = 1; th <= 12; th++) {
    contextClock.beginPath();
    contextClock.font = 'bold 25px sans-serif';
    let xText = xCenterClock + radiusNum * Math.cos(-30 * th * (Math.PI / 180) + Math.PI / 2);
    let yText = yCenterClock - radiusNum * Math.sin(-30 * th * (Math.PI / 180) + Math.PI / 2);
    th <= 9 ? contextClock.strokeText(th, xText - 5, yText + 10) : contextClock.strokeText(th, xText - 15, yText + 10);
    contextClock.stroke();
    contextClock.closePath();
  }
}

function drawClockArrows(width, length, degres, color) {
  contextClock.beginPath();
  contextClock.lineWidth = width;
  contextClock.strokeStyle = color;
  contextClock.moveTo(xCenterClock, yCenterClock);
  contextClock.lineTo(xCenterClock + length * Math.cos(Math.PI / 2 - degres * (Math.PI / 180)), yCenterClock - length * Math.sin(Math.PI / 2 - degres * (Math.PI / 180)));
  contextClock.stroke();
  contextClock.closePath();
}

function drawClock() {
  contextClock.clearRect(0, 0, canvasWidth, canvasHeight);
  drawCircle(xCenterClock, yCenterClock, radiusClock, 1, '#000000');
  drawClockPoint();
  drawClockDigitsFace();

  //Draw arrows
  const lengthSeconds = radiusClock - 20;
  const lengthMinutes = radiusClock - 25;
  const lengthHour = lengthMinutes / 1.5;
  const { secondsDegres, minutesDegres, hoursDegres } = { ...getDeg() };

  // draw hours arrow
  drawClockArrows(5, lengthHour, hoursDegres, '#00ff00');

  // draw minutes
  drawClockArrows(3, lengthMinutes, minutesDegres, '#0000ff');

  // draw seconds
  drawClockArrows(1, lengthSeconds, secondsDegres, '#ff0000');

  //Рисуем центр часов
  drawCircle(xCenterClock, yCenterClock, 5, 1, '#000000', 'gold');

}

window.onload = () => {
  setDate();
  drawClock();
  setInterval(() => {
    setDate();
    drawClock();
  }, 1000);
};
