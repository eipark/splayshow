console.log("bleacher report script loaded");
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("bleacher");
    baseUrl = tab.url + "/page/";
    numSlides = 15 - 2;
    lastIndex = numSlides + 1;

    ///^[1-9][0-9]*$/
    //chrome.extension.getBackgroundPage().console.log(tab);
    console.log(tab.url);
    currentUrl = tab.url;
    //chrome.extension.getBackgroundPage().console.log(tab);
    console.log(tab);
    ChromeTabs = chrome.tabs;
    ChromeTabs.getCurrent().remove();
    for (var i=2;i <= lastIndex;i++) {
      ChromeTabs.create({url:"http://google.com", active: false});
    }
});
