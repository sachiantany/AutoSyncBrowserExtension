const numberField1 = document.getElementById('numberField1');
const submitBtn = document.getElementById('submitBtn');
const hiddenField = document.getElementById('hiddenField');
const stopBtn = document.getElementById('stopBtn');

//Inject the script content.js
function injectTheScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ['content.js'] }, () => {
      if (chrome.runtime.lastError) {
        console.log("Error: Cannot access a chrome:// URL");
      }
    });
  });

}

//Save the user values
submitBtn.addEventListener('click', e => {
  e.preventDefault();
  chrome.storage.sync.set({ 'frequency': numberField1.value }, () => {
    hiddenField.value = numberField1.value;
    alert('Data saved successfully!');
    injectTheScript();
  });
});

//Update the user value in the popup
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['frequency'], result => {
    const frequency = result.frequency;
    if (frequency) {
      numberField1.value = frequency;
      hiddenField.value = frequency;
    }
  });
});

