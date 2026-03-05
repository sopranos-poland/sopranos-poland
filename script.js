const loader = document.getElementById("loader");
const app = document.getElementById("app");
const bar = document.getElementById("progressBar");
const text = document.getElementById("progressText");
const moneyRain = document.getElementById("moneyRain");
const scene = document.getElementById("scene");

// LOADER
let progress = 0;
const intervalMs = 34;

const timer = setInterval(() => {
  progress += Math.floor(Math.random() * 4) + 1;
  if (progress > 100) progress = 100;

  bar.style.width = progress + "%";
  text.textContent = progress + "%";

  if (progress === 100) {
    clearInterval(timer);
    setTimeout(() => {
      loader.style.display = "none";
      app.classList.remove("is-hidden");

      startMoneyRain();
      enableParallax(); // <-- вот оно
    }, 220);
  }
}, intervalMs);

// MONEY RAIN
function spawnBill(){
  const bill = document.createElement("div");
  bill.className = "bill";
  bill.textContent = "💵";

  const x = Math.random() * 100;
  const duration = 3.5 + Math.random() * 5;
  const size = 18 + Math.random() * 14;
  const rot = (Math.random() * 60) - 30;

  bill.style.left = x + "%";
  bill.style.animationDuration = duration + "s";
  bill.style.fontSize = size + "px";
  bill.style.transform = `rotate(${rot}deg)`;

  moneyRain.appendChild(bill);
  setTimeout(() => bill.remove(), duration * 1000 + 300);
}

function startMoneyRain(){
  setInterval(spawnBill, 220);
}

// PARALLAX
function enableParallax(){
  if (!scene) return;

  const strength = 22; // сильнее, чтоб было видно
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    scene.style.setProperty("--px", (-x * strength) + "px");
    scene.style.setProperty("--py", (-y * strength) + "px");
  }, { passive: true });
}