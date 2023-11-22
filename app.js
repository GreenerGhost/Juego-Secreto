/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Juego del número secreto';
let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10';
*/
let numeroSecreto = 0;
let intentos = 0;
let intentosMaximos = 10;
let maximoNumeros = 10;
let listaNumerosSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    if (intentos  == 10) {
        alert('Has sobrepasado el número máximo de intentos, refresca la página para volver a intentarlo');
        document.querySelector('.container__boton').setAttribute('disabled','true');
    } else {
        let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
        if(numeroSecreto === numeroDeUsuario) {
            // El usuario acertó el número y se muestra el número de intentos
            asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
            // Activación de botón Nuevo Juego, getElementById espera un id de HTML, no se debe usar el #, a removeAttribute se le indica que elemento se desea remover
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            // El usuario no acertó el número
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', `El número secreto es menor que ${numeroDeUsuario}`);
            } else {
                asignarTextoElemento('p', `El número secreto es mayor que ${numeroDeUsuario}`);
            }
            intentos++;
            // Limpieza de caja
            limpiarCaja();
        }
        return;
    }
}

function limpiarCaja() {
    // Se hace una selección por id, indicando con el símbolo #, despúes se limpia el valor de la caja.
    /*let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';*/
    document.querySelector('#valorUsuario').value = '';
}

// Función recursiva para verificar repetición de números generados
function generarNumeroSecreto() {
    let numeroGenerado = parseInt(Math.random() * maximoNumeros) + 1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    // Si ya se generaron todos los números
    if (listaNumerosSorteados.length == maximoNumeros) {
        asignarTextoElemento('p', 'Ya se generaron todos los números posibles sin repetir');
        document.querySelector('.container__boton').setAttribute('disabled','true');
        alert('Recargue la página para volver a jugar');
    } else {
        // Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${maximoNumeros}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    // Limpiar caja, indicar mensaje de números, generar número aleatorio, deshabilitar botón
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();
