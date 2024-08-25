let myChart;

// 그래프 데이터 및 옵션을 생성하는 함수
function createChart(type, labels, datasets) {
  const ctx = document.getElementById('myChart').getContext('2d');
  
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 랜덤 색상을 생성하는 함수
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 사용자 입력을 기반으로 여러 주제로 그래프를 생성하는 함수
function createGraphFromInput(graphType) {
  const labels = document.getElementById('key').value.split(',');
  const valuesList = document.getElementById('values').value.split(';');

  const datasets = valuesList.map((valueString, index) => {
    const values = valueString.split(',').map(Number);
    
    // 항목별 색상 설정
    const backgroundColors = values.map(() => getRandomColor());

    return {
      label: `주제 ${index + 1}`,
      data: values,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors,
      borderWidth: 1
    };
  });

  createChart(graphType, labels, datasets);
}

// 선택된 주제를 표시하는 함수
function displaySelectedTopic(topic) {
  document.getElementById('selectedTopic').textContent = `선택된 주제: ${topic}`;
}

// 이벤트 리스너 설정
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
