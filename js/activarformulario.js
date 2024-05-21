function handleFormSubmit(event) {
    event.preventDefault(); //Evita que el formulario haga lo que normalmente hace automaticamente
  
    if (animacionEnCurso) return; // No hacer nada si una animación está en curso
    const selectElement = document.getElementById('anio');
    const selectedValue = selectElement.value;
  
    console.log('Valor seleccionado:', selectedValue);
  
    // se checa si el formulario se envio de manera correcta
    if (selectedValue !== "") {
      // ejecutar la animacion solo si se envio correctamente el formulario
      const scriptElement = document.createElement('script');
      scriptElement.src = "js/animacionMaquina.js";
      // poner el script al final de la pagina
      document.body.appendChild(scriptElement);
    }
  }