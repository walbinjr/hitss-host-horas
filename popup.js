let dataInfo = {}

function initialize() {
  document.querySelector('#activity').value = window.localStorage.activity;
  document.querySelector('#time').value = window.localStorage.time;
  document.querySelector('#comment').comment = window.localStorage.comment;
}

function saveInfo() {
  window.localStorage.activity = document.querySelector('#activity').value;
  window.localStorage.time = document.querySelector('#time').value;
  window.localStorage.comment = document.querySelector('#comment').value;

  dataInfo.activity = window.localStorage.activity
  dataInfo.time = window.localStorage.time
  dataInfo.comment = window.localStorage.comment
}

function setTabInfo(tabInfo) {
  window.localStorage.activity = tabInfo.activity
  window.localStorage.time = tabInfo.time
  window.localStorage.comment = tabInfo.comment
}

async function injectScript() {
  saveInfo();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setTabInfo,
    args: [dataInfo]
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['fill_hours.js']
  });
}

document.querySelector('#calc_button').addEventListener('click', injectScript);

initialize();