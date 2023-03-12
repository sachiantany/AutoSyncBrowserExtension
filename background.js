chrome.runtime.onInstalled.addListener(function() {
  console.log("On install!")

  // Set default values in storage
  chrome.storage.sync.set({frequency: '' });
});


chrome.tabs.onCreated.addListener(function(tabs) {
  console.log("On create!");

  chrome.storage.sync.get(['frequency'], function(result) {
    const frequency = result.frequency;
    console.log("Inside the background 1...")

    if (frequency) {
      // Check if the URL matches the saved URL in storage
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content.js']})
      });
    }

  });
});

chrome.tabs.onUpdated.addListener(function(tabs) {
  console.log("On update!");
  // Check if the URL matches the saved URL in storage
  chrome.storage.sync.get(['frequency'], function(data) {
    // Send a message to the content script to start the function with the saved frequency value
    chrome.tabs.sendMessage(tabs[0].id, { start: true, frequency: data.frequency });
  });

});