document.addEventListener("DOMContentLoaded", () => {
  const generateRandomData = (categories, min, max) => {
    return Array.from({ length: categories }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const populateTable = (tableId, labels, data) => {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = "";
    data.forEach((value, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${labels[index]}</td><td>${value}</td>`;
      tbody.appendChild(row);
    });
  };

  const createChart = (canvasId, type, labels, data, spacing = true) => {
    const ctx = document.getElementById(canvasId).getContext("2d");
    return new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [{
          label: "Freqüències",
          data,
          backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"],
          borderRadius: type === "bar" ? 10 : 0,
          barPercentage: spacing ? 0.8 : 1,
          categoryPercentage: spacing ? 0.9 : 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { stacked: type === "bar", beginAtZero: true },
          y: { beginAtZero: true },
        },
      },
    });
  };

  // Gráfico de Barras
  const barLabels = ["A", "B", "C", "D", "E"];
  const barData = generateRandomData(5, 10, 50);
  populateTable("bar-chart-table", barLabels, barData);
  createChart("barChart", "bar", barLabels, barData);

  // Histograma
  const histogramLabels = ["0-10", "10-20", "20-30", "30-40", "40-50"];
  const histogramData = generateRandomData(5, 10, 50);
  populateTable("histogram-table", histogramLabels, histogramData);
  createChart("histogramChart", "bar", histogramLabels, histogramData, false);

  // Gráfico de Sectors
  const pieLabels = ["Opció 1", "Opció 2", "Opció 3", "Opció 4"];
  const pieData = generateRandomData(4, 10, 50);
  populateTable("pie-chart-table", pieLabels, pieData);
  createChart("pieChart", "pie", pieLabels, pieData);
});
