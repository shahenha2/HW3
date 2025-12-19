
const bgMusic = new Audio("sounds/background.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.35;

const toggleBtn = document.getElementById("toggleMusic");
const cards = document.querySelectorAll(".card");
window.addEventListener("load", () => {
  bgMusic.play().catch(() => {
    document.addEventListener("click", startBgOnce, { once: true });
    document.addEventListener("keydown", startBgOnce, { once: true });
  });
});

function startBgOnce() {
  bgMusic.play().catch(() => {});
}

toggleBtn.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
});

function playSound(path) {
  const sound = new Audio(path);
  sound.currentTime = 0;
  sound.play().catch(() => {});
}


cards.forEach((card) => {
  card.addEventListener("click", () => {
   /*
      card.dataset.sound מחזיר את הערך של data-sound מה-HTML.
      card.dataset.key מחזיר את הערך של data-key מה-HTML.
    */
    playSound(card.dataset.sound);
    flash(card);
  });
});


document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const match = Array.from(cards).find((card) => card.dataset.key === key);
  if (match) {
    playSound(match.dataset.sound);
    flash(match);
  }
});

function flash(card) {
  card.style.transform = "scale(0.98)";
  setTimeout(() => (card.style.transform = "scale(1)"), 120);
}
