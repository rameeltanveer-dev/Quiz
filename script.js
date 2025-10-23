/* script.js — Final quiz logic with sound autoplay & celebrations */

/* ---------- CONFIG ---------- */
const TOTAL_MINUTES = 40;
const PER_QUESTION_SECONDS = 40;
const TOTAL_SECONDS = TOTAL_MINUTES * 60;

/* ---------- STATE & ELEMENTS ---------- */
let userName = null;
let current = 0, correct = 0, wrong = 0;
let totalSecondsLeft = TOTAL_SECONDS, perQuestionSecondsLeft = PER_QUESTION_SECONDS;
let globalTimerId = null, questionTimerId = null, answeredThisQ = false;

const fireworksAudio = document.getElementById("fireworksAudio"); // audio from HTML
const fireworksContainer = document.getElementById("fireworksContainer");

/* ✅ Allow autoplay after first click */
document.body.addEventListener(
  "click",
  () => {
    try {
      fireworksAudio.play().then(() => {
        fireworksAudio.pause();
        fireworksAudio.currentTime = 0;
      });
    } catch (e) {}
  },
  { once: true }
);

/* ---------- CELEBRATION FUNCTION ---------- */
function playFireworks() {
  try {
    fireworksAudio.currentTime = 0;
    fireworksAudio.play().catch(() => {});
  } catch (e) {}

  fireworksContainer.innerHTML = "";
  fireworksContainer.style.display = "block";

  for (let i = 0; i < 40; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.animationDelay = Math.random() * 1 + "s";
    fireworksContainer.appendChild(spark);
  }

  setTimeout(() => {
    fireworksContainer.style.display = "none";
  }, 5000);
}

/* ---------- FINISH QUIZ CELEBRATION LOGIC ---------- */
function finishQuiz() {
  const total = 40; // your total question count
  const percent = Math.round((correct / total) * 100);

  if (percent >= 90) {
    alert("🎉 VIP Celebration! Excellent Performance!");
    playFireworks();
  } else if (percent >= 70) {
    alert("🎊 Congratulations! You scored " + percent + "%");
    playFireworks();
  } else {
    // 0–69%
    showBetterLuckAnimation();
  }
}

/* ---------- “Better Luck” Animated Message ---------- */
function showBetterLuckAnimation() {
  const msg = document.createElement("div");
  msg.textContent = "💪 Better Luck Next Time!";
  msg.style.position = "fixed";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.fontSize = "2rem";
  msg.style.fontWeight = "bold";
  msg.style.color = "red";
  msg.style.animation = "fadeInOut 3s ease forwards";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3500);
}

/* ---------- ANIMATION CSS ---------- */
const style = document.createElement("style");
style.textContent = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
  25% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
  75% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
  100% { opacity: 0; transform: translate(-50%, -40%) scale(0.8); }
}
.spark {
  position: absolute;
  width: 6px;
  height: 6px;
  background: yellow;
  border-radius: 50%;
  animation: boom 1s linear infinite;
}
@keyframes boom {
  0% { transform: scale(0) translateY(0); opacity: 1; }
  50% { transform: scale(1.5) translateY(-40px); opacity: 1; }
  100% { transform: scale(0) translateY(-80px); opacity: 0; }
}
`;
document.head.appendChild(style);
