const ball = document.querySelector("#ball") as HTMLElement;
if (!ball) {
  throw new Error("Unable to find ball element");
}

let isDragging = false;
let positionMoveX = 0;
let positionMoveY = 0;
let posInitialX = 0;
let posInitialY = 0;
let xOffset = 0;
let yOffset = 0;
const gravity = 9.8;
let velocityY = 0;
let requestID: number;

ball.addEventListener("mousedown", dragStart);
ball.addEventListener("mouseup", dragEnd);
ball.addEventListener("mousemove", drag);

function dragStart(e: MouseEvent) {
  posInitialX = e.clientX - xOffset;
  posInitialY = e.clientY - yOffset;

  isDragging = true;
  cancelAnimationFrame(requestID);
}

function drag(e: MouseEvent) {
  if (isDragging) {
    positionMoveX = e.clientX - posInitialX;
    positionMoveY = e.clientY - posInitialY;

    setTranslate(positionMoveX, positionMoveY, ball);
  }
}

function dragEnd(e: MouseEvent) {
  posInitialX = positionMoveX;
  posInitialY = positionMoveY;

  isDragging = false;

  animate();
}

function animate() {
  if (isDragging) {
    return;
  }

  positionMoveY += velocityY;
  velocityY += gravity / 60;

  if (positionMoveY + ball.offsetHeight >= window.innerHeight) {
    velocityY *= -0.9;
    positionMoveY = window.innerHeight - ball.offsetHeight;
    if (Math.abs(velocityY) < 0.1) {
      cancelAnimationFrame(requestID);
      return;
    }
  }

  setTranslate(positionMoveX, positionMoveY, ball);
  requestID = requestAnimationFrame(animate);
}

function setTranslate(xPos: number, yPos: number, ball: HTMLElement) {
  ball.style.transform = `translate(${xPos}px, ${yPos}px)`;
}
