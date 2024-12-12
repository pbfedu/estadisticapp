document.addEventListener('DOMContentLoaded', () => {
    const animacionDiv = document.getElementById('animacion');
    const cambiarVistaBtn = document.getElementById('cambiarVista');
    const textoExplicacion = document.getElementById('textoExplicacion');
    const expandirBtn = document.getElementById('expandir');
    let vista = 'poblacion';
  
    // Crear círculos
    for (let i = 0; i < 100; i++) {
      const circulo = document.createElement('div');
      circulo.classList.add('circulo', 'poblacion');
      animacionDiv.appendChild(circulo);
    }
  
    // Cambiar entre población y muestra
    cambiarVistaBtn.addEventListener('click', () => {
      if (vista === 'poblacion') {
        vista = 'muestra';
        textoExplicacion.innerHTML = `
          La <strong>Mostra</strong> és un subgrup representatiu de la població. 
          Per exemple, 20 estudiants seleccionats d'una escola
        `;
        cambiarVistaBtn.textContent = 'Població';
        
  
        // Cambiar colores de los círculos
        const circulos = document.querySelectorAll('.circulo');
        circulos.forEach((circulo) => {
          const random = Math.random();
          if (random < 0.2) {
            circulo.classList.remove('poblacion', 'descartado');
            circulo.classList.add('muestra');
          } else {
            circulo.classList.remove('poblacion', 'muestra');
            circulo.classList.add('descartado');
          }
        });
      } else {
        vista = 'poblacion';
        textoExplicacion.innerHTML = `
          La <strong>Població</strong> és el conjunt total d'elements que volem estudiar. 
          Per exemple, tots els estudiants d'una escola.
        `;
        cambiarVistaBtn.textContent = 'Mostra';
  
        // Volver a todos verdes
        const circulos = document.querySelectorAll('.circulo');
        circulos.forEach((circulo) => {
          circulo.classList.remove('muestra', 'descartado');
          circulo.classList.add('poblacion');
        });
      }
    });
  
    // Expandir información
    expandirBtn.addEventListener('click', () => {
      alert('La població no sempre es pot definir de manera estricta i homogènia. En alguns estudis, les poblacions poden ser dinàmiques, canviant amb el temps, com en els casos d´estudis longitudinals que observen canvis en una població a través dels anys. Això fa que definir els límits de la població pugui ser més complicat.');
    });
  });
  
