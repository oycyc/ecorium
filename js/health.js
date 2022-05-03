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
};