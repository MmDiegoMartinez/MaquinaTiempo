
const quetzalcoatlus = document.getElementById('quet');

//  variables para la posicion inicia  el radio del circulo y el angulo inicial
let inicialX = 3;
let inicialZ = 10;
let radio = 5; // Radio del circulo
let angulo = 0; // angulo inicial

// Funcion para animar le vuelo
function animarVuelo() {
    // calcular x y x en  funcion del angulo
    let x = inicialX + radio * Math.cos(angulo);
    let z = inicialZ + radio * Math.sin(angulo);

    //Aplicar la nueva posicion del elemento
    quetzalcoatlus.setAttribute('position', `${x} 5 ${z}`);

    // Incrementar el angulo para avanzar en el círculo
    angulo += 0.01; //velocidad de vuelo

    // llamarlo nuevamntente en el siguiente cuadro de animacion
    requestAnimationFrame(animarVuelo);
}

// iniciar la animacion al cargar la pagina
window.onload = animarVuelo;
