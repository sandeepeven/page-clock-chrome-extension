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

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log('sender id', sender.tab.windowId)
  chrome.windows.get(sender.tab.windowId, function(chromeWindow) {
    // "normal", "minimized", "maximized" or "fullscreen"
    alert('Window is ' + chromeWindow.state);
});
})
