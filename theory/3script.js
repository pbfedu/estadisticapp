// Cargar ejemplos dinámicos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    generarEjemploContinua();
    generarEjemploDiscreta();
    generarEjemploCualitativa();
  });
  
  function generarEjemploContinua() {
    const contenedor = document.getElementById("continua");
  
    // Ejemplo 1: Altura
    const altura = (Math.random() * (1.78 - 1.62) + 1.62).toFixed(2);
    const alturaHTML = `
      <div class="barra-vertical">
        <div class="relleno" style="height: ${(altura / 2) * 100}%;"></div>
      </div>
      <p class="texto">Mesuro ${altura} cm.</p>
    `;
  
    // Ejemplo 2: Duración
    const duracion = (Math.random() * (1.5 - 1.1) + 1.1).toFixed(2);
    const duracionHTML = `
      <div class="reloj">
        <div class="relleno-reloj" style="clip-path: circle(${(duracion / 1.5) * 50}% at 50% 50%);"></div>
      </div>
      <p class="texto">La pel·lícula dura ${duracion} hores.</p>
    `;
  
    contenedor.innerHTML = alturaHTML + duracionHTML;
  }
  
  function generarEjemploDiscreta() {
    const contenedor = document.getElementById("discreta");
  
    // Ejemplo 1: Número de hijos
    const hijos = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
    const hijosHTML = `
      <div class="barra-horizontal">
        <div class="relleno" style="width: ${(hijos / 7) * 100}%;"></div>
      </div>
      <p class="texto">La família té ${hijos} fills.</p>
    `;
  
    // Ejemplo 2: Edad
    const edad = Math.floor(Math.random() * (50 - 15 + 1)) + 15;
    const edadHTML = `
      <div class="barra-horizontal">
        <div class="relleno" style="width: ${(edad / 70) * 100}%;"></div>
      </div>
      <p class="texto">Acabo de fer ${edad} anys.</p>
    `;
  
    contenedor.innerHTML = hijosHTML + edadHTML;
  }
  
  function generarEjemploCualitativa() {
    const contenedor = document.getElementById("cualitativa");
  
    // Ejemplo 1: Color de ojos
    const colores = ["Marró", "Blau", "Verd", "Gris"];
    const color = colores[Math.floor(Math.random() * colores.length)];
    const colorHTML = `<p class="texto">Tinc els ulls de color ${color}.</p>`;
  
    // Ejemplo 2: Ciudad de residencia
    const ciudades = ["Barcelona", "Molins de Rei", "Sant Feliu", "Papiol", "Pallejà", "Corbera"];
    const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
    const residenciaHTML = `<p class="texto">Fa ${Math.floor(Math.random() * (5 - 2 + 1) + 2)} anys que visc a ${ciudad}.</p>`;
  
    contenedor.innerHTML = colorHTML + residenciaHTML;
  }
  // Función para mostrar la información extendida
function mostrarInfo() {
    const info = document.getElementById("informacionExpandida");
    info.classList.toggle("oculto"); // Alterna la visibilidad de la sección
  }
    
