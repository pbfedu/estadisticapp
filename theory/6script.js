document.addEventListener('DOMContentLoaded', () => {
    const personasContainer = document.querySelector('.personas');
    const tablaBody = document.querySelector('.tabla-frecuencias tbody');
    const totalAbsolutaEl = document.getElementById('total-absoluta');
    const totalRelativaEl = document.getElementById('total-relativa');
    const totalPorcentajeEl = document.getElementById('total-porcentaje');
    const mensajeError = document.getElementById('mensaje-error'); // Mensaje para el valor no permitido
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');
    const btn5 = document.getElementById('btn-5');
    
    let numeros = [];
    
    // Generar números aleatorios
    function generarNumeros() {
      numeros = Array.from({ length: 20 }, () => parseFloat((Math.random() * 9 + 1).toFixed(1)));
      personasContainer.innerHTML = numeros.map(numero => `<div>${numero}</div>`).join('');
    }
    
    // Calcular intervalos
    function calcularIntervalos(intervalo) {
      const min = 1;
      const max = 10;
      const intervalos = [];
    
      if (intervalo === 5) {
        intervalos.push([1, 5]);
        intervalos.push([5, 10]);
      } else {
        for (let i = min; i < max; i += intervalo) {
          const fin = Math.min(i + intervalo, max);
          intervalos.push([i, fin]);
        }
      }
      return intervalos;
    }
    
    // Actualizar tabla de frecuencias
    function actualizarTabla(intervalo) {
      // Mostrar mensaje de error si el intervalo no es válido (esto ya no aplica con botones válidos)
      mensajeError.style.display = 'none';
    
      const intervalos = calcularIntervalos(intervalo);
      const conteos = Array(intervalos.length).fill(0);
    
      numeros.forEach(numero => {
        intervalos.forEach(([inicio, fin], idx) => {
          if ((numero >= inicio && numero < fin) || (fin === 10 && numero === fin)) {
            conteos[idx]++;
          }
        });
      });
    
      tablaBody.innerHTML = '';
      const total = conteos.reduce((sum, n) => sum + n, 0);
    
      conteos.forEach((n, idx) => {
        const [inicio, fin] = intervalos[idx];
        const relativa = n / total;
        const porcentaje = (relativa * 100).toFixed(0);
        const fila = `
          <tr>
            <td>[${inicio}, ${fin}${fin === 10 ? ']' : ')'} </td>
            <td>${n}</td>
            <td>${relativa.toFixed(3)}</td>
            <td>${porcentaje}%</td>
          </tr>
        `;
        tablaBody.insertAdjacentHTML('beforeend', fila);
      });
    
      totalAbsolutaEl.textContent = total;
      totalRelativaEl.textContent = '1';
      totalPorcentajeEl.textContent = '100%';
    }
    
    // Manejar clics en los botones
    btn1.addEventListener('click', () => actualizarTabla(1));
    btn2.addEventListener('click', () => actualizarTabla(2));
    btn5.addEventListener('click', () => actualizarTabla(5));
    
    // Inicializar con datos
    generarNumeros();
    actualizarTabla(1); // Predeterminado a intervalos de 1
  });
  
  // Función para mostrar la información extendida
  function mostrarInfo() {
    const info = document.getElementById("informacionExpandida");
    info.classList.toggle("oculto"); // Alterna la visibilidad de la sección
  }
  