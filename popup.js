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


console.log('numberField in popup: ' +numberField1.value);

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  chrome.storage.sync.set({ 'frequency': numberField1.value }, function() {

    hiddenField.value = numberField1.value;
    injectTheScript();
  });
});


document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['frequency'], function(result) {

      const frequency = result.frequency;

      if (frequency) {
        numberField1.value = frequency;
        hiddenField.value = frequency;
        // injectTheScript();
      }
    });
  });
