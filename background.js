disableBadge();
var siteScriptsDir = "site_scripts"
var urlMap = {
  "bleacherreport.com": {
    inclusionRule: function(url) {
      if (url.indexOf("/page") !== -1) {
        return false;
      }
      return true;
    },
    baseUrl: function(url) {
      return url
    },
    contentScript: siteScriptsDir + "/bleacherreport.js"
  }
}

function getUrlMapping(url) {
  //stirp url to base url
  var urlObj = document.createElement("a");
  urlObj.href = url;
  return urlMap[urlObj.hostname];
}

function enableBadge(tabId) {
  chrome.browserAction.setBadgeBackgroundColor({color:"#09FF00", tabId: tabId});
  chrome.browserAction.setBadgeText({text:"+", tabId: tabId});
  chrome.browserAction.enable(tabId);
}
function disableBadge(tabId) {
  //chrome.browserAction.setBadgeBackgroundColor({color:"#FF0000", tabId: tabId});
  //chrome.browserAction.setBadgeText({text:"x", tabId: tabId});
  chrome.browserAction.disable(tabId);
}


detectSlideshow = function() {
  chrome.tabs.query({active: true}, function(activeTabs) {
    for (var i = 0; i < activeTabs.length; i++) {
      tab = activeTabs[i];
      // use hash based on base url... hash gives you a function that excludes other urls as well
      var urlMapping = getUrlMapping(tab.url);
      if (urlMapping) {
        if (urlMapping.inclusionRule(tab.url)) {
          enableBadge(tab.id);
        } else {
          disableBadge(tab.id);
        }
      } else {
        disableBadge(tab.id);
      }
    }
  });
};

// if URL gets set
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.active) {
    detectSlideshow();
  }
});
// whenever tab switches
chrome.tabs.onActivated.addListener(function(tab) {
  detectSlideshow();
});

// we only have access to browserAction within the context of the extension background.js
chrome.browserAction.onClicked.addListener(function(tab) {

  //inject the content script if we get a match
  var urlMapping = getUrlMapping(tab.url);
  if (urlMapping) {
    /*
    chrome.tabs.executeScript(null, {file: urlMapping.contentScript}, function(result) {
      console.log("-------------");
    });
    */
    //putting debugger on this line seems to prevent the script from running
    chrome.tabs.executeScript(null, {file: urlMapping.contentScript}, function(results) {
      console.log(results);
    });
  }
});
