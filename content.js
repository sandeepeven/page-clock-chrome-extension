const timeText = document.createElement('span');
const container = document.createElement('div');
const containerId = "clock-container", timeTextId = "clock-text-display";
var format = 12;

const createInitialElement = () => {
  container.setAttribute("id", containerId);
  container.appendChild(timeText);
  timeText.setAttribute("id", timeTextId);

  getLocalStorage('format', (val) => {
    if (val === 12) {
      timeText.textContent = dayjs().format('hh:mm');
    } else {
      timeText.textContent = dayjs().format('HH:mm');
    }
  })
  getLocalStorage('fullscreen', (val) => {
    if (val && !isMaximized()) {
      container.style.visibility = 'hidden';
    } else {
      container.style.visibility = 'visible';
    }
  })
}

const setStyleElements = () => {
  timeText.setAttribute(
    "style",
    `
    font-size: 1.8em;
    padding: 5px;
    cursor: default;
    border-radius: 4px;
    color: #FFFFFF;
    z-index: 9;
    background: #000000;
    text-align: center;
  `)
  container.setAttribute(
    "style",
    `
    position: fixed;
    right: 3%;
    top: 90%;
    visibility: visible;
    `
  )
};

const injectElementsPage = () => {
  document.body.appendChild(container)
}

const setWithTimeFormat = (_format) => {
  if (_format === 12) {
    timeText.textContent = dayjs().format('hh:mm');
  } else {
    timeText.textContent = dayjs().format('HH:mm');
  }
}

createInitialElement();
setStyleElements();
injectElementsPage();

// interval runs at every minute for time updation
let interval = setInterval(() => {
  if (timeText) {
    setWithTimeFormat(format);
  }
}, 10000);


window.addEventListener('resize', () => {
  getLocalStorage('fullscreen', (val) => {
    if (val && !isMaximized()) {
      container.style.visibility = 'hidden';
    } else container.style.visibility = 'visible';
  })
})

// events
//  popup --> service-worker.js --> content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "top-left":
      container.style.top = "4%";
      container.style.right = "93%";
      break;
    case 'top-right':
      container.style.top = "4%";
      container.style.right = "3%";
      break;
    case 'bottom-left':
      container.style.top = "90%";
      container.style.right = "93%";
      break;
    case 'bottom-right':
      container.style.top = "90%";
      container.style.right = "3%";
      break;
    case 'format':
      if (message.value) {
        format = 24;
      } else {
        format = 12;
      }
      setWithTimeFormat(format)
      break;
    case 'background':
      if (message.value) {
        timeText.style.background = '#000000';
        timeText.style.color = '#ffffff';
      } else {
        timeText.style.background = 'none';
        timeText.style.color = '#000000';
      }
      break;
    case 'fullscreen':
      if (message.value && !isMaximized()) {
        console.log('fullscreen in content.js', 'hidding');
        container.style.visibility = 'hidden';
      } else container.style.visibility = 'visible';
      break;
    case 'set-defaults':
      setDefaultValues();
      break;
    default:
      console.log("default case");
      break;
  }
});
