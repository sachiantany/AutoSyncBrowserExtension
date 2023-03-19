chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.error && message.error.includes("Cannot access a chrome:// URL")) {
    console.error("Error: Cannot access a chrome:// URL");
    // Handle the error as needed
  }
});

chrome.runtime.onInstalled.addListener(function() {
  // Set default values in storage
  chrome.storage.sync.set({ "frequency": '', "timer": '' }, function() {
    console.log("Storage initialized");
  });

});


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

chrome.tabs.onUpdated.addListener(function(tabs) {
  console.log("On update!");
  chrome.storage.sync.get(['frequency','timer'], function(data) {
    const frequency = data.frequency;
    const timerId = data.timer;

    console.log("frequency : ",frequency, "timerID :", timerId);
  });

});