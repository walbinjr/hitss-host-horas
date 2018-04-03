var firstDay;
document.querySelectorAll('a').forEach(function(el) { if (el.innerText === "1") firstDay = el; });
firstDay.click();

var diasInvalidos = [];
document.querySelectorAll('.diaInhabil').forEach(function(el) { diasInvalidos.push(parseInt(el.text)); });
// console.log('diasInvalidos', diasInvalidos);

window.parseCurrentDate = function() {
  return document.querySelector('#lblFechaCaptura').innerHTML.split(/\s/);
};

window.jumpToNextDay = function() {
  if(document.querySelector('#btnDiaSiguiente').style.display === '') {
    document.querySelector('#btnDiaSiguiente').click();
    window.setHour();
  }
};

window.isValidDay = function() {
  var rg = window.parseCurrentDate();
  var dayOfMonth = parseInt(rg[1]);
  console.log('currentDate', rg);
  // console.log('dayOfMonth', dayOfMonth);
  var validDay = diasInvalidos.indexOf(dayOfMonth) == -1;
  return validDay;
};

window.setHour = function() {
  if(window.isValidDay()) {
    document.querySelector('#HorasCapturadas').value = window.localStorage.time;
    document.querySelector('#cmbActividades').value = window.localStorage.activity;
    document.querySelector('#Comentario').value = window.localStorage.comment;
    document.querySelector('#btnOk').click();
  }

  window.startValidator();
};

window.startValidator = function() {
  var iterations = 0;
  var waiting = window.setInterval(function() {
    iterations++;

    var hasActivities = document.querySelector('#divActividadesCapturaActividades').querySelectorAll('tr.total').length > 0;
    // console.log('hasActivities', hasActivities);
    // console.log('validDay', window.isValidDay());

    if (hasActivities || !window.isValidDay()) {
      clearInterval(waiting);
      window.jumpToNextDay();
    }

    if(iterations >= 70) {
      clearInterval(waiting);
    }

  }, 1000);
};

window.setHour();