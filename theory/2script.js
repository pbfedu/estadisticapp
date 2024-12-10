document.addEventListener('DOMContentLoaded', () => {
    const personasDiv = document.getElementById('personas');
    const muestraDiv = document.querySelector('.muestra-personas');
    const calidadTexto = document.getElementById('calidadMuestra');
    const botonSiguiente = document.getElementById('botonSiguiente');
  
    // Generar datos aleatorios
    const generos = ['H', 'D'];
    const nacionalidades = ['🇪🇸', '🇲🇽', '🇺🇸', '🇨🇦', '🇦🇷'];
    const dineros = ['$', '$$', '$$$'];
  
    const generarPersona = () => ({
      genero: generos[Math.floor(Math.random() * generos.length)],
      nacionalidad: nacionalidades[Math.floor(Math.random() * nacionalidades.length)],
      dinero: dineros[Math.floor(Math.random() * dineros.length)],
    });
  
    // Generar muchas personas
    const totalPersonas = 30;
    const personas = Array.from({ length: totalPersonas }, (_, i) => ({
      id: i + 1,
      ...generarPersona(),
    }));
  
    // Crear elemento de persona en el DOM
    const crearPersonaDiv = (persona) => {
      const personaDiv = document.createElement('div');
      personaDiv.classList.add('persona', 'entrando');
      personaDiv.dataset.id = persona.id;
      personaDiv.innerHTML = `
        <div class="icono">${persona.genero}</div>
        <div class="icono">${persona.dinero}</div>
        <div class="icono">${persona.nacionalidad}</div>
      `;
      return personaDiv;
    };
  
    // Mover persona a la muestra
    const moverAMuestra = (personaDiv) => {
      personaDiv.classList.add('saliendo');
      setTimeout(() => {
        muestraDiv.appendChild(personaDiv);
        personaDiv.classList.remove('saliendo');
        personaDiv.classList.add('entrando');
        personaDiv.removeEventListener('click', () => moverAMuestra(personaDiv));
        personaDiv.addEventListener('click', () => moverALista(personaDiv));
        calcularCalidad();
      }, 300);
    };
  
    // Mover persona de regreso a la lista original
    const moverALista = (personaDiv) => {
      personaDiv.classList.add('saliendo');
      setTimeout(() => {
        personasDiv.appendChild(personaDiv);
        personaDiv.classList.remove('saliendo');
        personaDiv.classList.add('entrando');
        personaDiv.removeEventListener('click', () => moverALista(personaDiv));
        personaDiv.addEventListener('click', () => moverAMuestra(personaDiv));
        calcularCalidad();
      }, 300);
    };
  
    // Generar y mostrar personas iniciales
    personas.forEach((persona) => {
      const personaDiv = crearPersonaDiv(persona);
      personasDiv.appendChild(personaDiv);
  
      // Configurar interacción
      personaDiv.addEventListener('click', () => moverAMuestra(personaDiv));
    });
  
    // Calcular la calidad de la muestra
    function calcularCalidad() {
      const seleccionados = Array.from(muestraDiv.children);
      
      // Cálculos de distribuciones
      const generos = { H: 0, D: 0 };
      const nacionalidades = {};
      const dineros = { '$': 0, '$$': 0, '$$$': 0 };
  
      seleccionados.forEach((personaDiv) => {
        const persona = personas.find((p) => p.id === parseInt(personaDiv.dataset.id));
        generos[persona.genero]++;
        nacionalidades[persona.nacionalidad] = (nacionalidades[persona.nacionalidad] || 0) + 1;
        dineros[persona.dinero] = (dineros[persona.dinero] || 0) + 1;
      });
  
      const total = seleccionados.length || 1; // Evitar división por 0
  
      // Calcular calidad en base al equilibrio de los grupos
      const balanceGenero = 1 - Math.abs(generos.H - generos.D) / total;
      const balanceNacionalidad = 1 - (Object.keys(nacionalidades).length - Math.min(...Object.values(nacionalidades))) / total;
      const balanceDinero = 1 - (Math.max(...Object.values(dineros)) - Math.min(...Object.values(dineros))) / total;
  
      const calidad = Math.round((balanceGenero + balanceNacionalidad + balanceDinero) / 3 * 100);
      calidadTexto.textContent = `Qualitat de la mostra: ${calidad}%`;
  
      // Mostrar el botón de siguiente si la calidad es superior al 75%
      if (calidad >= 75) {
        botonSiguiente.classList.remove('oculto');
      } else {
        botonSiguiente.classList.add('oculto');
      }
    }
  });
// Función para mostrar la información extendida
function mostrarInfo() {
    const info = document.getElementById("informacionExpandida");
    info.classList.toggle("oculto"); // Alterna la visibilidad de la sección
  }
    
