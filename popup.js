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

function updateSubSelect() {
  const mainSelect = document.getElementById('project');
  const subSelect = document.getElementById('activity');
  subSelect.innerHTML = ''; // Clear existing options

  const optionsFor99999 = [
      { value: '468722', text: 'Analise de Software' },
      { value: '468719', text: 'Ausência Férias' },
      { value: '468718', text: 'Ausência Justificada' },
      { value: '468717', text: 'Ausência Particular' },
      { value: '686955', text: 'ASESORÍA A PROYECTOS' },
      { value: '770097', text: 'DESARROLLO' },
      { value: '468720', text: 'Desenvolvimento de Software' },
      { value: '706812', text: 'Dia do Profissional de Informa' },
      { value: '524690', text: 'Extra' },
      { value: '468723', text: 'Gerenciamento de Projetos' },
      { value: '468724', text: 'Gestão Operacional' },
      { value: '1054284', text: 'OTROS' },
      { value: '468721', text: 'Scrum Master' }
  ];

  const optionsFor67024 = [
      { value: '717878', text: 'ACTUALIZACIONES A REPOSITORIO', title: 'Raiz : GLOBALES' },
      { value: '717879', text: 'ADMINISTRACIÓN', title: 'Raiz : GLOBALES' },
      { value: '717880', text: 'ADMON DE LA CONFIGURACION', title: 'Raiz : GLOBALES' },
      { value: '717881', text: 'ANALISIS', title: 'Raiz : GLOBALES' },
      { value: '717882', text: 'ASESORIA', title: 'Raiz : GLOBALES' },
      { value: '717883', text: 'ASESORÍA A PROYECTOS', title: 'Raiz : GLOBALES' },
      { value: '717884', text: 'AUDITORIA', title: 'Raiz : GLOBALES' },
      { value: '717885', text: 'CAPACITACION', title: 'Raiz : GLOBALES' },
      { value: '717886', text: 'CAPACITACIÓN A OPERACIONES', title: 'Raiz : GLOBALES' },
      { value: '717887', text: 'DESARROLLO', title: 'Raiz : GLOBALES' },
      { value: '717888', text: 'DISEÑO', title: 'Raiz : GLOBALES' },
      { value: '717889', text: 'DOCUMENTACION', title: 'Raiz : GLOBALES' },
      { value: '717890', text: 'ENTREVISTAS', title: 'Raiz : GLOBALES' },
      { value: '717891', text: 'EVALUACIONES (SCAMPI)', title: 'Raiz : GLOBALES' },
      { value: '717892', text: 'HORAS STAND BY', title: 'Raiz : GLOBALES' },
      { value: '717893', text: 'IMPLEMENTACIÓN', title: 'Raiz : GLOBALES' },
      { value: '717894', text: 'INICIATIVAS', title: 'Raiz : GLOBALES' },
      { value: '717895', text: 'INNOVACIONES', title: 'Raiz : GLOBALES' },
      { value: '717896', text: 'LIBERACION', title: 'Raiz : GLOBALES' },
      { value: '717897', text: 'MANTENIMIENTO', title: 'Raiz : GLOBALES' },
      { value: '717898', text: 'MANTENIMIENTO AMMI', title: 'Raiz : GLOBALES' },
      { value: '717899', text: 'MÉTRICAS', title: 'Raiz : GLOBALES' },
      { value: '717900', text: 'OTROS', title: 'Raiz : GLOBALES' },
      { value: '717901', text: 'PREANALISIS', title: 'Raiz : GLOBALES' },
      { value: '717902', text: 'PRESENTACIÓN', title: 'Raiz : GLOBALES' },
      { value: '717903', text: 'PREVENTA', title: 'Raiz : GLOBALES' },
      { value: '717904', text: 'PRUEBAS', title: 'Raiz : GLOBALES' },
      { value: '717905', text: 'REUNIONES', title: 'Raiz : GLOBALES' },
      { value: '717906', text: 'REVISION DOCUMENTAL', title: 'Raiz : GLOBALES' },
      { value: '717907', text: 'SEGUIMIENTO', title: 'Raiz : GLOBALES' },
      { value: '717908', text: 'SUPERVISIÓN', title: 'Raiz : GLOBALES' },
      { value: '1133763', text: 'VACACIONES', title: 'Raiz : GLOBALES' },
      { value: '717909', text: 'VENTAS', title: 'Raiz : GLOBALES' }
  ];

  let options;
  if (mainSelect.value === '99999') {
      options = optionsFor99999;
  } else if (mainSelect.value === '67024') {
      options = optionsFor67024;
  }

  if (options) {
      options.forEach(option => {
          const opt = document.createElement('option');
          opt.value = option.value;
          opt.text = option.text;
          if (option.title) {
              opt.title = option.title;
          }
          subSelect.appendChild(opt);
      });
  }
}

document.querySelector('#project').addEventListener('change', updateSubSelect);
document.querySelector('#calc_button').addEventListener('click', injectScript);

initialize();