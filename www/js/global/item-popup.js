export function removeItemPopup() {
	
	// $("#item-popup").hide();
	$("#item-popup").remove();
	
}

export function displayItemPopup(title, img, desc, attr) {
	
	// create the popup container, and add it to the end 
	// of the body
	let tempPop = document.createElement("div")
	tempPop.id = "item-popup";
	$("#main-content-area").append(tempPop)
	
	let itemPop = $("#item-popup");
	
	let closeSign = document.createElement("i");
	closeSign.classList += "close-sign fa-solid fa-xmark";
	closeSign.onclick = removeItemPopup;
	itemPop.append(closeSign);
	
	let titleH2 = document.createElement("h2");
	titleH2.classList += "item-title";
	titleH2.innerText = title;
	itemPop.append(titleH2)
	
	// only append an image if there was a specified 
	// uri
	if (img !== "") {
		let itemImg = document.createElement("img");
		itemImg.src = img;
		itemImg.alt = title;
		// this fills the width of the image to the entirety 
		// of the parent container, while still preserving the 
		// aspect ratio
		itemImg.style.width = "100%";
		itemPop.append(itemImg);
	}
	
	if (desc !== "") {
		let itemDescP = document.createElement("p");
		itemDescP.classList += "item-desc";
		itemDescP.innerText = desc;
		itemPop.append(itemDescP)
	}
	
	if (attr) {
		let itemAttrCont = document.createElement("div");
		itemAttrCont.classList += "attr-cont";
		for (let key in attr) {
			let val = attr[key];
			if (val) {
				let attrTitleH3 = document.createElement("h3");
				let attrValP = document.createElement("p");
				attrTitleH3.innerText = key;
				attrValP.innerText = val;
				itemAttrCont.appendChild(attrTitleH3);
				itemAttrCont.appendChild(attrValP);
			}
		}
		itemPop.append(itemAttrCont)
	}
	
	itemPop.show();
	
}