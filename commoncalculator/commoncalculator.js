let result = "";

function wr(value) {
  if (value === "=") {
    try {
      result = result.replace(/\*/g, '×').replace(/\//g, '÷');
      let lR = result;
      result = eval(result.replace(/×/g, '*').replace(/÷/g, '/'));
      document.getElementById('lastResult').innerText = lR;
      document.getElementById('result').innerText = result;
    } catch (e) {
      document.getElementById('result').innerText = "오류";
      document.getElementById('lastResult').innerText = "오류";
    }
  } else {
    if (result === '0') {
      result = value;
    } else {
      result += value;
    }
    document.getElementById("result").innerText = result;
  }
}

function reset() {
result = "0";
document.getElementById("lastResult").innerText = "";
document.getElementById("result").innerText = result;
}

function square() {
  try {
  result = Math.pow(parseFloat(result), 2).toString();
    document.getElementById("result").innerText = result;
  } catch (e) {
    document.getElementById("result").innerText = "오류";
  }
}

function remove() {
  result = result.slice(0, -1);
  if (result === '') {
    result = '0';
  }
  document.getElementById("result").innerText = result;
}
