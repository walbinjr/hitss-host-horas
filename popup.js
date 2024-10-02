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
document.addEventListener('DOMContentLoaded', function() {
  // Solicitar o valor de 'pageData' do background script
  chrome.runtime.sendMessage({ type: 'REQUEST_PAGE_DATA' }, function(response) {
    if (response.value) {
      console.log('Valor de "pageData" recebido no popup:', response.value);

      // Supondo que response.value seja um array de objetos ou um array de valores
      const pageData = response.value; // Use esse valor para adicionar ao select
      window.localStorage.pageData = JSON.stringify(pageData)

      // Selecionar o elemento select
      // const projectSelect = document.querySelector('#project');
      const activitySelect = document.querySelector('#activity');

      // Limpar opções existentes (se necessário)
      // projectSelect.innerHTML = '';
      
      // Adicionar as opções ao select
      // pageData?.datos?.Proyectos.forEach(item => {
      //   const option = document.createElement('option');
      //   option.value = item.Id_Proyecto || '99999'; // Assumindo que item pode ter um id
      //   option.textContent = item.Proyecto || 'Default'; // Usando name ou o próprio valor
      //   projectSelect.appendChild(option);
      // });

      // Adicionar as opções ao select
      pageData?.activities?.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value || '99999'; // Assumindo que item pode ter um id
        option.textContent = item.text || 'Default'; // Usando name ou o próprio valor
        activitySelect.appendChild(option);
      });
      // Exibir o valor de "datos" no popup ou usar como desejar
      // const datosDiv = document.getElementById('datos');
      // if (datosDiv) {
      //   datosDiv.textContent = 'Valor de datos: ' + response.value;
      // }
    }
  });
});

initialize();