const fs = require('fs')
let grupos = [];
let grupoAleatorio


    fs.readFile('Recursos/preguntasSeparadasPorNumeral.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        
        let elementos = data.split('#').filter(elemento => elemento.trim() !== '');
        
        for (let i = 0; i < elementos.length; i += 7) {
            grupos.push(elementos.slice(i, i + 7));
        }
        
        grupoAleatorio = grupos[Math.floor(Math.random() * grupos.length)];
        console.log(grupoAleatorio)
    });
