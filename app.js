const timeDisplay = document.getElementById("time-display");
const statusText = document.getElementById("status-text");
const progressBar = document.getElementById("progress-bar");
const petMood = document.getElementById("pet-mood");
const petBody = document.getElementById("pet-body");

const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const presetButtons = document.querySelectorAll(".chip");

let timerId = null;
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;

// Format seconds into MM:SS for display.
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const leftoverSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(leftoverSeconds).padStart(2, "0")}`;
}

// Update everything on screen based on the current state.
function updateUI() {
  timeDisplay.textContent = formatTime(remainingSeconds);
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function setMood(state) {
  petMood.textContent = state;
  petBody.classList.remove("focus", "done");

  if (state === "Focus") {
    petBody.classList.add("focus");
  }

  if (state === "Done") {
    petBody.classList.add("done");
  }
}

function setStatus(message) {
  statusText.textContent = message;
}

function tick() {
  if (remainingSeconds > 0) {
    remainingSeconds -= 1;
    updateUI();
    return;
  }

  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  setStatus("Bubble-pop! Session complete.");
  setMood("Done");
}

function startTimer() {
  if (isRunning) {
    return;
  }

  isRunning = true;
  setMood("Focus");
  setStatus("Floating in focus...");

  timerId = setInterval(tick, 1000);
}

function pauseTimer() {
  if (!isRunning) {
    return;
  }

  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  setStatus("Paused. Stretch your fins!");
  setMood("Idle");
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  remainingSeconds = totalSeconds;
  updateUI();
  setStatus("Ready to float into focus.");
  setMood("Idle");
}

function applyPreset(minutes) {
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  updateUI();
  setStatus(`Preset set to ${minutes} minutes.`);
  setMood("Idle");
}

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const minutes = Number(button.dataset.minutes);
    applyPreset(minutes);
  });
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateUI();
setMood("Idle");
