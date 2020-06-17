  let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    request.pages.map(url => {
      console.log(url)
      let tag = document.createElement("p");
      let text = document.createTextNode(url);
      tag.appendChild(text);
      let element = document.getElementById("root");
      element.appendChild(tag);
    })
    
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});

  });