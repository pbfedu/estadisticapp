document.addEventListener('DOMContentLoaded', () => {
    const animals = ["0", "1", "2", "3"];
    const personasContainer = document.querySelector('.personas');
    const tablaBody = document.querySelector('.tabla-frecuencias tbody');
    const totalAbsolutaEl = document.getElementById('total-absoluta');
    const totalRelativaEl = document.getElementById('total-relativa');
    const totalPorcentajeEl = document.getElementById('total-porcentaje');
    let respuestas = { "0": 0, "1": 0, "2": 0, "3": 0 };
    let entrevistados = 0;
  
    // Generar personas
    for (let i = 0; i < 12; i++) {
      const persona = document.createElement('div');
      persona.classList.add('persona');
      persona.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
        </svg>`;
      persona.dataset.animal = animals[Math.floor(Math.random() * animals.length)];
      personasContainer.appendChild(persona);
  
      persona.addEventListener('click', () => entrevistar(persona));
    }
  
    // Entrevistar
    function entrevistar(persona) {
      const animal = persona.dataset.animal;
      alert(`Tinc ${animal} animals a casa`);
      respuestas[animal]++;
      entrevistados++;
      persona.remove();
  
      actualizarTabla();
      if (entrevistados === 12) {
        desbloquearCampos();
      }
    }
  
    // Actualizar Tabla
    function actualizarTabla() {
      tablaBody.innerHTML = '';
      Object.keys(respuestas).forEach(animal => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${animal}</td>
          <td>${respuestas[animal]}</td>
          <td><input type="number" step="0.001" data-animal="${animal}" class="input-relativa" disabled /></td>
          <td><input type="number" step="0.001" data-animal="${animal}" class="input-porcentaje" disabled /></td>
        `;
        tablaBody.appendChild(fila);
      });
  
      const total = Object.values(respuestas).reduce((sum, val) => sum + val, 0);
      totalAbsolutaEl.textContent = total;
    }
  
    // Desbloquear Campos
    function desbloquearCampos() {
      const inputsRelativa = document.querySelectorAll('.input-relativa');
      const inputsPorcentaje = document.querySelectorAll('.input-porcentaje');
  
      inputsRelativa.forEach(input => input.disabled = false);
      inputsPorcentaje.forEach(input => input.disabled = false);
  
      inputsRelativa.forEach(input => input.addEventListener('input', validarRelativa));
      inputsPorcentaje.forEach(input => input.addEventListener('input', validarPorcentaje));
    }
  
    // Validar Relativa
    function validarRelativa() {
      const total = parseFloat(totalAbsolutaEl.textContent);
      const inputsRelativa = document.querySelectorAll('.input-relativa');
      let todasCorrectas = true;
  
      inputsRelativa.forEach(input => {
        const animal = input.dataset.animal;
        const valor = parseFloat(input.value);
        const relativaCorrecta = respuestas[animal] / total;
  
        if (Number.isFinite(relativaCorrecta)) {
          const tolerancia = Math.abs(valor - relativaCorrecta);
  
          // Tolerancia para valores con más de 2 decimales
          if (relativaCorrecta.toString().split('.')[1]?.length <= 2) {
            if (valor === parseFloat(relativaCorrecta.toFixed(3))) {
              input.style.backgroundColor = "green";
              input.disabled = true; // Bloquea el campo una vez correcto
            } else {
              input.style.backgroundColor = "red";
              todasCorrectas = false;
            }
          } else {
            if (tolerancia <= 0.001) {
              input.style.backgroundColor = "green";
              input.disabled = true;
            } else {
              input.style.backgroundColor = "red";
              todasCorrectas = false;
            }
          }
        }
      });
  
      if (todasCorrectas) {
        sumarRelativa();
        validarBotonContinuar();
      }
    }
  
    // Validar Porcentaje
    function validarPorcentaje() {
      const inputsPorcentaje = document.querySelectorAll('.input-porcentaje');
      const total = parseFloat(totalAbsolutaEl.textContent);
      let todasCorrectas = true;
  
      inputsPorcentaje.forEach(input => {
        const animal = input.dataset.animal;
        const relativaCorrecta = respuestas[animal] / total;
        const porcentajeCorrecto = (relativaCorrecta * 100).toFixed(3);
        const valor = parseFloat(input.value);
  
        const tolerancia = Math.abs(valor - parseFloat(porcentajeCorrecto));
  
        if (Number.isFinite(parseFloat(porcentajeCorrecto))) {
          if (porcentajeCorrecto.toString().split('.')[1]?.length <= 2) {
            if (valor === parseFloat(porcentajeCorrecto)) {
              input.style.backgroundColor = "green";
              input.disabled = true; // Bloquea el campo una vez correcto
            } else {
              input.style.backgroundColor = "red";
              todasCorrectas = false;
            }
          } else {
            if (tolerancia <= 0.1) {
              input.style.backgroundColor = "green";
              input.disabled = true;
            } else {
              input.style.backgroundColor = "red";
              todasCorrectas = false;
            }
          }
        }
      });
  
      if (todasCorrectas) {
        sumarPorcentaje();
        validarBotonContinuar();
      }
    }
  
    // Sumar Relativa
    function sumarRelativa() {
      const inputsRelativa = document.querySelectorAll('.input-relativa');
      const totalRelativa = Array.from(inputsRelativa)
        .reduce((sum, input) => sum + parseFloat(input.value || 0), 0);
  
      if (totalRelativa.toFixed(3) === "1.000") {
        totalRelativaEl.textContent = "1.000";
      }
    }
  
    // Sumar Porcentaje
    function sumarPorcentaje() {
      const inputsPorcentaje = document.querySelectorAll('.input-porcentaje');
      const totalPorcentaje = Array.from(inputsPorcentaje)
        .reduce((sum, input) => sum + parseFloat(input.value || 0), 0);
  
      if (totalPorcentaje.toFixed(1) === "100.0") {
        totalPorcentajeEl.textContent = "100.0";
      }
    }
  
    // Validar si el botón debe aparecer
    function validarBotonContinuar() {
      const inputsRelativa = document.querySelectorAll('.input-relativa');
      const inputsPorcentaje = document.querySelectorAll('.input-porcentaje');
  
      let todasCorrectas = true;
  
      inputsRelativa.forEach(input => {
        if (input.style.backgroundColor !== "green") {
          todasCorrectas = false;
        }
      });
  
      inputsPorcentaje.forEach(input => {
        if (input.style.backgroundColor !== "green") {
          todasCorrectas = false;
        }
      });
  
      // Si todas las respuestas son correctas, se muestra el botón
      if (todasCorrectas) {
        mostrarBotonContinuar();
      }
    }
  
    // Mostrar Botón Continuar
    function mostrarBotonContinuar() {
      const boton = document.createElement('button');
      boton.textContent = "Següent";
      boton.classList.add('boton-continuar');
      boton.addEventListener('click', () => {
        window.location.href = 'https://pbfedu.github.io/estadisticapp/theory/6';
      });
      document.querySelector('.container').appendChild(boton);
      boton.style.display = 'block';
    }f
  });
      // Función para mostrar la información extendida
function mostrarInfo() {
    const info = document.getElementById("informacionExpandida");
    info.classList.toggle("oculto"); // Alterna la visibilidad de la sección
  }
