function animarMovimiento(callback) {
    var viajante = document.getElementById('viajante');
    var maquina = document.querySelector('[gltf-model="#maquina-modelo"]');
    var posicionInicialViajante = { x: 0, y: 0, z: 0 }; 
    var posicionIntermediaViajante = { x: 3, y: 0, z: 1.5 }; 
    var posicionFinalViajante = { x: 3, y: 2, z: 1.5 }; 
    var duracionTotalViajante = 3000; 
    var pasoViajante = 10; 
    var tiempoPasadoViajante = 0;

    
    function moverViajante() {
       
        var x = posicionInicialViajante.x + (posicionIntermediaViajante.x - posicionInicialViajante.x) * (tiempoPasadoViajante / duracionTotalViajante);
        var y = posicionInicialViajante.y + (posicionIntermediaViajante.y - posicionInicialViajante.y) * (tiempoPasadoViajante / duracionTotalViajante);
        var z = posicionInicialViajante.z + (posicionIntermediaViajante.z - posicionInicialViajante.z) * (tiempoPasadoViajante / duracionTotalViajante);

       
        viajante.setAttribute('position', x + ' ' + y + ' ' + z);

        
        tiempoPasadoViajante += pasoViajante;

        
        if (tiempoPasadoViajante < duracionTotalViajante) {
            setTimeout(moverViajante, pasoViajante);
        } else {
            
            moverMaquina(callback);
        }
    }

    
    function moverMaquina(callback) {
        var posicionInicialMaquina = { x: 0, y: 3, z: -5 }; 
        var posicionFinalMaquina = { x: 0, y: 15, z: -5 }; 
        var duracionTotalMaquina = 3000; 
        var pasoMaquina = 10; 
        var tiempoPasadoMaquina = 0;

        
        function mover() {
            // Calcula la posición actual de la máquina del tiempo
            var x = posicionInicialMaquina.x + (posicionFinalMaquina.x - posicionInicialMaquina.x) * (tiempoPasadoMaquina / duracionTotalMaquina);
            var y = posicionInicialMaquina.y + (posicionFinalMaquina.y - posicionInicialMaquina.y) * (tiempoPasadoMaquina / duracionTotalMaquina);
            var z = posicionInicialMaquina.z + (posicionFinalMaquina.z - posicionInicialMaquina.z) * (tiempoPasadoMaquina / duracionTotalMaquina);

           
            maquina.setAttribute('position', x + ' ' + y + ' ' + z);

            
            var vy = posicionFinalViajante.y + (15 - posicionFinalViajante.y) * (tiempoPasadoMaquina / duracionTotalMaquina);

            
            viajante.setAttribute('position', posicionFinalViajante.x + ' ' + vy + ' ' + posicionFinalViajante.z);

            
            tiempoPasadoMaquina += pasoMaquina;

            
            if (tiempoPasadoMaquina < duracionTotalMaquina) {
                setTimeout(mover, pasoMaquina);
            } else {
                
                desvanecerElemento(maquina);
                desvanecerElemento(viajante);
               
            }
        }

       
        mover();
    }

    
    function desvanecerElemento(elemento) {
        
        var opacidad = 1;
        var pasoDesvanecimiento = 0.05;
        var duracionDesvanecimiento = 1000;
        var destello = document.createElement('a-entity');
        destello.setAttribute('geometry', 'primitive: sphere; radius: 0.1');
        destello.setAttribute('material', 'color: white; opacity: 0; transparent: true');
        elemento.appendChild(destello);

        
        function desvanecer() {
            opacidad -= pasoDesvanecimiento;
            elemento.setAttribute('opacity', opacidad);
            destello.setAttribute('material', 'opacity', (1 - opacidad));
            destello.setAttribute('scale', { x: 1/opacidad, y: 1/opacidad, z: 1/opacidad });

            if (opacidad > 0) {
                setTimeout(desvanecer, duracionDesvanecimiento * pasoDesvanecimiento);
                
            } else {
                elemento.setAttribute('visible', false); 
                callback(); 
            }
            
        }
        
        
        desvanecer();
    }

    
    moverViajante();
}


animarMovimiento(function() {
    // Redirige a la página 'viajando.html' con el valor del formulario
    const selectElement = document.getElementById('anio');
    const selectedValue = selectElement.value;
    window.location.href = "viajando.html?anio=" + encodeURIComponent(selectedValue);
});
