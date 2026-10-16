const flowerTrack = document.querySelector(".flower-track");

document.querySelectorAll("[data-flower-direction]").forEach((button) => {
	button.addEventListener("click", () => {
		const card = flowerTrack?.querySelector(".flower-card");
		if (!card) return;

		const gap = Number.parseFloat(getComputedStyle(flowerTrack).gap) || 0;
		const distance = card.getBoundingClientRect().width + gap;
		flowerTrack.scrollBy({
			left: distance * Number(button.dataset.flowerDirection),
			behavior: "smooth",
		});
	});
});

const plantGrid = document.querySelector("[data-plant-grid]");
const plantStatus = document.querySelector(".plant-status");

plantGrid?.addEventListener("click", (event) => {
	const selectedPlant = event.target.closest(".plant-card");
	if (!selectedPlant) return;

	const cards = [...plantGrid.querySelectorAll(".plant-card")];
	const remainingPlants = cards.filter((card) => card !== selectedPlant);

	for (let index = remainingPlants.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[remainingPlants[index], remainingPlants[swapIndex]] = [remainingPlants[swapIndex], remainingPlants[index]];
	}

	cards.forEach((card) => {
		card.setAttribute("aria-pressed", String(card === selectedPlant));
		card.classList.add("is-shuffling");
	});

	[selectedPlant, ...remainingPlants].forEach((card) => plantGrid.append(card));
	window.setTimeout(() => {
		plantGrid.querySelectorAll(".plant-card").forEach((card) => card.classList.remove("is-shuffling"));
	}, 80);

	const plantName = selectedPlant.querySelector("strong")?.textContent;
	if (plantName && plantStatus) {
		plantStatus.textContent = `${plantName} is in front. Pick another to mix things up.`;
	}
});
