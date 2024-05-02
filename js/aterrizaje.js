function aterrizarMaquina() {
    reproducirAudio();
    var viajante = document.getElementById('viajante');
    viajante.setAttribute('visible', false); // Oculta el viajante al inicio

    // var maquina = document.getElementById('maquina-completa');

    var maquina1 = document.querySelector('[gltf-model="#parte1"]');
    var maquina2 = document.querySelector('[gltf-model="#parte2"]');
    var maquina3 = document.querySelector('[gltf-model="#parte3"]');
    var maquina4 = document.querySelector('[gltf-model="#parte4"]');

    var alturaInicial = 0.4; // Altura inicial de las partes de la máquina del tiempo
    var alturaFinal = -1.35; // Altura final de las partes de la máquina del tiempo

    // funcion para mover la maquina del tiempo y al viajante al mismo tiempo
    var partesMaquina = [maquina1, maquina2, maquina3, maquina4]; // Array de las partes de la máquina del tiempo
    // Recursivamente mueve las partes de la máquina del tiempo
    function moverParte(index) {
        var parteActual = partesMaquina[index];
        var posicionInicialParte = { x: 0, y: alturaInicial, z: 0 };
        var posicionFinalParte = { x: 0, y: alturaFinal, z: 0 };
        var duracionTotalParte = 500;
        var pasoParte = 10;
        var tiempoPasadoParte = 0;

        function mover() {
            var x = posicionInicialParte.x + (posicionFinalParte.x - posicionInicialParte.x) * (tiempoPasadoParte / duracionTotalParte);
            var y = posicionInicialParte.y + (posicionFinalParte.y - posicionInicialParte.y) * (tiempoPasadoParte / duracionTotalParte);
            var z = posicionInicialParte.z + (posicionFinalParte.z - posicionInicialParte.z) * (tiempoPasadoParte / duracionTotalParte);

            parteActual.setAttribute('position', x + ' ' + y + ' ' + z);

            tiempoPasadoParte += pasoParte;

            if (tiempoPasadoParte < duracionTotalParte) {
                setTimeout(mover, pasoParte);
            } else {
                // Cuando la parte actual ha alcanzado su altura máxima
                if (index < partesMaquina.length - 1) {
                    // Si no es la última parte, mover la siguiente parte después de un breve retraso
                    setTimeout(function() {
                        moverParte(index + 1);
                    }, 50);
                } else {
                    // Si es la última parte, hacer que el viajante aparezca y salga de la máquina del tiempo
                    viajante.setAttribute('visible', true);
                    salirDeNave(viajante);
                }
            }
        }

        // Comienza el movimiento de la parte actual
        mover();
    }

    // Comienza moviendo la primera parte
    moverParte(0);
}

// Función para que el viajante salga de la nave
function salirDeNave() {
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

function reproducirAudio() {
    var audio = document.getElementById('audio-maquina');
    audio.play();
}

// Llama a la función para iniciar el aterrizaje de la máquina del tiempo
aterrizarMaquina();
