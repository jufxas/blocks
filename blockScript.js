// get fonts by downloading them and putting them into "font book". go to settings, in work space section, enter font name\
// rr-oo-yy-gg-bb-ii-vv-ww-nn-pupu-lclc-blbl

// CODE IS DONE. NO BUGS SEEN CUZ IDK
// A LOT OF THINGS ARE STILL CONSOLE LOGGED BUT THATS FINE WITH ME BECAUSE IDK IF THERE ARE ANY BUGS

//

// WATCH OUT FOR OVERLAPPING LETTERS CAUSED BY YOURSELF
// yes i am aware of how condenscending that comment was but lol

function interpretShorthands(code) {
	let twoLetterCols = {
		// MAX character length should be 2
		purple: {
			short: "pu",
			split: ["p", "u"],
			cssCol: "purple",
			rgb: "rgb(128, 0, 128)",
		},
		lightBlue: {
			// doing b/lb/ would interpret to /bl/b instead of black light-blue
			short: "lc",
			split: ["l", "c"],
			cssCol: "skyblue",
			rgb: "rgb(135, 206, 235)",
		},
		black: {
			short: "bl",
			split: ["b", "l"],
			cssCol: "black",
			rgb: "rgb(0, 0, 0)",
		},
	};
	let oneLetterCols = {
		//  SPACING REQUIRED !!!
		red: ["r", "red", "rgb(255, 0, 0)"],
		orange: ["o", "orange", "rgb(255, 165, 0)"],
		yellow: ["y", "yellow", "rgb(255, 255, 0)"],
		green: ["g", "green", "rgb(0, 128, 0)"],
		blue: ["b", "blue", "rgb(0, 0, 255)"],
		indigo: ["i", "indigo", "rgb(75, 0, 130)"],
		violet: ["v", "violet", "rgb(238, 130, 238)"],
		white: ["w", "white", "rgb(255, 255, 255)"],
		none: ["n", "transparent", "rgba(0, 0, 0, 0)"],
		default: ["d", "default"], // default outer = black, default inner = none
	};

	code = code.split("/").join("").split("-");

	let splitUp = [];
	let instructions = [];

	for (let each of code) {
		if (each.length === 2) {
			let counter = 0;

			for (let i in twoLetterCols) {
				if (each === twoLetterCols[i].short) {
					splitUp.push(each);
					counter++;
				}
			}
			if (counter === 0) {
				splitUp.push(each.split(""));
			}
		} else if (each.length === 3) {
			let counter = 0;
			for (let i in twoLetterCols) {
				if (
					each[0] === twoLetterCols[i].split[0] &&
					each[1] === twoLetterCols[i].split[1]
				) {
					splitUp.push(each[0].concat(each[1]), each[2]);
					counter++;
				}
			}
			// new code
			if (counter === 0) {
				splitUp.push(each[0], each.slice(1, 3));
			}
		} else if (each.length === 4) {
			// console.log(each[0].concat(each[1]), each.slice(2, 4))
			splitUp.push(each[0].concat(each[1]), each.slice(2, 4));
		}
	}

	let j = 0;
	for (let i in splitUp) {
		if (typeof splitUp[i] === "object") {
			for (let x of splitUp[i]) {
				for (let i in oneLetterCols) {
					if (x === oneLetterCols[i][0]) {
						instructions.push(`${oneLetterCols[i][1]}`);
					}
				}
				j++;
			}
		} else if (typeof splitUp[i] === "string") {
			if (!Number.isNaN(parseInt(splitUp[i]))) {
				splitUp[i] = parseInt(splitUp[i]);

				for (let e = 0; e < splitUp[i]; e++) {
					instructions.push("default");
					instructions.push("default");
				}
			}

			for (let x in oneLetterCols) {
				if (splitUp[i] === oneLetterCols[x][0]) {
					instructions.push(`${oneLetterCols[x][1]}`);
				}
			}

			for (let b in twoLetterCols) {
				if (splitUp[i] === twoLetterCols[b].short) {
					instructions.push(`${twoLetterCols[b].cssCol}`);
				}
			}

			j++;
		}
	}
	return instructions;
}

// CODE

let instructions = {};
let userInstructionsGiven = false;
let latestClickedButton;

let clickCache = {
	rectClicked: false,
	circleClicked: false,
	selectToChangeClicked: false,
	generateCode: false,
	copyButton: false,
};

$("button#startGame").click(function () {
	$("case").html(`
		<div class="padding"></div>
		<div id="menu">Any Code to Enter?</div>
		<div id="secondPagePadding"></div>
		<button id="YESCODE">Y</button>
		<button id="NOCODE">N</button>
		<div id="containerForYesCode"></div>
	`);
	$("#NOCODE").click(function () {
		bootupTheCode();
	});
	$("#YESCODE").click(function () {
		$("div#containerForYesCode").html(`
			<div class="padding"></div>
			<textarea cols="10" rows="1" id="enterCode"></textarea>
			<div class="padding"></div>
			<button id="submitCode">Submit</button>
		`);

		$("button#submitCode").click(function () {
			userInstructionsGiven = interpretShorthands(
				$("textarea#enterCode").val()
			);
			bootupTheCode();
		});
	});

	// bootupTheCode();
});

