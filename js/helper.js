function isMaximized () {
  return (window.outerWidth === window.innerWidth && window.outerHeight === window.innerHeight)
}

function updateLocalStorage (key, value) {
  chrome.storage.local.set({ [key]: value }, function () {
    console.log(`${key} saved as ${value} in local storage`);
  })
}

function getLocalStorage (key, callback) {
  chrome.storage.local.get(key, function (value) {
    console.log(`got ${key} as ${JSON.stringify(value)} in local storage`);
    callback(value[key]);
  })
}

function setDocumentPriorValues (elementId, value) {
  document.getElementById(elementId).value = value;
}

function setDefaultValues () {
  getLocalStorage('format', (f) => {
    updateLocalStorage('format', f ?? 12);
  })
  updateLocalStorage('position', 'bottom-right');
  updateLocalStorage('background', true);
  updateLocalStorage('fullscreen', false);
}

function sendMessageTabQuery (action) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    // Execute a content script to manipulate the DOM
    chrome.tabs.sendMessage(activeTab.id, { action })
      .then(x => console.log('service-worker-->', x))
      .catch(error => console.log('service-worker-error-->', error));
  });
}
