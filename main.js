// grap Element form page
const timeDisplay = document.querySelector('.js-time-display');
const startBtn = document.querySelector('.js-start');
const resetBtn = document.querySelector('.js-reset');
const lapDisplay = document.querySelector('.lap-body');
let minutes = 0;
let hours = 0;
let seconds = 0;
let micorSec = 0;
let intervalId;
let isRunning = false;
let lap = [{
  overalTilme: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    micorSec: 0
  },
  lapTime: {
    lapHour: 0,
    lapMin: 0,
    lapSec: 0,
    lapMSec: 0,
  }
}];

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startBtn.textContent = 'Stop';
    startBtn.classList.add('is-stop-color');
    resetBtn.classList.add('is-lap-color');
    resetBtn.textContent = 'Lap';
    intervalId = setInterval(() => {
      if (micorSec >= 99) {
        micorSec = 0;
        seconds++
      }
      else if (seconds >= 60) {
        seconds = 0;
        minutes++;
      } else if (minutes >= 60) {
        minutes = 0;
        hours++;
      } else {
        micorSec++;
      }
      timeDisplay.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${micorSec < 10 ? '0' + micorSec : micorSec}`;
    }, 10);
    isRunning = true;
  } else {
    clearInterval(intervalId);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('is-stop-color');
    resetBtn.classList.remove('is-lap-color');
    resetBtn.textContent = 'Reset';
  }

})
resetBtn.addEventListener('click', () => {
  if (resetBtn.textContent === 'Reset') {
    minutes = 0;
    hours = 0;
    seconds = 0;
    micorSec = 0;
    timeDisplay.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${micorSec < 10 ? '0' + micorSec : micorSec}`;
    clearInterval(intervalId);
    isRunning = false;
    startBtn.textContent = 'Start';
    lapDisplay.innerHTML = '';
    lap = [{
      overalTilme: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        micorSec: 0
      },
      lapTime: {
        lapHour: 0,
        lapMin: 0,
        lapSec: 0,
        lapMSec: 0,
      }
    }];
  } else {

    lap.push({
      lapNo: lap.length < 10 ? '0' + lap.length : lap.length,
      overalTilme: {
        hours,
        minutes,
        seconds,
        micorSec
      },
      lapTime: {
        lapHour: hours - lap[lap.length - 1].overalTilme.hours || 0,
        lapMin: minutes - lap[lap.length - 1].overalTilme.minutes || 0,
        lapSec: seconds - lap[lap.length - 1].overalTilme.seconds || 0,
        lapMSec: micorSec - lap[lap.length - 1].overalTilme.micorSec || 0,
      }
    })
    runderLap()
  }
})

function runderLap() {

  let html = '';
  for (let i = 0; i < lap.length; i++) {
    if (i === 0) continue;
    const lapTimes = lap[i];
    html += `
      <div class="lap">
        <div>${lapTimes.lapNo}</div>
        <div>${lapTimes.lapTime.lapHour}:${lapTimes.lapTime.lapMin}:${lapTimes.lapTime.lapSec}.${lapTimes.lapTime.lapMSec}</div>
        <div>${lapTimes.overalTilme.hours}:${lapTimes.overalTilme.minutes}:${lapTimes.overalTilme.seconds}.${lapTimes.overalTilme.micorSec}</div>
      </div>
    `;

  }
  lapDisplay.innerHTML = '';
  lapDisplay.innerHTML += html;
}