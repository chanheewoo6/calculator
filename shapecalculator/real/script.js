// 모드 선택 및 도형 그리기
document.getElementById('2d-mode').addEventListener('click', function () {
  document.getElementById('2d-settings').classList.remove('hidden');
  document.getElementById('3d-settings').classList.add('hidden');
});

document.getElementById('3d-mode').addEventListener('click', function () {
  document.getElementById('3d-settings').classList.remove('hidden');
  document.getElementById('2d-settings').classList.add('hidden');
});

// 2D 도형 넓이 계산 및 그리기
document.getElementById('draw-2d').addEventListener('click', function () {
  const shape = document.getElementById('2d-shape').value;
  const length = parseFloat(document.getElementById('length').value);
  const resultElement = document.getElementById('2d-result');
  
  let area = 0;

  if (shape === 'triangle') {
    area = (Math.sqrt(3) / 4) * Math.pow(length, 2);
    resultElement.textContent = `삼각형의 넓이: ${area.toFixed(2)} 제곱 단위`;
  } else if (shape === 'rectangle') {
    area = Math.pow(length, 2);
    resultElement.textContent = `사각형의 넓이: ${area.toFixed(2)} 제곱 단위`;
  } else if (shape === 'circle') {
    area = Math.PI * Math.pow(length / 2, 2);
    resultElement.textContent = `원의 넓이: ${area.toFixed(2)} 제곱 단위`;
  }

  // 미리보기는 간단하게 2D Canvas에 그리기 (삼각형, 사각형, 원)
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;

  if (shape === 'triangle') {
    const height = length * Math.sqrt(3) / 2;
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(200 - length / 2, 100 + height);
    ctx.lineTo(200 + length / 2, 100 + height);
    ctx.closePath();
    ctx.stroke();
  } else if (shape === 'rectangle') {
    ctx.beginPath();
    ctx.rect(150, 150, length, length);
    ctx.stroke();
  } else if (shape === 'circle') {
    ctx.beginPath();
    ctx.arc(200, 200, length / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  document.getElementById('canvas-container').innerHTML = '';
  document.getElementById('canvas-container').appendChild(canvas);
});

// 3D 도형 부피 계산 및 그리기 (Three.js 사용)
document.getElementById('draw-3d').addEventListener('click', function () {
  const shape = document.getElementById('3d-shape').value;
  const dimension = parseFloat(document.getElementById('dimension').value);
  const resultElement = document.getElementById('3d-result');
  
  let volume = 0;

  if (shape === 'cube') {
    volume = Math.pow(dimension, 3);
    resultElement.textContent = `정육면체의 부피: ${volume.toFixed(2)} 입방 단위`;
  } else if (shape === 'sphere') {
    volume = (4 / 3) * Math.PI * Math.pow(dimension / 2, 3);
    resultElement.textContent = `구의 부피: ${volume.toFixed(2)} 입방 단위`;
  } else if (shape === 'cylinder') {
    const height = dimension; // 임의로 높이 = 반지름 설정
    const radius = dimension / 2;
    volume = Math.PI * Math.pow(radius, 2) * height;
    resultElement.textContent = `원기둥의 부피: ${volume.toFixed(2)} 입방 단위`;
  }

  // Three.js로 3D 도형 미리보기 렌더링
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 400);
  document.getElementById('canvas-container').innerHTML = '';
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  const geometry = (shape === 'cube') ? new THREE.BoxGeometry(dimension, dimension, dimension) :
                    (shape === 'sphere') ? new THREE.SphereGeometry(dimension / 2, 32, 32) :
                    new THREE.CylinderGeometry(dimension / 2, dimension / 2, dimension, 32);
  
  const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  camera.position.z = 5;
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});
