const element = document.getElementById('calculate');
let startX, startY, offsetX = 0, offsetY = 0;

element.addEventListener('mousedown', startDragging);

function startDragging(e) {
    let grap = e.target.getAttribute("data-grap");
    if(grap != "true"){
        return;
    }
    startX = e.clientX;
    startY = e.clientY;
    element.style.position = 'absolute';
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDragging);
}

function dragElement(e) {
  offsetX = e.clientX - startX;
  offsetY = e.clientY - startY;
  element.style.left = `${element.offsetLeft + offsetX}px`;
  element.style.top = `${element.offsetTop + offsetY}px`;
  startX = e.clientX;
  startY = e.clientY;
}

function stopDragging() {
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mouseup', stopDragging);
}