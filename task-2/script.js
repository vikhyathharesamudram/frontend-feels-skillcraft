let startTime, interval;
let running = false;
let elapsed = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateDisplay(time) {
  const ms = Math.floor((time % 1000) / 10);
  const secs = Math.floor((time / 1000) % 60);
  const mins = Math.floor((time / 60000) % 60);
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
}

document.getElementById("start").onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);
    running = true;
  }
};

document.getElementById("pause").onclick = () => {
  clearInterval(interval);
  running = false;
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  elapsed = 0;
  updateDisplay(0);
  laps.innerHTML = "";
  running = false;
};

document.getElementById("lap").onclick = () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${display.textContent}`;
    laps.appendChild(li);
  }
};
