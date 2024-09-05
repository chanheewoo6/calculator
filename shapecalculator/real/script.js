// 모드 선택 및 도형 그리기
document.getElementById('2d-mode').addEventListener('click', function () {
  document.getElementById('2d-settings').classList.remove('hidden');
  document.getElementById('3d-settings').classList.add('hidden');
});

document.getElementById('3d-mode').addEventListener('click', function () {
  document.getElementById('3d-settings').classList.remove('hidden');
  document.getElementById('2d-settings').classList.add('hidden');
});

// 2D 도형 그리기
document.getElementById('draw-2d').addEventListener('click', function () {
  const shape = document.getElementById('2d-shape').value;
  const length = document.getElementById('length').value;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;

  if (shape === 'triangle') {
    // 삼각형 그리기
    const height = length * Math.sqrt(3) / 2;
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(200 - length / 2, 100 + height);
    ctx.lineTo(200 + length / 2, 100 + height);
    ctx.closePath();
    ctx.stroke();
  } else if (shape === 'rectangle') {
    // 사각형 그리기
    ctx.beginPath();
    ctx.rect(150, 150, length, length);
    ctx.stroke();
  } else if (shape === 'circle') {
    // 원 그리기
    ctx.beginPath();
    ctx.arc(200, 200, length / 2, 0, Math.PI * 2);
    ctx.stroke();
  }
});

// 3D 도형 그리기 (간단히 표시)
document.getElementById('draw-3d').addEventListener('click', function () {
  const shape = document.getElementById('3d-shape').value;
  const dimension = document.getElementById('dimension').value;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (shape === 'cube') {
    // 정육면체 그리기 (2D 평면으로 간단히 표시)
    ctx.beginPath();
    ctx.rect(150, 150, dimension, dimension);
    ctx.stroke();
  } else if (shape === 'sphere') {
    // 구 그리기 (2D로 원으로 표시)
    ctx.beginPath();
    ctx.arc(200, 200, dimension / 2, 0, Math.PI * 2);
    ctx.stroke();
  } else if (shape === 'cylinder') {
    // 원기둥 그리기 (간단하게 원 2개와 연결하는 선으로 표시)
    ctx.beginPath();
    ctx.arc(200, 150, dimension / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(200, 250, dimension / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(200 - dimension / 2, 150);
    ctx.lineTo(200 - dimension / 2, 250);
    ctx.stroke();
    ctx.moveTo(200 + dimension / 2, 150);
    ctx.lineTo(200 + dimension / 2, 250);
    ctx.stroke();
  }
});
