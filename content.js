// Função para injetar um script externo no DOM
function injectScript(file) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(file);  // Referência ao arquivo injetado
    (document.head || document.documentElement).appendChild(script);
    script.remove();
  }
  
  // Injetar o arquivo injected.js no contexto da página
  injectScript('injected.js');
  
  // Ouvir a mensagem da página e capturar o valor da variável 'datos'
  window.addEventListener('message', function(event) {
    if (event.source !== window) return;
  
    // Verificar se a mensagem é a que esperamos
    if (event.data.type && event.data.type === 'FROM_PAGE') {
      console.log('Valor de "datos" recebido da página:', event.data.value);
      window.localStorage.datos = JSON.stringify(event.data.value)
      // Aqui você pode usar o valor de "datos" como quiser
      // Enviar o valor de 'datos' para o background script ou popup
      chrome.runtime.sendMessage({ type: 'FROM_CONTENT', value: event.data.value });
    }
  });
  