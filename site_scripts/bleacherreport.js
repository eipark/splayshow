// Content script runs on the page itself
console.log("bleacher report script loaded------------");
winLoc = window.location;
url = winLoc.protocol + "//" + winLoc.host + winLoc.pathname;
baseUrl = url + "/page/";
pageCount = parseInt(document.getElementsByClassName("paginators_page-count")[0].textContent);
extraEndPages = 10;
lastIndex = pageCount - extraEndPages;
startIndex = 2; // starts at 2

// this gets returned to the executeScript callk
result = {
  startIndex: 2,
  endIndex: pageCount - extraEndPages,
  baseUrl: baseUrl
}
/*
///^[1-9][0-9]*$/
chrome.tabs.getCurrent(function(tab) {
  chrome.tabs.remove(tab.id);
});
for (var i=startIndex; i <= lastIndex; i++) {
  ChromeTabs.create({url: baseUrl + i.toString(), active: false});
}
*/
