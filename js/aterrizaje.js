function aterrizarMaquina() {
    reproducirAudio();
    var viajante = document.getElementById('viajante');
    var maquina = document.getElementById('maquina-completa');
    var posicionInicialMaquina = { x: 0, y: 20, z: -5 }; // posicion inicial de la maquina del tiempo
    var posicionFinalMaquina = { x: 0, y: 3, z: -5 }; // posicion final de la maquina del tiempo
    var duracionTotalMaquina = 3000; // duracion total del movimiento de la maquina del tiempo en milisegundos
    var pasoMaquina = 10; // Intervalo de tiempo entre cada paso de la maquina del tiempo en milisegundos
    var tiempoPasadoMaquina = 0;

    var maquina1 = document.querySelector('[gltf-model="#parte1"]');
    var maquina2 = document.querySelector('[gltf-model="#parte2"]');
    var maquina3 = document.querySelector('[gltf-model="#parte3"]');
    var maquina4 = document.querySelector('[gltf-model="#parte4"]');

    // funcion para mover la maquina del tiempo y el viajante al mismo tiempo
    function moverMaquina() {
        // Calcula la posicion actual de la maquina del tiempo
        var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);

        // Calcular la posicion actual del viajante
        var vy = 20 + (3 - 20) * (tiempoPasadoMaquina / duracionTotalMaquina);

        // Actualiza la posicion de la maquina del tiempo
        maquina.setAttribute('position', x + ' ' + y + ' ' + z);

        // Actualiza la posicion del viajante
        viajante.setAttribute('position', '3 ' + vy + ' 1.5');

        // Incrementa el tiempo pasado de la maquina del tiempo
        tiempoPasadoMaquina += pasoMaquina;

        // Si el tiempo pasado de la maquina del tiempo es menor que la duracion total, sigue moviendo
        if (tiempoPasadoMaquina < duracionTotalMaquina) {
            setTimeout(moverMaquina, pasoMaquina);
        } else {
            // Cuando la maquina del tiempo llega a su posicion final, el viajante sale de la nave
            salirDeNave();
        }
    }


    function moverotacion() {
        viajante.setAttribute('visible', false);
        var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var rotationY = 360 * (tiempoPasadoMaquina / duracionTotalMaquina);
        var rotationZ = 360 * (tiempoPasadoMaquina / duracionTotalMaquina);

        maquina.setAttribute('position', x + ' ' + y + ' ' + z);
        maquina.setAttribute('rotation', '0 ' + rotationY + ' ' + rotationZ);
        tiempoPasadoMaquina += pasoMaquina;

        if (tiempoPasadoMaquina < duracionTotalMaquina) {
            setTimeout(moverotacion, pasoMaquina);
        } else {
            salirDeNave();
        }
    }
    //Funcion de animacion por partes :
    var alturaInicial = 0.1; // Altura inicial de las partes de la maquina del tiempo
    var alturaFinal = -0.85; // Altura final de las partes de la maquina del tiempo

    var partesMaquina = [maquina1, maquina2, maquina3, maquina4]; // Array de las partes de la máquina del tiempo
    // Recursivamente mueve las partes de la maquina del tiempo

    function moverParte(index) {
        viajante.setAttribute('visible', false);
        var parteActual = partesMaquina[index];
        var posicionInicialParte = { x: 0, y: alturaInicial, z: 0 };
        var posicionFinalParte = { x: 0, y: alturaFinal, z: 0 };
        var duracionTotalParte = 1000;
        var pasoParte = 10;
        var tiempoPasadoParte = 0;

        function moverp() {
            var x = posicionInicialParte.x + (posicionFinalParte.x - posicionInicialParte.x) * (tiempoPasadoParte / duracionTotalParte);
            var y = posicionInicialParte.y + (posicionFinalParte.y - posicionInicialParte.y) * (tiempoPasadoParte / duracionTotalParte);
            var z = posicionInicialParte.z + (posicionFinalParte.z - posicionInicialParte.z) * (tiempoPasadoParte / duracionTotalParte);

            parteActual.setAttribute('position', x + ' ' + y + ' ' + z);
            tiempoPasadoParte += pasoParte;

            if (tiempoPasadoParte < duracionTotalParte) {
                setTimeout(moverp, pasoParte);
            } else {
                if (index > 0) {
                    // Mover la siguiente parte después de un breve retraso
                    setTimeout(function() {
                        moverParte(index - 1);
                    }, 50);
                } else {
                    // Si es la última parte (index == 0), hacer que el viajante aparezca y salga de la máquina del tiempo
                    viajante.setAttribute('visible', true);
                    salirDeNave(viajante);
                }
            }
        }

        // Comienza el movimiento de la parte actual
        moverp();
    }
    // genera nuemro aleatorio del 1 al 99
    var rand = Math.floor(Math.random() * 100);
    localStorage.setItem('animacionSeleccionada', rand);
    // eligir una funcion basado en probablidad
    if (rand < 10) { // 10% de probabilidad para 1
        moverMaquina();
    } else if (rand < 55) { // 45% de probabilidad para 2 (10% + 45% = 55%)
        moverotacion();
    } else { // 45% de probabilidad para 3 (el resto hasta 100%)
        moverParte(3);
    }


    // funcion para que el viajante salga de la nave
    function salirDeNave() {
        viajante.setAttribute('visible', true);
        var duracionSalida = 2000; // duracion de la animacion de salida en milisegundos
        var pasos = 100; // numero de pasos para la animacion
        var pasoX = (0 - 3) / pasos; // Paso en el eje X
        var pasoY = (0 - 0) / pasos; // Paso en el eje Y
        var pasoZ = (0 - 1.5) / pasos; // Paso en el eje Z
    

        function moverSalida(paso) {
            if (paso <= pasos) {
                var x = 3 + paso * pasoX;
                var y = 0 + paso * pasoY;
                var z = 1.5 + paso * pasoZ;
                viajante.setAttribute('position', x + ' ' + y + ' ' + z);
                setTimeout(function() {
                    moverSalida(paso + 1);
                }, duracionSalida / pasos);
            } else {
                
                var audio = document.getElementById('audio-maquina');
                audio.pause();
                audio.currentTime = 0; // Reinicia el audio al principio para la próxima reproducción
            }
        }
    
        // se Comienza la animacion de salida
        moverSalida(1);
    }

    // Comienza el movimiento de la maquina del tiempo
    
}

function reproducirAudio() {
    var audio = document.getElementById('audio-maquina');
   
    audio.play();
}

// Llama a la funcion para iniciar el aterrizaje de la maquina del tiempo
aterrizarMaquina();
