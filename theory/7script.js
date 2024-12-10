document.addEventListener("DOMContentLoaded", () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const generateNumbers = (count, min, max) => {
      return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };
  
    const displayNumbers = (container, numbers) => {
      container.innerHTML = "";
      numbers.forEach((num) => {
        const div = document.createElement("div");
        div.textContent = num;
        container.appendChild(div);
      });
    };
  
    const updateText = (container, text) => {
      container.textContent = text;
    };
  
    const highlightStep = async (element, ms = 1000) => {
      element.classList.add("processing");
      await sleep(ms);
      element.classList.remove("processing");
    };
  
    // MEDIA ARITMÉTICA
    const mediaNumbers = generateNumbers(7, 1, 10);
    const mediaContainer = document.getElementById("media-numbers");
    displayNumbers(mediaContainer, mediaNumbers);
  
    document.getElementById("calculate-media").addEventListener("click", async () => {
      const resultsContainer = document.getElementById("media-results");
      resultsContainer.innerHTML = `<p class="visible">Contem quants valors hi han: 0</p>`;
      const resultText = resultsContainer.querySelector("p");
      const numbers = Array.from(mediaContainer.children);
  
      // Contar valores
      for (let i = 0; i < numbers.length; i++) {
        await highlightStep(numbers[i]);
        updateText(resultText, `Contem quants valors hi han: ${i + 1}`);
      }
  
      // Sumar valores
      let total = 0;
      updateText(resultText, `Total sumat: ${total}`);
      for (let i = 0; i < numbers.length; i++) {
        await highlightStep(numbers[i]);
        total += parseInt(numbers[i].textContent);
        updateText(resultText, `Total sumat: ${total}`);
      }
  
      // Mostrar resultado final
      const media = (total / mediaNumbers.length).toFixed(2);
      resultText.textContent = `Dividim el resultat: ${total} / ${mediaNumbers.length} = ${media}`;
    });
  
    // MEDIANA
    const medianaNumbers = generateNumbers(9, 1, 10);
    const medianaContainer = document.getElementById("mediana-numbers");
    displayNumbers(medianaContainer, medianaNumbers);
  
    document.getElementById("calculate-mediana").addEventListener("click", async () => {
      const resultsContainer = document.getElementById("mediana-results");
      resultsContainer.innerHTML = `<p class="visible">Per a calcular la mediana ordenem de més petit a més gran.</p>`;
      await sleep(1000);
  
      // Ordenar números con animación
      const sorted = [...medianaNumbers].sort((a, b) => a - b);
      const numbers = Array.from(medianaContainer.children);
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = sorted[i];
        await highlightStep(numbers[i]);
      }
  
      // Mostrar el número central
      const mid = Math.floor(sorted.length / 2);
      const mediana =
        sorted.length % 2 === 0
          ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
          : sorted[mid];
  
      if (sorted.length % 2 !== 0) {
        numbers[mid].classList.add("final");
      } else {
        numbers[mid - 1].classList.add("final");
        numbers[mid].classList.add("final");
      }
      resultsContainer.innerHTML += `<p class="visible">El nombre al centre és la mediana: ${mediana}</p>`;
    });
  
    // MODA
    const modaNumbers = generateNumbers(13, 1, 10);
    const modaContainer = document.getElementById("moda-numbers");
    displayNumbers(modaContainer, modaNumbers);
  
    document.getElementById("calculate-moda").addEventListener("click", async () => {
      const resultsContainer = document.getElementById("moda-results");
      resultsContainer.innerHTML = `<p class="visible">Per a calcular la moda hem d'ordenar de més petit a més gran.</p>`;
      await sleep(1000);
  
      // Ordenar números con animación
      const sorted = [...modaNumbers].sort((a, b) => a - b);
      const numbers = Array.from(modaContainer.children);
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = sorted[i];
        await highlightStep(numbers[i]);
      }
  
      // Encontrar moda
      const counts = {};
      modaNumbers.forEach((num) => (counts[num] = (counts[num] || 0) + 1));
  
      // Encontrar los valores con la misma cantidad máxima de repeticiones
      const maxCount = Math.max(...Object.values(counts));
      const modaCandidates = Object.keys(counts).filter((key) => counts[key] === maxCount);
  
      const modaText = modaCandidates.map((moda) => `El valor que més es repeteix és ${moda}, apareixent ${maxCount} vegades.`).join("<br>");
  
      // Resaltar los números de moda
      numbers.forEach((num) => {
        if (modaCandidates.includes(num.textContent)) {
          num.classList.add("final");
        }
      });
  
      resultsContainer.innerHTML += `<p class="visible">${modaText}</p>`;
    });
  });
