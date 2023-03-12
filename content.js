var timerId = null;

// console.log("Content started...")
// clearInterval();
// console.log("clear interval 0...")


// Find the sync button and click it
function clickSyncButton() {
  const syncButton = document.getElementById('AppHeader__sync');
  if (syncButton) {
    console.log("Syncing...")
    syncButton.click();
  }
}

chrome.storage.sync.get(['frequency'], function(result) {
    const frequency = result.frequency;
    console.log("Inside the Content 1...")

    if (timerId === null) {
        timerId = setInterval(function() {
          // your code here
          console.log("Inside the Content 2...: ",timerId)
          clickSyncButton();

        }, frequency*1000);
      }      
    // setInterval(clickSyncButton, frequency*1000);

});

//Clear the interval

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.stopFunction) {
//       clearInterval(timerId);
//       console.log("clearInterval 1...")

//       timerId = null;
//     }
//   });

