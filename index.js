let timerId = null;
let remainingSeconds = getSelectedDuration();
let totalSeconds = remainingSeconds;

const timerValue = document.querySelector('.timer-value');
const timerTrack = document.querySelector('.timer-track span');
const timerCaption = document.querySelector('.timer-caption');
const durationSelect = document.querySelector('#duration');

function getSelectedDuration() {
  return Number(document.querySelector('#duration').value);
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restSeconds = seconds % 60;

  return [hours, minutes, restSeconds]
    .map((unit) => String(unit).padStart(2, '0'))
    .join('<span>:</span>');
}

function updateTimerDisplay() {
  timerValue.innerHTML = formatTime(remainingSeconds);
  timerTrack.style.width = `${(remainingSeconds / totalSeconds) * 100}%`;
}

function startTimer() {
  if (timerId !== null || remainingSeconds <= 0) {
    return;
  }

  timerCaption.textContent = '운동 시간이 진행 중입니다';
  timerId = setInterval(() => {
    remainingSeconds -= 1;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      stopTimer();
      timerCaption.textContent = '운동 시간이 끝났습니다';
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;

  if (remainingSeconds > 0) {
    timerCaption.textContent = '운동 시간이 일시 정지되었습니다';
  }
}

function resetTimer() {
  stopTimer();
  totalSeconds = getSelectedDuration();
  remainingSeconds = totalSeconds;
  timerCaption.textContent = '운동을 시작하면 시간이 카운트됩니다';
  updateTimerDisplay();
}

function updateTimerFromSelection() {
  resetTimer();
}

updateTimerDisplay();