import { randomMsg } from "./randomMsg.js";
const dayCounter = document.getElementById("dayCounter");
const dailyMission = document.getElementById("dailyMission");
const questFailedBtn = document.getElementById("questFailedBtn");
const questCompletetBtn = document.getElementById("questCompletetBtn");
const difficultyDisplay = document.getElementById("difficultyDisplay");
const dUp = document.getElementById("dUp");
const dDown = document.getElementById("dDown");
const showLastDay = document.getElementById("showLastDay");
const settingsBtn = document.getElementById("settingsBtn");
const themeSelector = document.getElementById("themeSelector");
const colorsTheme = document.querySelectorAll(".colorsTheme");
const clearLs = document.getElementById("clearLs");
// CURRENTLY MANY BUGS THANKS TO LOCAL STORAGE: NOT FINISHED YET!! WORKING ON IT <3
// completed: really important: add local storage (for best day streak, difficulty & settings being remembered!!!
// to-do: difficulty for local storage saved
// to-do: get rid of any repeating codet that could be a function (really looking forward to that...)
// to-do: when reloading first time call local storage (currently: only when button is clicked)
//TEST BELOW
// for local storage
let lsDay = "currentDay";
let lsBest = "bestStreak";
let lsThemes = "themeColor";
let lsPushup = "pushups";
let lsPullups = "pullups";
let lsSquats = "squats";
let lsPlank = "plank";

// add a setting to disable auto-hide: line ~160
let toggleLastDay = false;
let toggleSettings = false;
let autoHideTimer;
let day = 1;
let best = 0;
let pushup = 10;
let lastPushup = 10;
let pullups = 0;
let lastPullups = 0;
let squats = 0;
let lastSquats = 0;
let plank = 0;
let lastPlank = 0;
let difficultyMulti = 1;
let difficulty = 1;

// current -> 51: local storage stuff
let savedDay = Number(localStorage.getItem(lsDay));
let savedBest = Number(localStorage.getItem(lsBest)) || 0;
displayBest.innerHTML = `Best streak: ${best}`;
let savedPushups = Number(localStorage.getItem(lsPushup)) || 0;
let savedPullups = Number(localStorage.getItem(lsPullups)) || 0;
let savedSquats = Number(localStorage.getItem(lsSquats)) || 0;
let savedPlank = Number(localStorage.getItem(lsPlank)) || 0;
day = savedDay;
best = savedBest;
pushup = savedPushups;
pullups = savedPullups;
squats = savedSquats;
plank = savedPlank;
let savedTheme = localStorage.getItem(lsThemes);
if (savedTheme) document.body.style.backgroundColor = savedTheme;

let msg = "";
let lastMsg = "";
function getMsg() {
  msg = randomMsg[Math.floor(Math.random() * randomMsg.length)];
  return msg;
}
const difficultyLevels = [
  { max: 0.4, label: "piss easy", color: "rgb(0,135,0)" },
  { max: 0.6, label: "easy", color: "rgb(0,90,0)" },
  { max: 0.8, label: "trainee", color: "rgb(0,45,0)" },
  { max: 1.0, label: "normal", color: "rgb(0,0,0)" },
  { max: 1.6, label: "hard", color: "rgb(30,0,0)" },
  { max: 2.0, label: "insane", color: "rgb(60,0,0)" },
  { max: 2.5, label: "death", color: "rgb(90,0,0)" },
  { max: 3.0, label: "death +", color: "rgb(120,0,0)" },
  { max: 3.5, label: "death ++", color: "rgb(150,0,0)" },
  { max: 4.0, label: "death +++", color: "rgb(200,0,0)" },
  { max: 4.5, label: "hell", color: "rgb(180,0,0)" },
  { max: Infinity, label: "hell", color: "rgb(180,0,0)" },
];

function updateDifficulty() {
  difficulty = Math.max(0.35, difficulty);
  const d = difficulty;

  const level = difficultyLevels.find((l) => d <= l.max);

  difficultyDisplay.innerHTML = `${level.label} (${d.toFixed(1)})`;
  difficultyDisplay.style.color = level.color;
  console.log("difficulty:", d);
}

function perDayAdd(kind) {
  let x = Math.floor(Math.random() * difficultyMulti * difficulty);
  if (x === 0) x = 1;

  if (kind === "pushup") {
    pushup += x;
    console.log("pushups:", pushup);
  } else if (kind === "pullups") {
    pullups += x;
    console.log("pullups:", pullups);
  } else if (kind === "squats") {
    squats += x;
    console.log("squats:", squats);
  } else if (kind === "plank") {
    plank += x;
    console.log("plank:", plank);
  }
}

