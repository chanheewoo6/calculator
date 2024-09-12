let myChart;

function createChart(type, labels, datasets) {
  const ctx = document.getElementById('myChart').getContext('2d');
  
  if (myChart) {
    myChart.destroy(); // Reset chart if already exists
  }

  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true, // Ensure charts scale with screen size
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          title: {
            display: true,
            text: '값'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          title: {
            display: true,
            text: '항목'
          }
        }
      }
    }
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createGraphFromInput(graphType) {
  const labels = document.getElementById('key').value.split(',');
  const valuesList = document.getElementById('values').value.split(';');

  const datasets = valuesList.map((valueString, index) => {
    const values = valueString.split(',').map(Number);
    const backgroundColors = values.map(() => getRandomColor());

    return {
      label: `주제 ${index + 1}`,
      data: values,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors,
      borderWidth: 2,
      hoverOffset: 4
    };
  });

  createChart(graphType, labels, datasets);
}

function displaySelectedTopic(topic) {
  document.getElementById('selectedTopic').textContent = `선택된 주제: ${topic}`;
}

document.getElementById('BarGraph').addEventListener('click', function() {
  displaySelectedTopic('막대그래프');
  createGraphFromInput('bar');
});

document.getElementById('lineGraph').addEventListener('click', function() {
  displaySelectedTopic('꺾은선그래프');
  createGraphFromInput('line');
});

document.getElementById('circleGraph').addEventListener('click', function() {
  displaySelectedTopic('원그래프');
  createGraphFromInput('pie');
});
