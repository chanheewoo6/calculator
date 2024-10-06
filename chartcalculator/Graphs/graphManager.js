let myChart;

function createChart(type, labels, datasets) {
  const ctx = document.getElementById('myChart').getContext('2d');
  
  if (myChart) {
    myChart.destroy(); // 이미 존재하는 차트를 초기화
  }

  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true, // 화면 크기에 맞게 차트 크기 조정
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
  // 입력된 항목과 값을 가져와서 그래프를 생성
  const labels = document.getElementById('key').value.split(',').map(label => label.trim());
  const valuesInput = document.getElementById('values').value.split(';');
  
  const datasets = valuesInput.map((valueString, index) => {
    const [topic, values] = valueString.split(';');
    const dataValues = values.split(',').map(value => Number(value.trim()));
    const backgroundColors = dataValues.map(() => getRandomColor());

    return {
      label: topic.trim(),
      data: dataValues,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors,
      borderWidth: 2,
      hoverOffset: 4
    };
  });

  createChart(graphType, labels, datasets);
}

function displaySelectedTopic(topic) {
  // 선택된 주제를 화면에 표시
  document.getElementById('selectedTopic').textContent = `선택된 주제: ${topic}`;
}

// 각 버튼에 클릭 이벤트를 추가하여 그래프를 생성
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
