chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, () => {   //incializa variable  de color en storage
    console.log("The color is green.");
  });
});

chrome.browserAction.onClicked.addListener( () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("app.html") });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    let pages=[]
    // make sure the status is 'complete' and it's the right tab
    if (tab.url.indexOf('app.html') != -1 && changeInfo.status == 'complete') {
        chrome.tabs.query({"currentWindow":true},(tabs)=>{
          console.log(tabs)
          tabs.map((tab)=>{
            pages.push(tab.url)
          })
            chrome.tabs.sendMessage(tabs[tabs.length-1].id, {greeting:"hello",pages:pages}, function(response) {
            console.log(response.farewell);
        });        
      })
    }
});