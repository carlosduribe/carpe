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
  
  const contentParts = grupoAleatorio[0].split(' ');
  const lastPart = contentParts.pop(); // Obtener la última parte

  // Verificar si la última parte es un enlace
  if (lastPart.startsWith("http")) {
      // Crear elementos para texto e imagen
      const textSpan = document.createElement('span');
      textSpan.textContent = contentParts.join(' '); // Texto sin el enlace

      const image = document.createElement('img');
      image.src = lastPart;
      image.alt = 'Imagen de la pregunta'; // Asegúrate de proporcionar un texto alternativo adecuado
      image.style.maxWidth = '100%'; // Ajustar el tamaño de la imagen si es necesario

      // Limpiar el contenido actual y agregar los nuevos elementos
      questionStatement.innerHTML = ''; 
      questionStatement.appendChild(textSpan);
      questionStatement.appendChild(image);
  } else {
      // Si no hay enlace, mostrar el texto completo
      questionStatement.textContent = grupoAleatorio[0];
  }
;
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