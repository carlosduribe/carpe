const fs = require('fs')
const logoImage = document.querySelector('img');
const headerTitle = document.querySelector('h1');
const questionStatement = document.getElementById('enunciadoDeLaPregunta');
const opcionesDiv = document.getElementById('opciones');
const radioOptions = document.querySelectorAll('input[type="radio"]');
const opcionA = document.getElementById('opcionA');
const opcionB = document.getElementById('opcionB');
const opcionC = document.getElementById('opcionC');
const opcionD = document.getElementById('opcionD');
const respuestaCorrectaButton = document.getElementById('respuestaCorrecta');
const respuestaSection = document.getElementById('respuesta');
const rightAnswer = document.getElementById('opcionCorrecta')
const argument = document.getElementById('argumentoOpcionCorrecta')
const siguientePreguntaButton = document.getElementById('siguientePregunta');


logoImage.addEventListener('click', function () {
    window.location.href = 'https://soydanieluva.notion.site/Preguntas-Carpe-29df5a68b4a74ed089408f600950c739?pvs=4';
});

headerTitle.addEventListener('click', function () {
    window.location.href = 'https://soydanieluva.notion.site/Preguntas-Carpe-29df5a68b4a74ed089408f600950c739?pvs=4';
});

opcionesDiv.addEventListener('click', function (event) {
  if (event.target.type === 'radio') {
    radioOptions.forEach(option => {
      option.checked = false;
    });
    event.target.checked = true;
  }
});

respuestaCorrectaButton.addEventListener('click', function () {
  respuestaSection.removeAttribute('hidden');
});

siguientePreguntaButton.addEventListener('click', function () {
  respuestaSection.setAttribute('hidden', 'true');
  radioOptions.forEach(option => {
    option.checked = false;
  });
});

fs.readFile('Recursos/preguntasSeparadasPorNumeral.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    
    let elementos = data.split('#').filter(elemento => elemento.trim() !== '');
    let grupos =[]
    for (let i = 0; i < elementos.length; i += 7) {
        grupos.push(elementos.slice(i, i + 7));
    }
    
    let grupoAleatorio = grupos[Math.floor(Math.random() * grupos.length)];
    
    questionStatement.textContent = grupoAleatorio[0];
    opcionA.value = grupoAleatorio[1];
    opcionB.value = grupoAleatorio[2];
    opcionC.value = grupoAleatorio[3];
    opcionD.value = grupoAleatorio[4];
    rightAnswer.textContent = grupoAleatorio[5];
    argument.textContent = grupoAleatorio[6];
});
    

