// Find the sync button and click it
function clickSyncButton() {
  const syncButton = document.getElementById('AppHeader__sync');
  if (syncButton) {
    console.log("Syncing...")
    syncButton.click();
  }
}

var storage = chrome.storage.sync;

storage.get(['frequency', 'timer'], function(result) {
  const frequency = result.frequency;
  let timerId = result.timer;

  clearInterval(timerId);

  timerId = setInterval(function() {
    storage.set({'timer': timerId});
    clickSyncButton();
  }, frequency * 1000);
});

// chrome.storage.sync.get(['frequency','timer'], function(result) {
//     const frequency = result.frequency;
//     var timerId = result.timer;

//     var boolCL = clearInterval(timerId);

//     timerId = setInterval(function() {
//       chrome.storage.sync.set({'timer': timerId });

//       clickSyncButton();

//     }, frequency*1000);
   

// });

