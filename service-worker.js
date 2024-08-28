const clock_format = 12;

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    // getting local storage $clock_format
    // and setting it to 12 as default if not found
    // otherwise set to what is in storage
    chrome.storage.local.get('clock_format', function (f) {
      if (!f) {
        chrome.storage.local.set({ clock_format }, function () {
          console.log(`stored local clock format value as ${format}`);
        })
      }
    })
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    // Execute a content script to manipulate the DOM
    chrome.tabs.sendMessage(activeTab.id, { action: message.action })
    .then(result => console.log('result', result))
    .catch(error => console.log('error', error));
  });
  sendResponse(true);
});