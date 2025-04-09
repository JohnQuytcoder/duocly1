const drugList = [
  "Aspirin", "Ibuprofen", "Diflofenac", "Aceclofenac", "Piroxicam", "Indomethacin",
  "Meloxicam", "Nimesulid", "Celecoxib", "Chymotrypsine", "Prednisolon", "Dexamethason",
  "Triamcinolon", "Betamethason", "Paracetamol", "Paracetamol+ codein", "Alimemazin",
  "Promethazin", "Cinnarizin", "Flunarizin", "Diphehydramin", "Dymenhydrinat",
  "Chlorpheniramin", "Cetirizin", "Fexofenadin", "Loratadin", "Procain", "Lidocain",
  "Ceftriaxon", "Cefotaxim", "Gentamicin", "Streptomycin", "Kanamycin", "Insulin",
  "Testosteron", "Pramlintide", "Morphine", "Fentanyl", "Propofol", "HyossinN-butylbromid",
  "Ketoconazol", "Griseofulvin", "Nystatin", "Acyflovir", "Promethazin", "Sulfadiazin bạc"
];

let current = 0;
let timer;
let seconds = 90;
let results = [];
let randomDrugs = [];

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  randomDrugs = drugList.sort(() => 0.5 - Math.random()).slice(0, 10); // random 10 thuốc
  showDrug();
}

function showDrug() {
  if (current >= 10 || current >= randomDrugs.length) {
    endGame();
    return;
  }

  document.getElementById("drug-name").innerText = `Thuốc: ${randomDrugs[current]}`;
  const areas = document.querySelectorAll(".answers textarea");
  areas.forEach(area => (area.value = ""));

  seconds = 90;
  updateCountdown();
  timer = setInterval(() => {
    seconds--;
    updateCountdown();
    if (seconds <= 0) {
      nextDrug();
    }
  }, 1000);
}

function updateCountdown() {
  document.getElementById("countdown").innerText = `Còn lại: ${seconds}s`;
}

function saveAnswer() {
  const areas = document.querySelectorAll(".answers textarea");
  const answer = {
    drug: randomDrugs[current],
    group: areas[0].value,
    indication: areas[1].value,
    sideEffect: areas[2].value,
    contraindication: areas[3].value
  };
  results.push(answer);
}

function nextDrug() {
  clearInterval(timer);
  saveAnswer();
  current++;
  showDrug();
}

function nextEarly() {
  nextDrug();
}

function endGame() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  console.log("Kết quả:", results);
}
