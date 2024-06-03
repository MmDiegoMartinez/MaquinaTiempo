window.onload = function() {
    var audio = document.getElementById("audio");
    
    // reinicia elaudio cada vez que termina
    function restartAudio() {
      audio.currentTime = 0; // Reinicia el audio al principio
      audio.play(); // Reproduce el audio nuevamente
    }
    
    audio.addEventListener('ended', restartAudio);

    audio.play();
  }