function animarpre(brazo, mano, manga) {
    brazo.setAttribute('position', '-3.4 1.5 -2');
    brazo.setAttribute('rotation', '0 190 0');
    mano.setAttribute('position', '-3.4 1.3 -2');
    manga.setAttribute('position', '-3.4 1.6 -2');
    manga.setAttribute('rotation', '0 -90 0');
    setTimeout(function () {
        brazo.setAttribute('position', '-3.4 1.8 -2');
        brazo.setAttribute('rotation', '0 190 -45');
        mano.setAttribute('position', '-3.6 2 -2');
        manga.setAttribute('position', '-3.35 1.7 -2');
        manga.setAttribute('rotation', '40 -90 0');
    }, 500);
    // repetir la animacion cada 1000 ms
    setTimeout(function () {
        animarpre(brazo, mano, manga);
    }, 1000);
}

// aplica animacion alhmano principal
function aplicarAnimacionPrincipal() {
    var brazoPrincipal = document.getElementById('brazoizq');
    var manoPrincipal = document.getElementById('manoizq');
    var mangaPrincipal = document.getElementById('mangaizq');

    animarpre(brazoPrincipal, manoPrincipal, mangaPrincipal);
}

// Aplicar animacion al humano principal
aplicarAnimacionPrincipal();

// Clonar el modelo principal y aplicar animacion a los clones
document.addEventListener('DOMContentLoaded', function () {
    var humanoOriginal = document.getElementById('humanoOriginal');
    var scene = document.querySelector('a-scene');

    var coordenadas = [
        { x: -5, y: 0, z: 6 },
        { x: 10, y: 0, z: -2 },
        { x: 2, y: 0, z: 8 },
        { x: -4, y: 0, z: -5 },
        { x: -8, y: 0, z: 4 }
    ];

    for (var i = 0; i < coordenadas.length; i++) {
        var humanoClon = humanoOriginal.cloneNode(true);
        humanoClon.setAttribute('position', coordenadas[i].x + ' ' + coordenadas[i].y + ' ' + coordenadas[i].z);
        scene.appendChild(humanoClon);
        var brazo = humanoClon.querySelector('#brazoizq');
        var mano = humanoClon.querySelector('#manoizq');
        var manga = humanoClon.querySelector('#mangaizq');
        animarpre(brazo, mano, manga);
    }
});




function animarMamut() {
    var mamut = document.querySelector('[gltf-model="#mamut"]');
    mamut.setAttribute('position', '0 3 8');
    mamut.setAttribute('rotation', '0 85 45');

    setTimeout(function() {
        // Regresar el mamut a su posición y rotación inicial después de un segundo
        mamut.setAttribute('position', '0 2 8');
        mamut.setAttribute('rotation', '0 85 0');

        // Llamar a la función de animacion otra v ez despues de los cuatrro segundos
        setTimeout(animarMamut, 3000);
    }, 4000); // esperar cuatro segundos antes de mover el mamut a la nueva posición y rotación
}

// llamar a la funcion pata iniciar la animacion dek mamut
animarMamut();