function chooseKind() {
  let whatKind = Math.floor(Math.random() * 4);

  if (whatKind == 0) {
    difficultyMulti = 5;
    perDayAdd("pushup");
  } else if (whatKind == 1) {
    difficultyMulti = 2;
    perDayAdd("pullups");
  } else if (whatKind == 2) {
    difficultyMulti = 8;
    perDayAdd("squats");
  } else {
    difficultyMulti = 10;
    perDayAdd("plank");
  }
}

function difficultySelectorAnimation(element) {
  let elementCurrent = element.style.backgroundColor;
  element.style.backgroundColor = "pink";
  setTimeout(() => {
    element.style.backgroundColor = elementCurrent;
  }, 150);
}
dUp.addEventListener("click", () => {
  difficulty = difficulty + 0.2;
  updateDifficulty();
  difficultySelectorAnimation(dUp);
});
dDown.addEventListener("click", () => {
  difficulty = difficulty - 0.2;
  updateDifficulty();
  difficultySelectorAnimation(dDown);
});
//prevent repeating code function below!!
function saveToLocalStorage(lsAny, original) {
  localStorage.setItem(lsAny, String(original));
}
function dayUpdateLogic() {
  getMsg();
  day++;
  best = Math.max(best, day);
  // current -> 156: local storage stuff
  saveToLocalStorage(lsDay, day);
  saveToLocalStorage(lsBest, best);
  saveToLocalStorage(lsPullups, pushup);
  saveToLocalStorage(lsPullups, pullups);
  saveToLocalStorage(lsSquats, squats);
  saveToLocalStorage(lsPlank, plank);

  displayBest.innerHTML = `Best streak: ${best}`;
  console.log("best:" + best);
  dayCounter.innerHTML = `Day ${day}`;
}
function getDayInfo() {
  lastPushup = pushup;
  lastPullups = pullups;
  lastSquats = squats;
  lastPlank = plank;
  lastMsg = msg;
}
function resetLogic() {
  day = 0;
  pushup = 10;
  pullups = 0;
  squats = 0;
  plank = 0;
}

colorsTheme.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.style.backgroundColor = button.id;
    localStorage.setItem(lsThemes, button.id);
  });
});

questCompletetBtn.addEventListener("click", () => {
  getDayInfo();
  chooseKind();
  dayUpdateLogic();
  dailyMission.innerHTML = `Today you need to tackle: <br> ${pushup} pushups <br> ${pullups} pullups <br> ${squats} sqats <br> ${plank} seconds of plank <br><br> <b>${msg}</b>`;
});
questFailedBtn.addEventListener("click", () => {
  resetLogic();
  dayCounter.innerHTML = `Day ${day}`;
  dailyMission.innerHTML = `Today you need to tackle: <br> ${pushup} pushups!!`;
});

settingsBtn.addEventListener("click", () => {
  clearTimeout(autoHideTimer);

  autoHideTimer = setTimeout(() => {
    themeSelector.style.left = "110%";
    clearLs.style.left = "110%";
    toggleSettings = false;
    console.log(toggleSettings);
  }, 10000);

  settingsBtn.style.scale = "110%";
  setTimeout(() => {
    settingsBtn.style.scale = "100%";
  }, 300);

  toggleSettings = !toggleSettings;
  if (toggleSettings) {
    themeSelector.style.left = "90%";
    clearLs.style.left = "90%";
  } else {
    themeSelector.style.left = "110%";
    clearLs.style.left = "110%";
  }
  console.log(toggleSettings);
});

showLastDay.addEventListener("click", () => {
  toggleLastDay = !toggleLastDay;
  if (toggleLastDay == false) {
    dailyMission.innerHTML = `Today you need to tackle: <br> ${pushup} pushups <br> ${pullups} pullups <br> ${squats} sqats <br> ${plank} seconds of plank <br><br> <b>${msg}</b>`;
    showLastDay.style.backgroundColor = "white";
    showLastDay.innerHTML = `see yesterday`;
  } else {
    showLastDay.style.backgroundColor = "green";
    dailyMission.innerHTML = `Yesterday you needed to tackle: <br> ${lastPushup} pushups <br> ${lastPullups} pullups <br> ${lastSquats} sqats <br> ${lastPlank} seconds of plank <br><br> <b>${lastMsg}</b>`;
    showLastDay.innerHTML = `return to today`;
  }
});

// 7th oct: made the background selector actually function and added more colors to it!
