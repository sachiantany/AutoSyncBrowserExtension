function injectTheScript() {
    // Wuery the active tab, which will be only one tab and inject the script in it.
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      console.log('injectTheScript!');

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
    console.log('Saved value:', numberField1.value);
    injectTheScript();
  });
});


document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['frequency'], function(result) {

      const frequency = result.frequency;

      console.log('frequency in popup.js: ' +frequency);

      if (frequency) {
        numberField1.value = frequency;
        hiddenField.value = frequency;
        // injectTheScript();
      }
    });
  });

//Stop btn
stopBtn.addEventListener('click', function() {
    chrome.storage.sync.get(['frequency','timer'], function(result) {

      var frequency = result.frequency;
      var timer = result.timer;
      console.log('stop btn: ' +frequency);

      clearInterval(timer);
      chrome.storage.sync.set({ 'frequency': '','timer': '' }, function() {
          numberField1.value = '';
          hiddenField.value = '';
          // injectTheScript();
        
      });

    });

  });