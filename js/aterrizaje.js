function aterrizarMaquina() {
    var viajante = document.getElementById('viajante');
    var maquina = document.querySelector('[gltf-model="#maquina-modelo"]');
    reproducirAudio();


    // funcion para mover la maquina del tiempo y al viajante al mismo tiempo

    var posicionInicialMaquina = { x: 0, y: 15, z: -5 }; // posicion inicial de la maquina del tiempo
    var posicionFinalMaquina = { x: 0, y: 3, z: -5 }; // posicion final de la maquina del tiempo
    var duracionTotalMaquina = 3000; // Duracion total del movimiento de la maquina del tiempo en milisegundos
    var pasoMaquina = 10; // Intervalo de tiempo entre cada paso de la maquina del tiempo en milisegundos
    var tiempoPasadoMaquina = 0;

    /// Crear una matriz de clones de la máquina
    var clonesMaximo = 5;
    var clones = [];
    for (var i = 0; i < clonesMaximo; i++) {
        var clon = maquina.cloneNode(true);
        clon.setAttribute('visible', false);
        maquina.parentNode.appendChild(clon);
        clones.push(clon);
    }

    // funcion para mover la maquina del tiempo
    function mover() {
        // Calcula la posicion actual de la maquina del tiempo
        var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
        var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);

        // Actualizar la posición de la máquina principal
        maquina.setAttribute('position', `${x} ${y} ${z}`);

        var separacion = 6;
        var duracionUnion = 2000; // Duración en milisegundos para la unión gradual
        var pasoUnion = duracionUnion / (clones.length * pasoMaquina);

        if (tiempoPasadoMaquina < duracionTotalMaquina - duracionUnion) {
            for (var i = 0; i < clones.length; i++) {
                var offset = (i - (clones.length - 1) / 2) * separacion;
                clones[i].setAttribute('position', `${x} ${y + offset} ${z}`);
                clones[i].setAttribute('visible', true);
            }
        } else {
            var pasoActual = (tiempoPasadoMaquina - (duracionTotalMaquina - duracionUnion)) / pasoMaquina;
            for (var i = 0; i < clones.length; i++) {
                var offset = (i - (clones.length - 1) / 2) * separacion * (1 - pasoActual / pasoUnion);
                clones[i].setAttribute('position', `${x} ${y + offset} ${z}`);
                clones[i].setAttribute('visible', true);
            }
        }

        // Calcular la posicion actual del viajante
        var vy = 15 + (3 - 15) * (tiempoPasadoMaquina / duracionTotalMaquina);

        // Actualiza la posicion del viajante
        viajante.setAttribute('position', '3 ' + vy + ' 1.5');

        // Incrementa el tiempo pasado de la maquina del tiempo
        tiempoPasadoMaquina += pasoMaquina;

        // Si el tiempo pasado de la maquina del tiempo es menor que la duración total, sigue moviendo
        if (tiempoPasadoMaquina < duracionTotalMaquina) {
            setTimeout(mover, pasoMaquina);
        } else {
            // Unir los clones con la máquina principal
            for (var i = 0; i < clones.length; i++) {
                clones[i].setAttribute('visible', false);
            }
            salirDeNave();
        }
    }

    // Comienza el movimiento de la maquina del tiempo
    mover();

    // funcion para que el viajante salga de la nave
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

}
function reproducirAudio() {
    var audio = document.getElementById('audio-maquina');
   
    audio.play();
}

aterrizarMaquina();
