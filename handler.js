(function () {
  const btn1 = document.querySelector('#btn1');
  const btn2 = document.querySelector('#btn2');
  const btn3 = document.querySelector('#btn3');

  let ws;

  function handleReq(data) {
    data = JSON.parse(data);
    switch (data.type) {
      case 'changeTime':
        changeTime(data.value);
        break;
      case 'changeCount':
        changeCount(data.value);
        break;
      case 'changeWave':
        changeWave(data.value);
        break;
    }
    console.log(data.type)
  }

  function init() {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket('ws://35.223.101.58:8080');
    ws.onopen = () => {
      console.log('Connection opened!');
    }
    ws.onmessage = ({ data }) => handleReq(data);
    ws.onclose = function () {
      ws = null;
    }
  }
  if (btn1) {
    btn1.onclick = function () {
      if (!ws) {
        showMessage("No WebSocket connection :(");
        return;
      }

      ws.send(JSON.stringify({
        type: 'changeTime',
        value: 5
      }));

    }
  }
  if (btn2) {
    btn2.onclick = function () {
      if (!ws) {
        showMessage("No WebSocket connection :(");
        return;
      }

      ws.send(JSON.stringify({
        type: 'changeCount',
        value: 222
      }));

    }
  }
  if (btn3) {
    btn3.onclick = function () {
      if (!ws) {
        showMessage("No WebSocket connection :(");
        return;
      }

      ws.send(JSON.stringify({
        type: 'changeWave',
        value: 50
      }));

    }
  }
  init();
})();