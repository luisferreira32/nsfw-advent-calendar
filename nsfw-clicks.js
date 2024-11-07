const treats = [
  "1 Kiss",
  "2 Kisses",
  "3 Kisses",
  "4 Kisses",
  "5 Kisses",
  "Death by kisses",
  "6 Kisses",
  "7 Kisses",
  "8 Kisses",
  "9 Kisses",
  "Free massage",
  "10 Kisses",
  "11 Kisses",
  "12 Kisses",
  "Date night out",
  "13 Kisses",
  "14 Kisses",
  "Cuddle marathon",
  "15 Kisses",
  "Wet kiss",
  "Love poem cuppon",
  "Fancy breakfast",
  "Presents!",
  "Christmaaaaaas",
];

const monthOfDecember = 12;
const maxOverlapskipAttempts = 50;

function getTreat(day) {
  return treats[day];
}

function isOverlapping(x1, y1, x2, y2, size) {
  return !(
    x1 + size < x2 ||
    x2 + size < x1 ||
    y1 + size < y2 ||
    y2 + size < y1
  );
}

function createAdventDays() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const container = document.getElementById("square-container");
  const size = 100; // Size of each square
  const squares = []; // Store squares' positions

  const pageTitle = document.getElementById("page-title");
  if (month === monthOfDecember) {
    pageTitle.innerText = "Time to open the advent calendar!";
  } else {
    const decemberFirst = new Date(today.getFullYear(), 11, 1);
    const differenceInMilliseconds = decemberFirst - today;
    pageTitle.innerText = `Only ${Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    )} days to start opening!`;
  }

  for (let i = 0; i < 25; i++) {
    let x,
      y,
      overlapskipAttempts = 0;
    let overlapping;

    // Find a position that doesn't overlap with existing squares
    do {
      x = Math.random() * (window.innerWidth - size * 2) + size * 0.5;
      y = Math.random() * (window.innerHeight - size * 2.5) + size;
      overlapping = squares.some((square) =>
        isOverlapping(x, y, square.x, square.y, size)
      );
      overlapskipAttempts++;
    } while (overlapping && overlapskipAttempts < maxOverlapskipAttempts);

    // Save the position to avoid future overlaps
    squares.push({ x, y });

    // Create and position the square
    const square = document.createElement("div");
    square.innerText = `${i}`;
    square.classList.add("square");
    square.style.backgroundColor = "#88bffd";
    square.style.left = `${x}px`;
    square.style.top = `${y}px`;

    // Keep open the days that were openned before (but in gray)
    if (month === monthOfDecember && i < day) {
      square.style.backgroundColor = "#EEEEEE";
      const treat = document.createElement("div");
      treat.innerText = `${getTreat(i)}`;
      treat.classList.add("treat");
      square.replaceChildren(treat);
    }

    // Add click event to change background color
    square.addEventListener("click", function () {
      if (month !== monthOfDecember || day !== i) {
        return;
      }
      square.style.backgroundColor = "#FFFFFF";
      const treat = document.createElement("div");
      treat.innerText = `${getTreat(i)}`;
      treat.classList.add("treat");
      square.replaceChildren(treat);
    });

    // Append the square to the container
    container.appendChild(square);
  }
}

createAdventDays();
