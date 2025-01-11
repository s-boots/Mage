window.addEventListener("load", function() {
	
	$("#draw-card-btn").on("click", drawCard);
	
	// check if a tarot card was already drawn
	let tarotCard = localStorage.getItem("tarot-card");
	if (tarotCard) {
		updateTarotCard(tarotCard);
	}
	
});

function drawCard() {
	
	let rng = Math.floor(Math.random() * tarotCards.length);
	
	let cardTitle = tarotCards[rng];
	
	updateTarotCard(cardTitle)
	
	localStorage.setItem("tarot-card", cardTitle);
	
}

function updateTarotCard(title) {
	
	// images are of the Rider-Waite Deck
	let img = `img/tarot/${title.replaceAll(" ", "_")}.jpg`
	
	$("#card-title").text(title);
	
	let cardImgElem = $("#card-img");
	cardImgElem.attr("src", img);
	cardImgElem.attr("alt", title);
	
}

const tarotCards = [
	'Fool',
	'Magician',
	'High Priestess',
	'Empress',
	'Emperor',
	'Hierophant',
	'Lovers',
	'Chariot',
	'Strength',
	'Hermit',
	'Wheel of Fortune',
	'Justice',
	'Hanged Man',
	'Death',
	'Temperance',
	'Devil',
	'Tower',
	'Star',
	'Moon',
	'Sun',
	'Judgement',
	'World',
	'Ace of Wands',
	'Two of Wands',
	'Three of Wands',
	'Four of Wands',
	'Five of Wands',
	'Six of Wands',
	'Seven of Wands',
	'Eight of Wands',
	'Nine of Wands',
	'Ten of Wands',
	'Page of Wands',
	'Knight of Wands',
	'Queen of Wands',
	'King of Wands',
	'Ace of Pentacles',
	'Two of Pentacles',
	'Three of Pentacles',
	'Four of Pentacles',
	'Five of Pentacles',
	'Six of Pentacles',
	'Seven of Pentacles',
	'Eight of Pentacles',
	'Nine of Pentacles',
	'Ten of Pentacles',
	'Page of Pentacles',
	'Knight of Pentacles',
	'Queen of Pentacles',
	'King of Pentacles',
	'Ace of Cups',
	'Two of Cups',
	'Three of Cups',
	'Four of Cups',
	'Five of Cups',
	'Six of Cups',
	'Seven of Cups',
	'Eight of Cups',
	'Nine of Cups',
	'Ten of Cups',
	'Page of Cups',
	'Knight of Cups',
	'Queen of Cups',
	'King of Cups',
	'Ace of Pentacles',
	'Two of Swords',
	'Three of Swords',
	'Four of Swords',
	'Five of Swords',
	'Six of Swords',
	'Seven of Swords',
	'Eight of Swords',
	'Nine of Swords',
	'Ten of Swords',
	'Page of Swords',
	'Knight of Swords',
	'Queen of Swords',
	'King of Swords',
]
