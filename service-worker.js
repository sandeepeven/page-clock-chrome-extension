function sendMessageTabQuery (action) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    // Execute a content script to manipulate the DOM
    chrome.tabs.sendMessage(activeTab.id, action)
      .then(x => console.log('service-worker-->', x))
      .catch(error => console.log('service-worker-error-->', error));
  });
}

// chrome.runtime.onInstalled.addListener(({ reason }) => {
//   if (reason === 'install') {
//   }
// });

chrome.runtime.onStartup.addListener(() => {
  // Setting Default Values on Extension Startup
  sendMessageTabQuery({action: 'set-defaults', value: null })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('onMessage', message, 'service-worker.js', 'sender-->', sender);
  sendMessageTabQuery(message);
  sendResponse(true);
});