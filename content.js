// Find the sync button and click it
function clickSyncButton() {
  const syncButton = document.getElementById('AppHeader__sync');
  if (syncButton) {
    console.log("Syncing...")
    syncButton.click();
  }
}

chrome.storage.sync.get(['frequency','timer'], function(result) {
    const frequency = result.frequency;
    var timerId = result.timer;

    var boolCL = clearInterval(timerId);

    console.log("Inside the Content 1...",boolCL);
    console.log("Inside the Content 2...",timerId);

    timerId = setInterval(function() {
      console.log("Inside the Content 3...: ",timerId)
      chrome.storage.sync.set({'timer': timerId });

      clickSyncButton();

    }, frequency*1000);
   

});

