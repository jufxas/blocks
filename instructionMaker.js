// WATCH OUT FOR OVERLAPPING LETTERS CAUSED BY YOURSELF
// yes i am aware of how condenscending that comment was but lol

export let twoLetterCols = {
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
export let oneLetterCols = {
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

export function interpretShorthands(code) {
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
