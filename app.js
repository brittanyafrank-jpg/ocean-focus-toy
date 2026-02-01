const timeDisplay = document.getElementById("timeDisplay");
const statusText = document.getElementById("statusText");
const progressFill = document.getElementById("progressFill");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const presetButtons = document.querySelectorAll(".preset");
const pet = document.getElementById("pet");
const petMood = document.getElementById("petMood");

// Timer state stored in seconds for accurate countdown math.
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerId = null;
let isRunning = false;
let selectedPresetMinutes = 25;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
  const progress = totalSeconds === 0 ? 0 : ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  progressFill.style.width = `${progress}%`;
}

function setPetMood(state) {
  pet.classList.remove("idle", "focus", "done");
  pet.classList.add(state);
  petMood.textContent = `Mood: ${state}`;
}

function setStatus(message) {
  statusText.textContent = message;
}

function startTimer() {
  if (isRunning) {
    return;
  }

  if (remainingSeconds <= 0) {
    remainingSeconds = totalSeconds;
  }

  isRunning = true;
  setStatus("Focus time! Keep going.");
  setPetMood("focus");

  const startTimestamp = Date.now();
  const initialRemaining = remainingSeconds;

  timerId = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTimestamp) / 1000);
    remainingSeconds = Math.max(initialRemaining - elapsedSeconds, 0);
    updateDisplay();

    if (remainingSeconds === 0) {
      clearInterval(timerId);
      timerId = null;
      isRunning = false;
      setStatus("Session complete! Time to sparkle.");
      setPetMood("done");
    }
  }, 250);
}

function pauseTimer() {
  if (!isRunning) {
    return;
  }
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  setStatus("Paused. Take a breath.");
  setPetMood("idle");
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  remainingSeconds = selectedPresetMinutes * 60;
  totalSeconds = remainingSeconds;
  updateDisplay();
  setStatus("Ready for a calm focus session.");
  setPetMood("idle");
}

function applyPreset(minutes) {
  selectedPresetMinutes = minutes;
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  updateDisplay();
  setStatus(`Preset set to ${minutes} minutes.`);
  setPetMood("idle");
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const minutes = Number(button.dataset.minutes);
    applyPreset(minutes);
  });
});

// Initialize the UI on load.
updateDisplay();
setPetMood("idle");
