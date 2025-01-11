window.addEventListener("load", function() {
	
	if (localStorage.getItem("add-entry-form") === "hide") {
		$("#add-entry-form").hide();
	}
	
	$("#add-entry-form").submit(addEntry);
	$("#add-entry-btn").on("click", switchAddEntryArea);
	$("#import-btn").on("click", importLibrary);
	$("#import-input").on("change", importLibFile);
	$("#export-btn").on("click", exportLibrary);
	$("#edit-btn").on("click", switchEditMode);
	$("#sort-option-select").on("change", sortEntries);
	$("#sort-direction-select").on("change", sortEntries);
	$("#entry-cancel-btn").on("click", switchAddEntryArea);
	
	// set the default add entry date to today
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	// January is 0
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	$("#date-input").val(`${yyyy}-${mm}-${dd}`);
	
	let library = JSON.parse(localStorage.getItem("library"));
	
	if (library) {
		sortEntries();
	}
	
});

function importLibrary() {
	
	// trigger the import input event
	$("#import-input").click();
	
}

function importLibFile(e) {
	
	let file = e.target.files[0]; 
	
	var reader = new FileReader();
	reader.readAsText(file, 'UTF-8');
	reader.onload = validateStoreLibrary;
	
}

function validateStoreLibrary(e) {
	
	let libContent = e.target.result;
	
	let libParsed = JSON.parse(libContent);
	
	for (let entry of libParsed) {
		if (!("id" in entry) ||
			!("title" in entry) ||
			!("type" in entry) ||
			!("date" in entry) ||
			!("notes" in entry)) {
			return;
		}
	}
	
	localStorage.setItem("library", libContent);
	
	sortEntries();
	
}

function exportLibrary() {
	
	let libContent = localStorage.getItem("library")
	
	let file = new Blob([libContent], {type: "application/json"});
	
	// create the file download link and automatically 
	// open it
	let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = "library.json";
    document.body.appendChild(a);
    a.click();
	
	setTimeout(function() {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);  
	}, 0); 
	
}

function switchAddEntryArea() {
	
	let addEntryForm = $("#add-entry-form");
	
	if (addEntryForm.css("display") !== "none") {
		localStorage.setItem("add-entry-form", "hide");
		addEntryForm.hide();
	} else {
		localStorage.setItem("add-entry-form", "show");
		addEntryForm.show();
	}
	
}

function switchEditMode() {
	
	let editMode = JSON.parse(localStorage.getItem("edit-mode"));
	
	let entryDelSigns = $(".entry-del-sign");
	
	editMode ? entryDelSigns.hide() : entryDelSigns.show();
	
	localStorage.setItem("edit-mode", JSON.stringify(!editMode));
	
}

function addEntry() {
	
	let library = JSON.parse(localStorage.getItem("library"));
	
	let entry = {
		"id": getUniqueEntryID(),
		"title": $("#title-input").val(),
		"type": $("#type-select").val(),
		"date": $("#date-input").val().replaceAll("-", "/"),
		"notes": $("#notes-textarea").val()
	}
	
	library.push(entry);
	
	localStorage.setItem("library", JSON.stringify(library));
	
	appendEntry(entry);
	
}

function getUniqueEntryID() {
	
	let library = JSON.parse(localStorage.getItem("library"));
	
	let id = -1;
	
	for (let entry of library) {
		let entryID = entry["id"];
		if (id < entryID) {
			id = entryID;
		}
	}
	
	return id + 1;
	
}

function appendEntry(entry) {
	
	let entriesOL = $("#entries-ol");
	
	let entryLI = document.createElement("li");
	entryLI.classList += "entry";
	
	let entryTitle = document.createElement("h4");
	entryTitle.innerText = entry["title"];
	entryLI.appendChild(entryTitle);
	
	let entryDelSign = document.createElement("i");
	entryDelSign.id = "entryDel" + entry["id"];
	entryDelSign.classList += "fa-solid fa-xmark entry-del-sign";
	entryDelSign.onclick = removeEntry;
	entryLI.appendChild(entryDelSign);
	
	let entryTypeDate = document.createElement("div");
	entryTypeDate.id = "entry-type-date";
	
	let entryTypeP = document.createElement("p");
	entryTypeP.innerText = entry["type"];
	entryTypeDate.appendChild(entryTypeP);
	
	let entryDateP = document.createElement("p");
	entryDateP.innerText = new Date(entry["date"]).toLocaleDateString("en-US");
	entryTypeDate.appendChild(entryDateP);
	
	entryLI.appendChild(entryTypeDate);
	
	let entryNotesP = document.createElement("p");
	entryNotesP.innerText = entry["notes"];
	entryLI.appendChild(entryNotesP);
	
	entriesOL.append(entryLI);
	
}

function removeEntry() {
	
	// get the ID after the word 'entryDel'
	let remEntryID = Number($(this).attr("id").substring(8));
	
	// remove HTML for the entry
	$(this).closest(".entry").remove();
	
	// remove the entry from localStorage
	
	let library = JSON.parse(localStorage.getItem("library"));
	
	for (let i = 0; i < library.length; i++) {
		if (library[i]["id"] == remEntryID) {
			library.splice(i, 1);
			break;
		}
	}
	
	// update the highest ID entry with the removed entry ID
	// so as to always use unique IDs, and not to overflow
	let highestIDIndex = 0;
	let highestID = 0;
	for (let i = 0; i < library.length; i++) {
		let id = library[i]["id"];
		if (id > highestID) {
			highestID = id;
			highestIDIndex = i;
		}
	}
	if (library.length > 0) {
		library[highestIDIndex]["id"] = remEntryID;
	}
	
	localStorage.setItem("library", JSON.stringify(library));
	
}

function sortEntries() {
	
	let library = JSON.parse(localStorage.getItem("library"));
	
	let sortOption = $("#sort-option-select").val();
	let sortDirection = $("#sort-direction-select").val();
	
	localStorage.setItem("sort-option", sortOption);
	localStorage.setItem("sort-direction", sortDirection);
	
	let mod = (sortDirection === "Ascending") ? 1 : -1;
	
	if (sortOption === "Title") {
		
		library.sort((a, b) => mod * a["title"].localeCompare(b["title"]));
		
	} else if (sortOption === "Date") {
		
		library.sort((a, b) => mod * (new Date(a["date"]) - new Date(b["date"])));
		
	}
	
	localStorage.setItem("library", JSON.stringify(library));
	
	displayLibrary();
	
}

function clearLibrary() {
	
	$("#entries-ol").empty();
	
}

function displayLibrary() {
	
	clearLibrary();
	
	let library = JSON.parse(localStorage.getItem("library"));
	
	for (let entry of library) {
		appendEntry(entry);
	}
	
}
