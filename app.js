// Ocean Focus Toy - simple timer logic for beginners.
// Everything is vanilla JS and runs locally in the browser.

const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const progressBar = document.getElementById("progress-bar");
const statusText = document.getElementById("status-text");
const pet = document.getElementById("pet");
const petStatus = document.getElementById("pet-status");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const presetButtons = document.querySelectorAll(".pill");

let totalSeconds = 25 * 60; // default 25 minutes
let remainingSeconds = totalSeconds;
let timerId = null;
let isRunning = false;

const petMoodText = {
  idle: "Mood: idle",
  focus: "Mood: focus",
  done: "Mood: done",
};

function formatTime(value) {
  return String(value).padStart(2, "0");
}

function updateTimerDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timerMinutes.textContent = formatTime(minutes);
  timerSeconds.textContent = formatTime(seconds);
}

function updateProgressBar() {
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function setStatus(message, mood) {
  statusText.textContent = message;
  pet.dataset.mood = mood;
  petStatus.textContent = petMoodText[mood];
}

function tick() {
  if (remainingSeconds <= 0) {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    setStatus("Status: Complete! Take a bubble break.", "done");
    return;
  }

  remainingSeconds -= 1;
  updateTimerDisplay();
  updateProgressBar();
}

function startTimer() {
  if (isRunning) {
    return;
  }
  isRunning = true;
  setStatus("Status: Floating in focus.", "focus");
  timerId = setInterval(tick, 1000);
}

function pauseTimer() {
  if (!isRunning) {
    return;
  }
  isRunning = false;
  clearInterval(timerId);
  timerId = null;
  setStatus("Status: Paused. Take a tiny breath.", "idle");
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  updateProgressBar();
  setStatus("Status: Ready to focus.", "idle");
}

function setPreset(minutes) {
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  updateProgressBar();
  setStatus(`Status: Set for ${minutes} minutes.`, "idle");
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const minutes = Number(button.dataset.minutes);
    setPreset(minutes);
  });
});

// Initialize the UI on load.
updateTimerDisplay();
updateProgressBar();
setStatus("Status: Ready to focus.", "idle");
