
/*
chrome.runtime.getBackgroundPage(function(Window backgroundPage){
  alert("sdf");
});
*/
disableBadge();

function enableBadge(tabId) {
  chrome.browserAction.setBadgeBackgroundColor({color:"#09FF00", tabId: tabId});
  chrome.browserAction.setBadgeText({text:"+", tabId: tabId});
}
function disableBadge(tabId) {
  chrome.browserAction.setBadgeBackgroundColor({color:"#FF0000", tabId: tabId});
  chrome.browserAction.setBadgeText({text:"x", tabId: tabId});
}

detectSlideshow = function() {
  chrome.tabs.query({active: true}, function(activeTabs) {
    console.log("active tabs below: ");
    console.log(activeTabs);
    for (var i = 0; i < activeTabs.length; i++) {
      tab = activeTabs[i];
      console.log(tab.url);
      if (tab.url) {
        if (tab.url.indexOf("nhl") !== -1) {
          enableBadge(tab.id);
        } else {
          disableBadge(tab.id);
        }
      }
    }
  });
};

// if URL gets set
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("url set");
  if (tab.active) {
    detectSlideshow();
  }
});
// whenever tab switches
chrome.tabs.onActivated.addListener(function(tab) {
  console.log("tab switch");
  detectSlideshow();
});
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("background");

});
