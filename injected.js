const pageData = {}
const selectElement = document.querySelector('#cmbActividades');

// Verificar se a variável 'datos' existe e enviar o valor de volta
if (typeof datos !== 'undefined') {
    pageData['datos'] = datos
    // window.postMessage({ type: 'FROM_PAGE', value: datos }, '*');
}

// Verifica o campo de select de atividades para coletar as options
if (selectElement) {
    const options = selectElement.options; // Obter todas as opções do select
    const optionsObject = [];

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        // Criar um objeto para cada opção
        optionsObject.push({
        value: option.value,
        text: option.textContent
        });
    }

    pageData['activities'] = optionsObject
}

// Envia mensagem com o objeto coletado na página
window.postMessage({ type: 'FROM_PAGE', value: pageData }, '*');
