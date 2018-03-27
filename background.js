var URLHost = 'https://host.globalhitss.com';
var matchURLHost = /host.globalhitss.com/;
var matchURLHoras = /host.globalhitss.com\/Horas\/CapturaHoras2/;

var enableExtension = function() {
  chrome.browserAction.setTitle({ title: 'HOST Lançar Horas' });
  chrome.browserAction.setPopup({ popup: 'popup.html' });
  chrome.browserAction.setIcon({ path: 'host.png' });
};
var disableExtension = function() {
  chrome.browserAction.setTitle({ title: 'HOST Lançar Horas (Disabled)' });
  chrome.browserAction.setPopup({ popup: '' });
  chrome.browserAction.setIcon({ path: 'host_disabled.png' });
};
var checkURLHost = function(arg) {
  if(arg.url.match(matchURLHoras) == null && arg.url.match(matchURLHost) == null) {
    chrome.tabs.create({ 'url': URLHost });
  }
};
chrome.tabs.onActivated.addListener(function(info) {
  chrome.tabs.get(info.tabId, function(change) {
    if(change.url == undefined) {
      disableExtension();
    } else if(change.url.match(matchURLHoras) == null) {
      disableExtension();
    } else{
      enableExtension();
    }
  });
});
chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
  if(tab.url == undefined) {
    return;
  } else if(tab.url.match(matchURLHoras) == null) {
    disableExtension();
  } else {
    enableExtension();
  }
});
chrome.browserAction.onClicked.addListener(checkURLHost);

disableExtension();
