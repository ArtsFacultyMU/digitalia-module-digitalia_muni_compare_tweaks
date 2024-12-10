async function toggle_comparison_visibility(settings)
{
	const compare_block = document.querySelector(settings["block_selector"]);
	const compare_block_text = compare_block.querySelector(settings["text_selector"]);

	if (window.location.href.search(settings["comparison_url_snippet"]) != -1) {
		compare_block.classList.add("hidden");
	}
	
	if (compare_block_text.innerHTML == "Compare (0)") {
		compare_block.classList.remove("fade-in");
		compare_block.classList.add("fade-out");
		compare_block.classList.add("no-click");
		apply_styles(settings);
	} else {
		compare_block.classList.add("fade-in");
		compare_block.classList.remove("fade-out");
		compare_block.classList.remove("no-click");
		apply_styles(settings);
	}

}


// borrowed/stolen from https://stackoverflow.com/questions/10783463/javascript-detect-ajax-requests
function new_xhr(old_xhr, settings) {
	let real_xhr = new old_xhr();
	real_xhr.addEventListener("loadend", function() {
		if (real_xhr.status == 200){
			toggle_comparison_visibility(settings);
		}
	}, false);

	return real_xhr;
}

function apply_styles(settings)
{
	const compare_block = document.querySelector(settings["block_selector"]);
	compare_block.classList.add("compare-floating");

	const compare_block_text = compare_block.querySelector(settings["text_selector"]);
	compare_block_text.classList.add("button");
}


function unhide(settings)
{
	const compare_block = document.querySelector(settings["block_selector"]);
	compare_block.classList.remove("hidden");
}

function init(drupalSettings)
{
	const logo_block = document.querySelector("header .block-sitelogo .content a");

	if (!logo_block) {
		return;
	}

	let PLATFORM_CODE = logo_block.href.split("/").pop();

	if (PLATFORM_CODE == "") {
		PLATFORM_CODE = "a3d";
	}

	let old_xhr = window.XMLHttpRequest;

	const settings = drupalSettings.digitaliaMuniCompareTweaks.dynamicCompare[PLATFORM_CODE];

	window.XMLHttpRequest = new_xhr.bind(this, old_xhr, settings);
	
	apply_styles(settings);
	toggle_comparison_visibility(settings);
	unhide(settings);
}

document.addEventListener("DOMContentLoaded", init.bind(this, drupalSettings));
