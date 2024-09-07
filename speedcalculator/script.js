document.getElementById('calculateBtn').addEventListener('click', function () {
  // 거리 단위 선택
  let distanceUnit = document.querySelector('input[name="mode"]:checked');
  let timeUnit = document.querySelector('input[name="time"]:checked');

  // 거리와 시간 단위가 선택되었는지 확인
  if (!distanceUnit || !timeUnit) {
    alert("거리와 시간 단위를 선택하세요.");
    return;
  }

  // 거리와 시간 값 가져오기
  let distanceValue = document.getElementById('distance').value;
  let timeValue = document.getElementById('time').value;

  // 유효성 검사: 숫자인지 확인
  if (isNaN(distanceValue) || isNaN(timeValue) || distanceValue === "" || timeValue === "") {
    alert("유효한 거리와 시간을 입력하세요.");
    return;
  }

  // 입력한 값을 숫자로 변환
  distanceValue = parseFloat(distanceValue);
  timeValue = parseFloat(timeValue);

  // 단위 가져오기
  let distance = distanceUnit.value;  // km, m, cm 중 하나
  let time = timeUnit.value;          // h, m, s 중 하나

  // 속력 계산 (거리/시간)
  let speed = distanceValue / timeValue;

  // 결과 출력 (예: km/h, m/s)
  document.getElementById('result').innerText = `속력: ${speed} ${distance}/${time}`;
});
