export function initSelects() {
	
	// Dynamically resize selects
	
	let $selectList = $("select");
	
	$selectList.each(function() {
		
		setSelectWidth.apply(this);
		
	});
	
	$selectList.on("change", function() {
		
		setSelectWidth.apply(this);
		
	});
	
}

function setSelectWidth() {
	
    let $tempSelect = $("<select><option>" + $(this).val() + "</option></select>");
    
	$tempSelect.css({display: "none"}).appendTo("body");
    
	// The 1.03 prevents the text from clipping 
	$(this).width($tempSelect.width() * 1.03);
	
	$tempSelect.remove();
}
