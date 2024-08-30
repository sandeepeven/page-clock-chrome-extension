window.addEventListener('resize', () => {
  if (isMaximized()) {
    updateLocalStorage(true);
  } else {
    console.log('window not maximised...updating local storage');
    updateLocalStorage(false)
  }
})

// events
//  popup --> service-worker.js --> content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const container = document.getElementById('clock-container');
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
    case 'set-defaults':
      setDefaultValues();
      break;
    case 'position':
    case 'format':
    case 'background':
    case 'fullscreen':
      // const ele = document.getElementById(message.action);
      // if (ele) {
      //   getLocalStorage(message.action, (res) => {
      //     if (res) {
      //       if (message.action === 'position') {
      //         ele.checked = res;
      //         return
      //       }
      //       ele.value = res;
      //     }
      //   })
      // }
      break;
    default:
      console.log("default case");
      break;
  }
});

// Chrome Events
// chrome.runtime.onSuspend.addListener(function () {
//   if (interval) {
//     clearInterval(interval);
//   }
// });

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
  `)
  container.setAttribute(
    "style",
    `
    position: fixed;
    right: 3%;
    top: 90%;
    `
  )
};

const timeText = document.createElement('span');
const container = document.createElement('div');
const containerId = "clock-container", timeTextId = "clock-text-display";

const CreateInitialElement = () => {
  container.setAttribute("id", containerId);
  container.appendChild(timeText);
  timeText.setAttribute("id", timeTextId);
  timeText.textContent = dayjs().format('hh:mm');
}

const InjectElementsPage = () => {
  document.body.appendChild(container)
}

CreateInitialElement();
SetStyleElements();
InjectElementsPage();

// interval runs at every minute for time updation
let interval = setInterval(() => {
  if (timeText) {
    timeText.textContent = dayjs().format('hh:mm')
  }
}, 10000);

