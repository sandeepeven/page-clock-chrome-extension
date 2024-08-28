function isMaximized() {
  return (window.screenTop === 0 && window.screenLeft === 0)
}

function updateLocalStorage (fullscreen = false) {
  chrome.storage.local.set({ fullscreen }, function () {
    console.log('stored fullscreen success');
  })
}

window.addEventListener('resize', () => {
    if (isMaximized()) {
      updateLocalStorage(true);
    } else {
      console.log('window not maximised...updating local storage');
      updateLocalStorage(false)
    }
})

let timeText = document.createElement('span');
let container = document.createElement('div');
const containerId = "clock-container", timeTextId = "clock-text-display";

const CreateInitialElement = () => {
  container.setAttribute("id", containerId);
  container.appendChild(timeText);
  timeText.setAttribute("id", timeTextId);
  timeText.textContent = dayjs().format('hh:mm');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const element = document.getElementById('clock-container');
  switch (message.action) {
    case "top-left":
      element.style.top = "4%";
      element.style.right = "93%";
      break;
    case 'top-right':
      element.style.top = "4%";
      element.style.right = "3%";
      break;
    case 'bottom-left':
      element.style.top = "90%";
      element.style.right = "93%";
      break;
    case 'bottom-right':
      element.style.top = "90%";
      element.style.right = "3%";
      break;
    default:
      console.log("default case");
      break;
  }
})

const SetStyleElements = () => {
  timeText.setAttribute(
    "style",
    `
    font-size: 1.8em;
    padding: 5px;
    cursor: default;
    border-radius: 4px;
    color: #FFFFFF;
    z-index: 9;
    background-color: #000000;
    text-align: center;
  `);
  container.setAttribute(
    "style",
    `
    position: fixed;
    right: 3%;
    top: 90%;
    `
  )
}

const InjectElementsPage = () => {
  document.body.appendChild(container)
}

CreateInitialElement()
SetStyleElements()
InjectElementsPage()

// interval runs at every minute for time updation
let interval = setInterval(() => {
  if (timeText) {
    timeText.textContent = dayjs().format('hh:mm')
  }
}, 10000);

