let score = 300;
let stickmanPosition = 20;
let obstacleCount = 0;

const startGameButton = document.getElementById("start-game");
const weaponChoiceDiv = document.getElementById("weapon-choice");
const stickman = document.getElementById("stickman");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const weapons = document.querySelectorAll(".weapon");

let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let img4 = document.getElementById("img4");
let img5 = document.getElementById("img5");
let img6 = document.getElementById("img6");

function startGame() {
  score = 300;
  obstacleCount = 0;
  stickmanPosition = 20;

  // Display the starting score only
  scoreDisplay.textContent = `Starting Score: ${score}`;
  setTimeout(() => {
    scoreDisplay.style.display = "none"; // Hide the score after displaying it briefly
  }, 2000);

  message.textContent = "First up: Procrastination Pit";
  startGameButton.style.display = "none";
  weaponChoiceDiv.style.display = "none";
  moveStickman();
}

function moveStickman() {
  if (obstacleCount >= 5 || score <= 0) {
    endGame();
    return;
  }

  // Move stickman forward
  stickmanPosition += 150;
  stickman.style.left = `${stickmanPosition}px`;

  // Flash weapon choice
  setTimeout(() => {
    message.textContent = "Choose your weapon!";
    weaponChoiceDiv.style.display = "block";
  }, 500);

  // Hide choices after 4 seconds
  setTimeout(() => {
    if (weaponChoiceDiv.style.display === "block") {
      message.textContent = "You hesitated! Too late!";
      score += 10;
      weaponChoiceDiv.style.display = "none";
      obstacleCount++;
      moveStickman();
    }
  }, 4000); // 4 seconds to decide
}

weapons.forEach((weapon) => {
  weapon.addEventListener("click", () => {
    const damage = parseInt(weapon.dataset.damage);
    score -= damage;
    weaponChoiceDiv.style.display = "none";
    message.textContent = "Nice Choice!";
    obstacleCount++;

    // Proceed to the next round
    moveStickman();
  });
});

function showBombBlast(score) {
  const blastVideo = document.getElementById('blast-video');
  const blastContainer = document.getElementById('blast-container');
  const resultContainer = document.getElementById('result');
  const finalScoreElement = document.getElementById('final-score');

  // Show the video container
  blastVideo.style.display = 'block';
  blastContainer.style.display = 'flex';

  // Set the final score
  finalScoreElement.textContent = score;

  // Play the video
  blastVideo.play();

  // When the video ends, hide it and show the result
  blastVideo.onended = () => {
    blastContainer.style.display = 'none'; // Hide the video
    resultContainer.style.display = 'block'; // Show the result
  };
}

function endGame() {
  weaponChoiceDiv.style.display = "none";
  startGameButton.style.display = "block";

  // Show the final score
  scoreDisplay.style.display = "block";
  scoreDisplay.textContent = `Final Score: ${score}`;

  if (score <= 150 ) {
    message.textContent = "You did it! Bobby Boy is free of negativity.";
  } else {
    message.textContent = "Time's up! Bobby Boy was unsuccessful in freeing itself of the evil.";
  }
}

// Handle dynamic weapon display
startGameButton.addEventListener("click", () => {
  if (obstacleCount % 2 === 0) {
    img4.src = "bow.png";
    img5.src = "bomb.jpg";
    img6.src = "axe.png";
    img4.style.display = "block";
    img5.style.display = "block";
    img6.style.display = "block";
  } else if (obstacleCount % 2 === 1) {
    img1.src = "images.png";
    img2.src = "fire.jpg";
    img3.src = "stone.png";
    try2.style.display = "block";
  }
});

startGameButton.addEventListener("click", startGame);
