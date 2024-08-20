let timeText = document.createElement('span')

const CreateInitialElement = () => {
  timeText.setAttribute("id", "clock-text-display")
  timeText.textContent = dayjs().format('hh:mm')
}

const SetStyleElements = () => {
  timeText.setAttribute(
    "style",
    `
    font-size: 1.8em;
    height: 50px;
    width: 100px;
    cursor: default;
    position: fixed;
    right: 3%;
    top: 90%;
    border-radius: 4px;
    color: #FFFFFF;
    z-index: 99;
    background-color: #000000;
    text-align: center;
  `);
}

const InjectElementsPage = () => {
  document.body.appendChild(timeText)
}

CreateInitialElement()
SetStyleElements()
InjectElementsPage()
DragElement(document.getElementById('clock-text-display'))


// interval runs at every minute for time updation
let interval = setInterval(() => {
  if (timeText) {
    timeText.textContent = dayjs().format('hh:mm')
  }
}, 10000);


// ["", "webkit", "moz", "ms"].forEach(
//   prefix => document.addEventListener(prefix + "fullscreenchange", (event) => {
//     if (!window.screenTop && !window.screenY) {
//       console.log('not fullscreen')
//     } else {
//       console.log('fullscreen')
//     }
//   }, false)
// );

function DragElement (elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown (e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag (e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement () {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

}