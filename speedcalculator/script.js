document.getElementById('calculateBtn').addEventListener('click', function () {
  // 거리 단위 선택
  const distanceUnit = document.querySelector('input[name="mode"]:checked');
  const timeUnit = document.querySelector('input[name="time"]:checked');

  // 거리와 시간 단위가 선택되었는지 확인
  if (!distanceUnit || !timeUnit) {
    alert("거리와 시간 단위를 선택하세요.");
    return;
  }

  // 거리와 시간 값 가져오기
  const distanceValue = document.getElementById('distance').value;
  const timeValue = document.getElementById('time').value;

  // 유효성 검사: 숫자인지 확인
  if (isNaN(distanceValue) || isNaN(timeValue) || distanceValue.trim() === "" || timeValue.trim() === "") {
    alert("유효한 거리와 시간을 입력하세요.");
    return;
  }

  // 입력한 값을 숫자로 변환
  const distance = parseFloat(distanceValue);
  const time = parseFloat(timeValue);

  // 속력 계산 (거리/시간)
  const speed = distance / time;

  // 단위 가져오기
  const distanceUnitValue = distanceUnit.value;  // km, m, cm 중 하나
  const timeUnitValue = timeUnit.value;          // h, m, s 중 하나

  // 결과 출력 (예: km/h, m/s)
  document.getElementById('result').innerText = `속력: ${speed.toFixed(2)} ${distanceUnitValue}/${timeUnitValue}`;
});
