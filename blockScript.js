//status: u click on square and circle pop up also html more organization
//bad: i have to preload circles with a none-display because when i try to click on button that's appened within .rect .click, it doesnt say anything is being clicked.
// TODO: make it differentiate b/w outline and background

// get fonts by downloading them and putting them into "font book". go to settings, in work space section, enter font name\

import {
	interpretShorthands,
	oneLetterCols,
	twoLetterCols,
} from "./instructionMaker.js";

let instructions = {};
let userInstructionsGiven = true;
let latestClickedButton;
let clickCache = {
	rectClicked: false,
	circleClicked: false,
	selectToChangeClicked: false,
};

if (!userInstructionsGiven) {
	for (let i = 0; i < 20; i++) {
		let rectName = "rect".concat(i);
		instructions[rectName] = ["default", "default"];
		// [0] = outline, [1] = inner
	}
} else {
	// userInstructionsGiven = interpretShorthands("w/pu/-2dd-w/bl/-w/lb/-nn-oo-v/pu/");
	// userInstructionsGiven = interpretShorthands("/lb/o-/lb/y-6dd-ng-r/bl/-/pu/n-bbl");
	userInstructionsGiven = interpretShorthands(
		"rr-oo-yy-gg-bb-ii-vv-ww-nn-dd-pupu-blbl-lblb"
	);
	// works without the slashes O_O
	console.log(userInstructionsGiven);
	console.log(userInstructionsGiven.length / 2);

	// put in filled in squares
	for (var x = 0; x < userInstructionsGiven.length - 1; x++) {
		if (x > 0) {
			x++;
		}
		let rectName = "rect".concat(x / 2);
		instructions[rectName] = [
			userInstructionsGiven[x],
			userInstructionsGiven[x + 1],
		];
		// [0] = outline, [1] = inner
	}

	//put undescribed squares with default deafault [not really necessary when script will make the short hand code]
	if (userInstructionsGiven.length / 2 < 20) {
		let p = Math.ceil(x / 2); // counter so that it can continue to make the names from where x left off

		for (let e = 0; e < 20 - userInstructionsGiven.length / 2; e++) {
			let rectName = "rect".concat(p);
			instructions[rectName] = ["default", "default"];
			p++;
		}
	}
}

console.log(instructions);

for (let i = 0; i < 20; i++) {
	// makes button

	let outline = instructions[`rect${i}`][0];
	let background = instructions[`rect${i}`][1];

	if (i === 0) {
		$("#rectContainer").append(
			`<button class="rectangle" name="rect${i}"></button>`
		);
	} else {
		$("#rectContainer").append(
			`<button class="rectangle" name="rect${i}"></button>`
		);
	}
	// applies outline and background from instructions
	$(`button[name='rect${i}']`).css("border", `1px solid ${outline}`);
	$(`button[name='rect${i}']`).css("background", `${background}`);
}

/* CIRCLES 
$("case").append(`
    <button class="circle"></button>
    <button class="outerCircle"></button>`
) // OUTER CICRLCE HAS TO GO TO display: block;
*/

// have to do this because jquery think it dont exist or something?
// loading circle
for (const index in oneLetterCols) {
	if (oneLetterCols[index][2] !== undefined) {
		// onelet[index][2] is rgb values. also have to check for undefined so we dont have 'background-color: undefined'
		if (oneLetterCols[index][1] === "transparent") {
			$("div#circleContainer").append(`
			<button class="circle" style="background-color: transparent; border: 1px solid rgb(0, 0, 0);"></button>
			`);
		} else {
			$("div#circleContainer").append(`
			<button class="circle" style="background-color: ${oneLetterCols[index][2]}; border: 1px solid rgba(0, 0, 0, 0);"></button>
			`);
		}
	}
}
for (const index in twoLetterCols) {
	$("div#circleContainer").append(
		`<button class="circle" style="background-color: ${twoLetterCols[index].rgb}; border: 1px solid rgb(0, 0, 0, 0);"></button>`
	);
}
$("button.circle").hide();
$("select#selectBGorOutline").hide();

$("button.rectangle").click(function () {
	clickCache.rectClicked = true;
	$("button.circle").show();
	$("select#selectBGorOutline").show();
	// $("div#circleContainer").html("");

	// btn click => getting btn name, border, background
	// NOTE: DONT USE ARROW FUNCTION

	latestClickedButton = {
		name: $(this).attr("name"),
		outline: $(this).css("border").slice(13, $(this).css("border").length), // sliced so we only get rgb/rgba value
		background: $(this)
			.css("background")
			.replace("none repeat scroll 0% 0% / auto padding-box border-box", "")
			.trim(), // sliced here too for same reason
	};
	// NOTE: if rgba(x, y, z, 0), then it's transparent
	console.log(latestClickedButton);
});

$("button.circle").click(function () {
	clickCache.circleClicked = true;
	let circColor = $(this).css("background-color");
	console.log(circColor);
});

$("select#selectBGorOutline").click(function () {
	clickCache.selectToChangeClicked = true;
});

$("case").click(() => {
	if (
		!clickCache.circleClicked &&
		!clickCache.rectClicked &&
		!clickCache.selectToChangeClicked
	) {
		$("button.circle").hide();
		$("select#selectBGorOutline").hide();
	}
	clickCache.circleClicked = false;
	clickCache.rectClicked = false;
	clickCache.selectToChangeClicked = false;
});
