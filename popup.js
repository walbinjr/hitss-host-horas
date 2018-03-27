function initialize() {
  document.querySelector('#activity').value = window.localStorage.activity;
  document.querySelector('#time').value = window.localStorage.time;
  document.querySelector('#comment').comment = window.localStorage.comment;
}

function saveInfo() {
  window.localStorage.activity = document.querySelector('#activity').value;
  window.localStorage.time = document.querySelector('#time').value;
  window.localStorage.comment = document.querySelector('#comment').value;
}

function getCodeString() {
  return "window.localStorage.activity = '" + window.localStorage.activity + "';"
      + "window.localStorage.time = '" + window.localStorage.time + "';"
      + "window.localStorage.comment = '" + window.localStorage.comment + "';";
}

function fillHours() {
  saveInfo();

  chrome.tabs.executeScript({
    code: getCodeString()
  });

  chrome.tabs.executeScript({
    file: 'fill_hours.js'
  });
}

document.querySelector('#calc_button').addEventListener('click', fillHours);

initialize();