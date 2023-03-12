function injectTheScript() {
    // Wuery the active tab, which will be only one tab and inject the script in it.
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content.js']})
    })
}

var numberField1 = document.getElementById('numberField1');
var submitBtn = document.getElementById('submitBtn');
var hiddenField = document.getElementById('hiddenField');
var stopBtn = document.getElementById('stopBtn');


console.log('numberField is 2: ' +numberField1.value);

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  chrome.storage.sync.set({ 'frequency': numberField1.value }, function() {

    // Update status to let user know options were saved.
    // var status = document.getElementById('status');
    // status.textContent = 'Options saved.';
    // setTimeout(function() {
    //   status.textContent = '';
    // }, 750);

    hiddenField.value = numberField1.value;
    console.log('Saved value:', numberField1.value);
    injectTheScript();
  });
});


document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['frequency'], function(result) {

      const frequency = result.frequency;

      console.log('frequency is 2: ' +frequency);

      if (frequency) {
        numberField1.value = frequency;
        hiddenField.value = frequency;

        injectTheScript();
      }
    });
  });

//Stop btn

stopBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { stopFunction: true });
    });
  });