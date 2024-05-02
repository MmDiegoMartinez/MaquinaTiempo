function aterrizarMaquina() {
    reproducirAudio();

    var viajante = document.getElementById('viajante');
    viajante.setAttribute('visible', false); // Oculta el viajante al inicio
    var maquina = document.querySelector('[gltf-model="#maquina-modelo"]');
    
    var posicionInicialMaquina = { x: 0, y: 31, z: -5 }; // posición inicial de la máquina del tiempo
    var posicionFinalMaquina = { x: 0, y: 3, z: -5 }; // posición final de la máquina del tiempo
    var duracionTotalMaquina = 3000; // Duración total del movimiento de la máquina del tiempo en milisegundos
    var pasoMaquina = 10; // Intervalo de tiempo entre cada paso de la máquina del tiempo en milisegundos
    var tiempoPasadoMaquina = 0;

    // Función para mover la máquina del tiempo
    function mover() {
        // Calcula la posición actual de la máquina del tiempo
        var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);
        // Aplica la rotación en forma de espiral
        var rotationY = 360 * (tiempoPasadoMaquina / duracionTotalMaquina);
        var rotationZ = 360 * (tiempoPasadoMaquina / duracionTotalMaquina);

        maquina.setAttribute('position', x + ' ' + y + ' ' + z);
        maquina.setAttribute('rotation', '0 ' + rotationY + ' ' + rotationZ);

        // Incrementa el tiempo pasado de la máquina del tiempo
        tiempoPasadoMaquina += pasoMaquina;

        // Si el tiempo pasado de la máquina del tiempo es menor que la duración total, sigue moviendo
        if (tiempoPasadoMaquina < duracionTotalMaquina) {
            setTimeout(mover, pasoMaquina);
        } else {
            viajante.setAttribute('visible', true);
            salirDeNave(viajante);   
        }
    }

    // Comienza el movimiento de la máquina del tiempo
    mover();

    // Función para desvanecer un elemento gradualmente y mostrar un destello de luz
    function salirDeNave() {
        var duracionSalida = 2000; // Duración de la animación de salida en milisegundos
        var pasos = 100; // Número de pasos para la animación
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
    
        // Comienza la animación de salida
        moverSalida(1);
    }

    // Comienza el movimiento del viajante
    moverViajante();
}

function reproducirAudio() {
    var audio = document.getElementById('audio-maquina');
    audio.play();
}

aterrizarMaquina();
