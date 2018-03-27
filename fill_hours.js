var firstDay;
document.querySelectorAll('a').forEach(function(el) { if (el.innerText === "1") firstDay = el; });
firstDay.click();

var diasInvalidos = [];
document.querySelectorAll('.diaInhabil').forEach(function(el) { diasInvalidos.push(el.text); });

window.parseCurrentDate = function() {
  return document.querySelector('#lblFechaCaptura').innerHTML.split(/\s/);
};

window.jumpToNextDay = function() {
  if(document.querySelector('#btnDiaSiguiente').style.display === '') {
    document.querySelector('#btnDiaSiguiente').click();
  }
};

window.setHostMind = function() {

  document.querySelector('#HorasCapturadas').value = window.localStorage.time;
  document.querySelector('#cmbActividades').value = window.localStorage.activity;
  document.querySelector('#Comentario').value = window.localStorage.comment;
  document.querySelector('#btnOk').click();

  var iterations = 0;
  var waiting = window.setInterval(function() {
    iterations++;

    var hasActivities = document.querySelector('#divActividadesCapturaActividades').querySelectorAll('tr.total').length > 0;
    console.log('hasActivities', hasActivities);

    if (hasActivities) {
      clearInterval(waiting);

      console.log('Selected date', document.querySelector('#lblFechaCaptura').innerHTML);
      var rg = window.parseCurrentDate();
      var isFriday = !!rg[0] && rg[0] === 'Sex';

      window.jumpToNextDay();

      if (!!isFriday) {
        window.jumpToNextDay();
        window.jumpToNextDay();
      }

      rg = window.parseCurrentDate();
      dayOfMonth = rg[1];
      if(diasInvalidos.indexOf(dayOfMonth) != -1) {
        console.log('Jump invalid day', dayOfMonth);
        window.jumpToNextDay();
      }

      if(document.querySelector('#btnDiaSiguiente').style.display === '') {
        window.setHostMind();
      }

    }

    if(iterations >= 70) {
      clearInterval(waiting);
    }

  }, 1000);
};

window.setHostMind();