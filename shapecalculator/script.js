document.addEventListener('DOMContentLoaded', function () {
  // 2D 도형 그리기
  document.getElementById('draw-2d').addEventListener('click', function () {
    const shape = document.getElementById('2d-shape').value;
    const base = parseFloat(document.getElementById('base').value);
    const height = parseFloat(document.getElementById('height').value);
    const resultElement = document.getElementById('2d-result');
    
    if (isNaN(base) || base <= 0 || isNaN(height) || height <= 0) {
      resultElement.textContent = '유효한 길이와 높이를 입력하세요.';
      return;
    }

    let area = 0;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    if (shape === 'triangle') {
      area = (base * height) / 2;
      ctx.beginPath();
      ctx.moveTo(200, 100);
      ctx.lineTo(200 - base / 2, 100 + height);
      ctx.lineTo(200 + base / 2, 100 + height);
      ctx.closePath();
      ctx.stroke();
    } else if (shape === 'rectangle') {
      area = base * height;
      ctx.beginPath();
      ctx.rect(200 - base / 2, 200 - height / 2, base, height);
      ctx.stroke();
    } else if (shape === 'circle') {
      area = Math.PI * Math.pow(base / 2, 2);
      ctx.beginPath();
      ctx.arc(200, 200, base / 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    resultElement.textContent = `${shape}의 넓이: ${area.toFixed(2)} 제곱 단위`;
    document.getElementById('canvas-container').innerHTML = '';
    document.getElementById('canvas-container').appendChild(canvas);
  });

  // 3D 도형 그리기
  document.getElementById('draw-3d').addEventListener('click', function () {
    const shape = document.getElementById('3d-shape').value;
    const length = parseFloat(document.getElementById('length').value);
    const radius = parseFloat(document.getElementById('radius').value);
    const height = parseFloat(document.getElementById('height').value);
    const resultElement = document.getElementById('3d-result');
    
    if (isNaN(length) || length <= 0 || (shape === 'cylinder' && (isNaN(radius) || radius <= 0 || isNaN(height) || height <= 0))) {
      resultElement.textContent = '유효한 크기를 입력하세요.';
      return;
    }

    let volume = 0;

    // 부피 계산
    if (shape === 'cube') {
      volume = Math.pow(length, 3);
    } else if (shape === 'sphere') {
      volume = (4 / 3) * Math.PI * Math.pow(length / 2, 3);
    } else if (shape === 'cylinder') {
      volume = Math.PI * Math.pow(radius, 2) * height;
    }

    resultElement.textContent = `${shape}의 부피: ${volume.toFixed(2)} 입방 단위`;

    // Three.js로 3D 미리보기
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(400, 400);
    document.getElementById('canvas-container').innerHTML = '';
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    let geometry;
    if (shape === 'cube') {
      geometry = new THREE.BoxGeometry(length, length, length);
    } else if (shape === 'sphere') {
      geometry = new THREE.SphereGeometry(length / 2, 32, 32);
    } else if (shape === 'cylinder') {
      geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    }

    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = length * 2;
    
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });
});
