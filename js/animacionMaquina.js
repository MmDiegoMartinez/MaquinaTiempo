function animarMovimiento(callback) {
    reproducirAudio();
    var viajante = document.getElementById('viajante');
    var maquina = document.getElementById('maquina-completa');
    var maquina1 = document.querySelector('[gltf-model="#parte1"]');
    var maquina2 = document.querySelector('[gltf-model="#parte2"]');
    var maquina3 = document.querySelector('[gltf-model="#parte3"]');
    var maquina4 = document.querySelector('[gltf-model="#parte4"]');
    var posicionInicialViajante = { x: 0, y: 0, z: 0 }; // posicion inicial del viajante
    var posicionIntermediaViajante = { x: 3, y: 0.5, z: 1.5 }; // Posicion intermedia del viajante
    var posicionFinalViajante = { x: 3, y: 2, z: 1.5 }; // posicion final del viajante
    var duracionTotalViajante = 3000; // duracion del movimiento del viajante esto en milisegundos
    var pasoViajante = 10; // intervalo de tiempo entre cada paso del viajante en milisegundos
    var tiempoPasadoViajante = 0;

    // funcion para poder mover al viajante
    function moverViajante() {
        // Calcula la posicion actual del viajante
        var x = posicionInicialViajante.x + (posicionIntermediaViajante.x - posicionInicialViajante.x) * (tiempoPasadoViajante / duracionTotalViajante);
        var y = posicionInicialViajante.y + (posicionIntermediaViajante.y - posicionInicialViajante.y) * (tiempoPasadoViajante / duracionTotalViajante);
        var z = posicionInicialViajante.z + (posicionIntermediaViajante.z - posicionInicialViajante.z) * (tiempoPasadoViajante / duracionTotalViajante);

        // Se actualiza la posicion del viajante
        viajante.setAttribute('position', x + ' ' + y + ' ' + z);

        // Aumenta el tiempo pasado del viajante
        tiempoPasadoViajante += pasoViajante;

        // si el tiempo pasado del viajante es menor que la duracion total, sigue moviendo
        if (tiempoPasadoViajante < duracionTotalViajante) {
            setTimeout(moverViajante, pasoViajante);
        } else {
            // Cuando el viajante alcanza su posicion final, comienza a mover la maquina del tiempo
            moverMaquina(callback);
        }
    }

    // funcion para mover la maquina del tiempo y al viajante al mismo tiempo
    function moverMaquina(callback) {
        var posicionInicialMaquina = { x: 0, y: 3, z: -5 }; // posicion inicial de la maquina del tiempo
        var posicionFinalMaquina = { x: 0, y: 20, z: -5 }; // posicion final de la maquina del tiempo
        var duracionTotalMaquina = 3000; // Duracion total del movimiento de la maquina del tiempo en milisegundos
        var pasoMaquina = 10; // Intervalo de tiempo entre cada paso de la maquina del tiempo en milisegundos
        var tiempoPasadoMaquina = 0;

        // funcion para mover la maquina del tiempo
        function mover() {
            // Calcula la posicion actual de la maquina del tiempo
            var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
            var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
            var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);

            // Actualiza la posicion de la maquina del tiempo
            maquina.setAttribute('position', x + ' ' + y + ' ' + z);

            // Calcula la posicion actual del viajante
            var vy = posicionFinalViajante.y + (20 - posicionFinalViajante.y) * (tiempoPasadoMaquina / duracionTotalMaquina);

            // Actualiza la posicion del viajante
            viajante.setAttribute('position', posicionFinalViajante.x + ' ' + vy + ' ' + posicionFinalViajante.z);

            // Incrementa el tiempo pasado de la maquina del tiempo
            tiempoPasadoMaquina += pasoMaquina;

            // Si el tiempo pasado de la maquina del tiempo es menor que la duración total, sigue moviendo
            if (tiempoPasadoMaquina < duracionTotalMaquina) {
                setTimeout(mover, pasoMaquina);
            } else {
                // Cuando la maquina del tiempo llega a su posicion final, desaparece junto con el viajante
                desvanecerElemento(maquina);
                desvanecerElemento(viajante);
               
            }
        }
        //AQUI EMPIZA LA ANIMACION DE ANIMAR POR ROTACION 
        function moverotacion() {
            viajante.setAttribute('visible', 'false');
            // Calcula la posicion actual de la maquina del tiempo
            var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
            var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
            var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);
            // Aplica la rotación en forma de espiral
            var rotationY = 360 * (tiempoPasadoMaquina / duracionTotalMaquina);
            var rotationZ = 360 * (tiempoPasadoMaquina / duracionTotalMaquina);

            maquina.setAttribute('position', x + ' ' + y + ' ' + z);
            maquina.setAttribute('rotation', '0 ' + rotationY + ' ' + rotationZ);

            // Incrementa el tiempo pasado de la maquina del tiempo
            tiempoPasadoMaquina += pasoMaquina;

            // Si el tiempo pasado de la maquina del tiempo es menor que la duración total, sigue moviendo
            if (tiempoPasadoMaquina < duracionTotalMaquina) {
                setTimeout(moverotacion, pasoMaquina);
            } else {
                // Cuando la maquina del tiempo llega a su posicion final, desaparece junto con el viajante
                desvanecerElemento(maquina);
                desvanecerElemento(viajante);
            }
        }

        var partesMaquina = [maquina1, maquina2, maquina3, maquina4]; // Array de las partes de la máquina del tiempo
        var alturaMaxima = 0.3; // Altura máxima a la que llegarán las partes

        // Recursivamente mueve las partes de la máquina del tiempo
        function moverParte(index) {
            viajante.setAttribute('visible', false);
            var parteActual = partesMaquina[index];
            var posicionInicialParte = { x: 0, y: -0.85, z: 0 };
            var posicionFinalParte = { x: 0, y: alturaMaxima, z: 0 };
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
                    // Cuando la parte actual ha alcanzado su altura máxima
                    if (index < partesMaquina.length - 1) {
                        // Si no es la última parte, mover la siguiente parte después de un breve retraso
                        setTimeout(function() {
                            moverParte(index + 1);
                        }, 50);
                    } else {
                        // Si es la última parte, desaparecer elementos después de un breve retraso
                        setTimeout(function() {
                            desvanecerElemento(maquina1);
                            desvanecerElemento(maquina2);
                            desvanecerElemento(maquina3);
                            desvanecerElemento(maquina4);
                            desvanecerElemento(viajante);
                        }, 50);
                    }
                }
            }

            // Comienza el movimiento de la parte actual
            moverp();
        }
        
        var animacionSeleccionada = localStorage.getItem('animacionSeleccionada');

    
        animacionSeleccionada = parseInt(animacionSeleccionada, 10);
        if (animacionSeleccionada < 10) {  // 10% de probabilidad para 1
            mover();
        } else if (animacionSeleccionada < 55) {  // 45% de probabilidad para 2 (10% + 45% = 55%)
            moverotacion();
        } else {  // 45% de probabilidad para 3 (el resto hasta 100%)
            moverParte(0);
        }
    }

    // funcion para desvanecer un elemento gradualmente y mostrar un destello de luz
    function desvanecerElemento(elemento) {
        
        var opacidad = 1;
        var pasoDesvanecimiento = 0.05;
        var duracionDesvanecimiento = 1000;
        var destello = document.createElement('a-entity');
        destello.setAttribute('geometry', 'primitive: sphere; radius: 0.1');
        destello.setAttribute('material', 'color: white; opacity: 0; transparent: true');
        elemento.appendChild(destello);

        // funcion que reduce gradualmente la opacidad del elemento y aumentar el tamaño del destello
        function desvanecer() {
            opacidad -= pasoDesvanecimiento;
            elemento.setAttribute('opacity', opacidad);
            destello.setAttribute('material', 'opacity', (1 - opacidad));
            destello.setAttribute('scale', { x: 1/opacidad, y: 1/opacidad, z: 1/opacidad });

            if (opacidad > 0) {
                setTimeout(desvanecer, duracionDesvanecimiento * pasoDesvanecimiento);
                
            } else {
                elemento.setAttribute('visible', false); // no sea visible
                var audio = document.getElementById('audio-maquina');
                audio.pause();
                audio.currentTime = 0; // Reinicia el audio al principio para la próxima reproducción
                callback(); // Llama al callback despues de que el destello se desvanezca
                
            }
            
        }
        
        // Comienza el desvanecimiento
        desvanecer();
    }

    // Comienza el movimiento del viajante
    moverViajante();
}

function reproducirAudio() {
    var audio = document.getElementById('audio-maquina');
   
    audio.play();
}

// Llama a la funcion para iniciar la animación del movimiento del viajante y la maquina del tiempo
animarMovimiento(function() {
    // Redirige a la página 'viajando.html' con el valor del formulario
    const selectElement = document.getElementById('anio');
    const selectedValue = selectElement.value;
    window.location.href = "viajando.html?anio=" + encodeURIComponent(selectedValue);
});