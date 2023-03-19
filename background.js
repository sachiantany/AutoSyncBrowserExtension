//Handle the other URL permission error
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.error && message.error.includes("Cannot access a chrome:// URL")) {
    console.error("Error: Cannot access a chrome:// URL");
  }
});

//Work on installing the Ext
chrome.runtime.onInstalled.addListener(function() {
  // Set default values in storage
  chrome.storage.sync.set({ "frequency": '', "timer": '' }, function() {
    console.log("Storage initialized");
  });

});

//Work on creating a new tab
chrome.tabs.onCreated.addListener(function(tabs) {
  chrome.storage.sync.get(['frequency','timer'], function(result) {
    const frequency = result.frequency;
    const timerId = result.timer;

    if (frequency) {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content.js']})
      });
    }

  });
});

//Work on updating the tab
chrome.tabs.onUpdated.addListener(function(tabs) {
  console.log("On update!");
  chrome.storage.sync.get(['frequency','timer'], function(data) {
    const frequency = data.frequency;
    const timerId = data.timer;

    console.log("frequency : ",frequency, "timerID :", timerId);
  });

});