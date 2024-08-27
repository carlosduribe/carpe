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
var grupos = [];


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

function populateQuestionGroups(data) {
  var elementos = data.split('#').filter(function(elemento) {
    return elemento.trim() !== '';
  });

  for (var i = 0; i < elementos.length; i += 7) {
    grupos.push(elementos.slice(i, i + 7));
  }
}

function displayRandomQuestion() {
  var grupoAleatorio = grupos[Math.floor(Math.random() * grupos.length)];

// Split the question statement into lines
const lines = grupoAleatorio[0].split('\n');

// Clear existing content
questionStatement.innerHTML = '';

// Process each line
lines.forEach(line => {
  if (line.trim().startsWith('https')) {
    // Create an image element
    const imageElement = document.createElement('img');
    questionStatement.appendChild(imageElement);
    imageElement.src = line.trim();
    imageElement.alt = 'Image related to the question';
    imageElement.style.maxWidth = '100%';
  } else {
    // Append the text content
    const textNode = document.createTextNode(line);
    questionStatement.appendChild(textNode);

    // Add a line break after each line (except the last one)
    if (line !== lines[lines.length - 1]) {
      questionStatement.appendChild(document.createElement('br'));
    }
  }
});
  opcionA.textContent = grupoAleatorio[1];
  opcionB.textContent = grupoAleatorio[2];
  opcionC.textContent = grupoAleatorio[3];
  opcionD.textContent = grupoAleatorio[4];
  rightAnswer.textContent = grupoAleatorio[5];
  
  if (grupoAleatorio[6].startsWith("https")) {
    argument.innerHTML = ""
    let imageAnswer = document.createElement("img");
    argument.appendChild(imageAnswer);
    imageAnswer.src = grupoAleatorio[6];
    imageAnswer.alt = grupoAleatorio[6];
    imageAnswer.style.maxWidth = "100%";
    
  } else {
    argument.textContent = grupoAleatorio[6];
  };

  opcionA.name = 'answer';
  opcionB.name = 'answer';
  opcionC.name = 'answer';
  opcionD.name = 'answer';

  respuestaSection.setAttribute('hidden', 'true');
  radioOptions.forEach(function(option) {
    option.checked = false;
  });
}

function fetchData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, xhr.responseText);
      } else {
        callback(new Error('Failed to fetch data'));
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

fetchData('Recursos/preguntasSeparadasPorNumeral.txt', function(err, data) {
  if (err) {
    console.error('Error fetching data:', err);
    return;
  }

  populateQuestionGroups(data);
  displayRandomQuestion();
});

siguientePreguntaButton.addEventListener('click', function() {
  displayRandomQuestion();
});