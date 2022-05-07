// top polluted countries in the world
const allPollutedCards = document.getElementsByClassName("option");

for (let pollutedCard of allPollutedCards) {
  console.log(pollutedCard);
  pollutedCard.addEventListener("click", () => {
    // remove all active classes from all the cards
    for (let pollutedCardInner of allPollutedCards) {
      pollutedCardInner.classList.remove("active");
    }
    // add active class to the clicked card
    pollutedCard.classList.add("active");
  });
}

// Handle Image Click to view full size
const imageMask = document.querySelector(".image-mask");
const imageMaskInner = document.querySelector(".image-mask-inner");
const imageItem = document.querySelector(".image-item");

imageMask.addEventListener("click", () => {
  imageMask.classList.add("mask-off");
});

imageItem.addEventListener("click", () => {
  let styleValue = imageItem.getAttribute("style");
  imageMaskInner.setAttribute(
    "src",
    styleValue.slice(styleValue.indexOf(": url(") + 7, -3)
  );
  imageMask.classList.remove("mask-off");
});