function bootupTheCode() {
	let twoLetterCols = {
		// MAX character length should be 2
		purple: {
			short: "pu",
			split: ["p", "u"],
			cssCol: "purple",
			rgb: "rgb(128, 0, 128)",
		},
		lightBlue: {
			// doing b/lb/ would interpret to /bl/b instead of black light-blue
			short: "lc",
			split: ["l", "c"],
			cssCol: "skyblue",
			rgb: "rgb(135, 206, 235)",
		},
		black: {
			short: "bl",
			split: ["b", "l"],
			cssCol: "black",
			rgb: "rgb(0, 0, 0)",
		},
	};
	let oneLetterCols = {
		//  SPACING REQUIRED !!!
		red: ["r", "red", "rgb(255, 0, 0)"],
		orange: ["o", "orange", "rgb(255, 165, 0)"],
		yellow: ["y", "yellow", "rgb(255, 255, 0)"],
		green: ["g", "green", "rgb(0, 128, 0)"],
		blue: ["b", "blue", "rgb(0, 0, 255)"],
		indigo: ["i", "indigo", "rgb(75, 0, 130)"],
		violet: ["v", "violet", "rgb(238, 130, 238)"],
		white: ["w", "white", "rgb(255, 255, 255)"],
		none: ["n", "transparent", "rgba(0, 0, 0, 0)"],
		default: ["d", "default"], // default outer = black, default inner = none
	};
	$("case").html(`
		<button id="goBackMenuButton">
			<img src="./asset/MenuButton.png" width="50" height="50" id="goBackMenuButtonImg">
		</button>
		<div class="padding"></div>
		<div id="rectContainer"></div>
		<div id="circleContainer"></div>
		<select id="selectBGorOutline">
			<option>Change Background</option>
			<option>Change Outline</option>
		</select>
		<button id="genCode">Generate Code</button>
		<div id="containerForCodeGetter"></div>
		`);
	if (!userInstructionsGiven) {
		for (let i = 0; i < 20; i++) {
			let rectName = "rect".concat(i);
			instructions[rectName] = ["default", "default"];
			// [0] = outline, [1] = inner
		}
	} else {
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

		// pUSHING IN CIRCLES, USED TO BE IN OUTER PART

		$("div#circleContainer").html("");

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

		$("button.circle").click(function () {
			clickCache.circleClicked = true;
			let selectWhich =
				$("select#selectBGorOutline").val() === "Change Background"
					? "background"
					: "border";

			let circColor = $(this).css("background-color");
			$("button.rectangle").each(function () {
				// if rect name matches latest btn name, then check if it's border or blackground and apply changes
				$(this).attr("name") === latestClickedButton.name
					? selectWhich === "background"
						? $(this).css(selectWhich, circColor)
						: $(this).css(selectWhich, `1px solid ${circColor}`)
					: "";
			});
		});

		$("select#selectBGorOutline").click(function () {
			clickCache.selectToChangeClicked = true;
		});
	});

	$("case").click(() => {
		if (
			!clickCache.circleClicked &&
			!clickCache.rectClicked &&
			!clickCache.selectToChangeClicked &&
			!clickCache.generateCode &&
			!clickCache.copyButton
		) {
			$("button.circle").hide();
			$("select#selectBGorOutline").hide();
			$("input#codeSender").hide();
			$("input#copy").hide();
		}
		clickCache.circleClicked = false;
		clickCache.rectClicked = false;
		clickCache.selectToChangeClicked = false;
		clickCache.generateCode = false;
		clickCache.copyButton = false;
	});

	$("button#genCode").click(function () {
		clickCache.generateCode = true;
		let takingInstructions = {};
		$("div#containerForCodeGetter").html(`
			<input type="text" id="codeSender">
			<input id="copy" type="button" value="Copy">
		`);

		// creating the instructions
		let btnCount = 0;
		$("button.rectangle").each(function () {
			takingInstructions[btnCount] = {
				outline: $(this).css("border").slice(13, $(this).css("border").length), // sliced so we only get rgb/rgba value
				background: $(this)
					.css("background")
					.replace("none repeat scroll 0% 0% / auto padding-box border-box", "")
					.trim(), // sliced here too for same reason
			};
			btnCount++;
		});

		// translating instructions to letters so that they can be into code (interpreted)

		for (let i in takingInstructions) {
			for (let x in oneLetterCols) {
				if (takingInstructions[i].outline === "rgb(0, 0, 0)") {
					takingInstructions[i].outline = "d";
				} else if (takingInstructions[i].outline === oneLetterCols[x][2]) {
					takingInstructions[i].outline = oneLetterCols[x][0];
				}
			}
		}

		for (let i in takingInstructions) {
			for (let x in twoLetterCols) {
				if (takingInstructions[i].outline === "rgb(0, 0, 0)") {
					takingInstructions[i].outline = "d";
				} else if (takingInstructions[i].outline === twoLetterCols[x].rgb) {
					takingInstructions[i].outline = twoLetterCols[x].short;
				}
			}
		}

		for (let i in takingInstructions) {
			for (let x in oneLetterCols) {
				if (takingInstructions[i].background === "rgba(0, 0, 0, 0)") {
					takingInstructions[i].background = "d";
				} else if (takingInstructions[i].background === oneLetterCols[x][2]) {
					takingInstructions[i].background = oneLetterCols[x][0];
				}
			}
		}

		for (let i in takingInstructions) {
			for (let x in twoLetterCols) {
				if (takingInstructions[i].background === "rgba(0, 0, 0, 0)") {
					takingInstructions[i].background = "d";
				} else if (takingInstructions[i].background === twoLetterCols[x].rgb) {
					takingInstructions[i].background = twoLetterCols[x].short;
				}
			}
		}

		console.log(takingInstructions);

		let fullStringFromInstructions = [];
		for (let i in takingInstructions) {
			fullStringFromInstructions.push(
				takingInstructions[i].outline,
				takingInstructions[i].background
			);
		}
		console.log(fullStringFromInstructions);
		for (let i = 0; i < fullStringFromInstructions.length; i++) {
			if (i % 2 === 0 && i !== 0) {
				// not gonna have code with slashes anymore if it seems to work lol
				fullStringFromInstructions[i] = "-".concat(
					fullStringFromInstructions[i]
				);
			}
		}

		fullStringFromInstructions = fullStringFromInstructions.join("");

		// now compress repeating dd (i.e, dd-dd-dd-dd) into xdd (4dd)
		console.log(fullStringFromInstructions);
		fullStringFromInstructions = fullStringFromInstructions.split("-");
		let ddDetectionIndexes = []; // default default detection indexes
		for (let i = 0; i < fullStringFromInstructions.length; i++) {
			if (fullStringFromInstructions[i] === "dd") {
				ddDetectionIndexes.push(i);
			}
		}
		console.log(fullStringFromInstructions, ddDetectionIndexes);

		let shortenedCode = [];
		let repeatCounter = 0;

		for (let i = 0; i < fullStringFromInstructions.length; i++) {
			if (i === 0) {
				if (
					(fullStringFromInstructions[i] === "dd" &&
						fullStringFromInstructions[i + 1] !== "dd") ||
					fullStringFromInstructions[i] !== "dd"
				) {
					shortenedCode.push(fullStringFromInstructions[i]);
				}
			} else if (i !== 0) {
				if (
					fullStringFromInstructions[i] === "dd" &&
					fullStringFromInstructions[i - 1] === "dd"
				) {
					repeatCounter++;
				} else {
					if (
						repeatCounter === 0 &&
						fullStringFromInstructions[i] === "dd" &&
						fullStringFromInstructions[i + 1] !== "dd"
					) {
						shortenedCode.push(fullStringFromInstructions[i]);
					}

					if (repeatCounter !== 0) {
						console.log(repeatCounter + 1);
						let num = repeatCounter + 1 + "";
						shortenedCode.push(num.concat("dd"));
					}
					if (fullStringFromInstructions[i] !== "dd") {
						shortenedCode.push(fullStringFromInstructions[i]);
					}
					repeatCounter = 0;
				}
			}
			if (i === fullStringFromInstructions.length - 1 && repeatCounter !== 0) {
				let num = repeatCounter + 1 + "";
				shortenedCode.push(num.concat("dd"));
				console.log(repeatCounter + 1);
			}
		}
		shortenedCode = shortenedCode.join("-");
		console.log(shortenedCode);

		$("input#codeSender").val(shortenedCode);

		$("input#copy").click(function () {
			clickCache.copyButton = true;
			// copy and pasted code from https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
			let copyText = document.getElementById("codeSender");
			copyText.select();
			copyText.setSelectionRange(0, 99999); /* For mobile devices */

			/* Copy the text inside the text field */
			document.execCommand("copy");
		});
	});

	$("button#goBackMenuButton").click(function () {
		$("case").html(`
		<div class="padding"></div>
		<div id="menu">Any Code to Enter?</div>
		<div id="secondPagePadding"></div>
		<button id="YESCODE">Y</button>
		<button id="NOCODE">N</button>
		<div id="containerForYesCode"></div>
	`);
		$("#NOCODE").click(function () {
			bootupTheCode();
		});
		$("#YESCODE").click(function () {
			$("div#containerForYesCode").html(`
			<div class="padding"></div>
			<textarea cols="10" rows="1" id="enterCode"></textarea>
			<div class="padding"></div>
			<button id="submitCode">Submit</button>
		`);

			$("button#submitCode").click(function () {
				userInstructionsGiven = interpretShorthands(
					$("textarea#enterCode").val()
				);
				bootupTheCode();
			});
		});
	});
}
