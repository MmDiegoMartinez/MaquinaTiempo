
function animarpre() {
    // Obtener los elementos de las piernas de los jugadores del quipo 1
    brazoizq.setAttribute('position', '-3.4 1.5 -2');
    manoizq.setAttribute('position', '-3.4 1.3 -2');
    mangaizq.setAttribute('position', '-3.4 1.6 -2');
  

  setTimeout(function() {
    brazoizq.setAttribute('position', '-3.4 2.5 -2');
    manoizq.setAttribute('position', '-3.4 2.3 -2');
    mangaizq.setAttribute('position', '-3.4 2.6 -2');
   
  }, 500);
    
    // Repetir la animación cada segundo
    setTimeout(animarpre, 1000);
  }
  animarpre();