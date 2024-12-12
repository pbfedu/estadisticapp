document.addEventListener('DOMContentLoaded', () => {
    const colors = ["Vermell", "Blau", "Verd", "Groc"];
    const shuffledColors = generateRandomColors(colors, 12);
    const personasContainer = document.querySelector('.personas');
    const tablaBody = document.querySelector('.tabla-frecuencias tbody');
    const totalAbsolutaEl = document.getElementById('total-absoluta');
    const totalRelativaEl = document.getElementById('total-relativa');
    const totalPorcentajeEl = document.getElementById('total-porcentaje');
    const mainContainer = document.querySelector('.container');
  
    let totalEntrevistados = 0;
  
    // Generar íconos de personas
    shuffledColors.forEach((color, index) => {
      const persona = document.createElement('div');
      persona.classList.add('persona');
      persona.dataset.color = color;
      persona.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
        </svg>`;
      personasContainer.appendChild(persona);
  
      persona.addEventListener('click', () => entrevistarPersona(persona));
    });
  
    // Función para entrevistar una persona
    function entrevistarPersona(persona) {
      const color = persona.dataset.color;
      alert(`El meu color preferit és el ${color}`);
      persona.remove();
  
      // Agregar a la tabla
      let fila = Array.from(tablaBody.rows).find(row => row.cells[0].textContent === color);
      if (!fila) {
        fila = tablaBody.insertRow();
        fila.insertCell(0).textContent = color;
        fila.insertCell(1).textContent = 0; // Freqüència absoluta
        fila.insertCell(2).textContent = "0.0"; // Freqüència relativa
        fila.insertCell(3).textContent = "0%"; // Percentatge
      }
  
      const absolutaCelda = fila.cells[1];
      absolutaCelda.textContent = parseInt(absolutaCelda.textContent) + 1;
  
      totalEntrevistados++;
      actualizarTotales();
  
      // Si se han entrevistado a todos, mostrar botón
      if (totalEntrevistados === shuffledColors.length) {
        mostrarBotonContinuar();
      }
    }
  
    // Actualizar totales
    function actualizarTotales() {
      const totalAbsoluta = totalEntrevistados;
      totalAbsolutaEl.textContent = totalAbsoluta;
  
      Array.from(tablaBody.rows).forEach(row => {
        const absoluta = parseInt(row.cells[1].textContent);
        const relativa = (absoluta / totalAbsoluta).toFixed(2);
        const porcentaje = (relativa * 100).toFixed(1) + "%";
        row.cells[2].textContent = relativa;
        row.cells[3].textContent = porcentaje;
      });
  
      totalRelativaEl.textContent = "1.0";
      totalPorcentajeEl.textContent = "100%";
    }
  
    // Generar colores aleatorios con al menos uno de cada color
    function generateRandomColors(colors, total) {
      const result = [];
      colors.forEach(color => result.push(color)); // Asegurar al menos uno de cada
      while (result.length < total) {
        result.push(colors[Math.floor(Math.random() * colors.length)]);
      }
      return result.sort(() => Math.random() - 0.5);
    }
  
    // Mostrar botón para continuar
    function mostrarBotonContinuar() {
      const boton = document.createElement('button');
      boton.textContent = "Següent";
      boton.classList.add('boton-continuar');
      boton.addEventListener('click', () => {
        window.location.href = 'https://pbfedu.github.io/estadisticapp/theory/5';
      });
  
      mainContainer.appendChild(boton);
    }
  });
    // Función para mostrar la información extendida
function mostrarInfo() {
    const info = document.getElementById("informacionExpandida");
    info.classList.toggle("oculto"); // Alterna la visibilidad de la sección
  }
