const fs = require('fs')
import {promises as fsPromises} from 'fs';
let preguntas = 'Recursos/preguntasSeparadasPorNumeral.txt'
var grupos = [];
var grupoAleatorio
var elementos

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
    