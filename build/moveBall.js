var ball = document.querySelector("#ball");
if (!ball) {
    throw new Error("Unable to find ball element");
}
var isDragging = false;
var positionMoveX = 0;
var positionMoveY = 0;
var posInitialX = 0;
var posInitialY = 0;
var xOffset = 0;
var yOffset = 0;
var gravity = 9.8;
var velocityY = 0;
var requestID;
ball.addEventListener("mousedown", dragStart);
ball.addEventListener("mouseup", dragEnd);
ball.addEventListener("mousemove", drag);
function dragStart(e) {
    posInitialX = e.clientX - xOffset;
    posInitialY = e.clientY - yOffset;
    isDragging = true;
    cancelAnimationFrame(requestID);
}
function drag(e) {
    if (isDragging) {
        positionMoveX = e.clientX - posInitialX;
        positionMoveY = e.clientY - posInitialY;
        setTranslate(positionMoveX, positionMoveY, ball);
    }
}
function dragEnd(e) {
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
function setTranslate(xPos, yPos, ball) {
    ball.style.transform = "translate(".concat(xPos, "px, ").concat(yPos, "px)");
}
