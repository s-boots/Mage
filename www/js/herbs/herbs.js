import { displayItemPopup } from "../global/item-popup.js";

window.addEventListener("load", function() {
	
	herbList.forEach(appendHerb);
	
	$("#herb-input").on("keyup", searchHerb);
	
});

function searchHerb() {
	
	let herbInput = $("#herb-input");
	
	let herbName = herbInput.val().toLowerCase();
	let herbLIs = $(".herb-li");
	
	// loop through the list items and hide any whose name 
	// doesn't include the searched herb
	for (let i = 0; i < herbLIs.length; i++) {
        if (!herbLIs[i].innerHTML.toLowerCase().includes(herbName)) {
            herbLIs[i].style.display = "none";
        } else {
            herbLIs[i].style.display = "list-item";
        }
    }
	
}

function displayHerbPopup() {
	
	let herbName = this.innerText;
	// it should be impossible for this for loop to not 
	// break at some point
	for (let i = 0; i < herbList.length; i++) {
		let herb = herbList[i];
		if (herb["name"] == herbName) {
			var herbImg = "img/herbs/" + herb["img"];
			var herbDesc = herb["desc"];
			var herbAttr = herb["attr"];
			break;
		}
	}
	
	displayItemPopup(herbName, herbImg, herbDesc, herbAttr);
	
}

function appendHerb(herbData) {
	
	let herbName = herbData["name"];
	
	// add a new option to search for
	let herbDatalist = $("#herb-datalist");
	herbDatalist.append("<option>" + herbName +"</option>");
	
	// append a new list item to the item list
	let herbOL = $("#herb-ol");
	let herbLI = document.createElement("li");
	herbLI.classList += "herb-li";
	herbLI.innerText += herbName;
	herbLI.onclick = displayHerbPopup;
	herbOL.append(herbLI);
	
}

const herbList = [
	{
		"name": "Basil",
		"img": "basil.jpg",
		"desc": "Basil is a fragrant herb used for peace, protection, and love.",
		"attr": {
			"Botanical Name": "",
			"Edible": "Yes",
			"Parts Used": "",
			"Element": "",
			"Properties": "",
			"Uses": "",
			"Magickal Uses": "Peace, Protection, Love",
			"Astrological Sign": ""
		}
	},
	{
		"name": "Cinnamon",
		"img": "cinnamon.jpg",
		"desc": "Cinnamon is an aromatic spice hailing from India.",
		"attr": {
			"Botanical Name": "Cinnamomum cassia, Cinnamomum zeylanicum",
			"Edible": "Yes",
			"Parts Used": "Bark, Twigs, Dried Flowers",
			"Element": "Fire",
			"Properties": "Aromatic, Stimulant, Warming, Demulcent, Sweet, Astringent, Analgesic, Hypoglycemic, Antioxidant, Antimicrobial",
			"Uses": "Toothache, Diarrhea, Blood Movement, Infections, Arthritis, Insulin Resistance, Colds/Flu",
			"Magickal Uses": "",
			"Astrological Sign": ""
		}
	},
	{
		"name": "Mugwort",
		"img": "mugwort.jpg",
		"desc": "Mugwort is a herb.",
		"attr": {
			"Botanical Name": "Artemisia vulgaris",
			"Edible": "Yes",
			"Parts Used": "Flowering Tops, Leaves",
			"Element": "",
			"Properties": "Bitter",
			"Uses": "Ease Menstrual Cramps, Vivid Dreams, Lucid Dreams",
			"Magickal Uses": "Divination",
			"Astrological Sign": ""
		}
	},
];
