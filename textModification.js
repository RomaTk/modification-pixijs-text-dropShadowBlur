const deleteUnnecessarySymbols = function (text, spaceType) {
	let changedText = text;
	switch (spaceType) {
		case 'normal':
			while (changedText.indexOf('\n') > -1) {
				changedText = changedText.replace('\n', '');
			}
		case 'pre-line':
			while (changedText.indexOf('  ') > -1) {
				changedText = changedText.replace('  ', ' ');
			}
		default:
			return changedText
	}
}

const getSplitedWords = function (text) {
	const returnArray = [];
	if (text.length > 0) {
		const splitSymbols = [' ', '\n'];
		let word = text[0];
		for (let i = 1; i < text.length; i += 1) {
			if (splitSymbols.includes(text[i])) {
				if (word.length > 0) {
					returnArray.push(word);
				}
				returnArray.push(text[i]);
				word = '';
			} else {
				word += text[i];
			}
		}
		if (word.length > 0) {
			returnArray.push(word);
		}
	}
	return returnArray;
}

const getSplitedWordsAccordingWidth = function (pixiText, words) {
	let newWords = [];
	const wasText = pixiText.text;
	for (let i = 0; i < words.length; i += 1) {
		pixiText.text = words[i][0];
		const splitedWords = [];
		let wasHeight = pixiText.height;
		let beginSlice = 0;
		for (let j = 1; j < words[i].length; j += 1) {
			pixiText.text += words[i][j];
			if (wasHeight != pixiText.height) {
				splitedWords.push(pixiText.text.slice(beginSlice, j));
				wasHeight = pixiText.height;
				beginSlice = j;
			}
		}
		splitedWords.push(pixiText.text.slice(beginSlice, pixiText.text.length));
		newWords = [...newWords, ...splitedWords];
	}
	pixiText.text = wasText;
	return newWords;
}

const createGoodCopy = function (pixiText) {
	const style = pixiText.style;
	let newText = pixiText.text;
	let newStyle = Object.assign({}, style);
	if (style.wordWrap == true) {
		newText = deleteUnnecessarySymbols(pixiText.text, newStyle._whiteSpace);
	}
	return new pixiText.constructor(newText, newStyle);
}

const getBreaks = function (pixiText, words) {
	const generateText = function (beginIndex, endIndex) {
		let text = '';
		for (let i = beginIndex; i < endIndex; i += 1) {
			text += words[i];
		}
		return text;
	}
	let breaks = [];
	pixiText.text = '';
	let wasHeight = pixiText.height;
	let beginIndex = 0;
	for (let i = 0; i < words.length; i += 1) {
		pixiText.text += words[i];
		if (pixiText.height != wasHeight) {
			breaks.push(generateText(beginIndex, i));
			beginIndex = i;
			wasHeight = pixiText.height;
			if (words[i] == '\n') {
				beginIndex = i + 1;
			}
		}
	}
	breaks.push(generateText(beginIndex, words.length));
	return breaks;
}

const getSingLine = function (amount, sign) {
	let text = '';
	for (let i = 0; i < amount; i += 1) {
		text += sign;
	}
	return text;
}

const mainDecorations = function (pixiText, originalText, isChildObject) {
	const wasText = pixiText.text;
	let words = getSplitedWords(wasText);
	if (pixiText.style.wordWrap) {
		if (pixiText.style.breakWords) {
			words = getSplitedWordsAccordingWidth(pixiText, words);
		}
	}
	const breaks = getBreaks(pixiText, words);
	pixiText.style.whiteSpace = 'pre';
	const signSize = calcSignSize(pixiText);
	setPropertiesForCopy(pixiText);
	const newLinesAmount = Math.ceil(pixiText.style.dropShadowBlur / signSize['\n'].height);
	const newSpacesAmount = Math.ceil(pixiText.style.dropShadowBlur / signSize[' '].width);
	let lastText = getSingLine(newLinesAmount, '\n');
	for (let str of breaks) {
		lastText += getSingLine(newSpacesAmount, ' ') + str + getSingLine(newSpacesAmount, ' ') + '\n';
	}
	lastText += getSingLine(newLinesAmount - 1, '\n');
	pixiText.text = lastText;

	///set scale properties

	if (!isChildObject) {
		pixiText.y = -newLinesAmount * signSize['\n'].height;
		pixiText.x = -newSpacesAmount * signSize[' '].width;

		const coefficientWidth = pixiText.width / (pixiText.width + pixiText.x * 2);
		const coefficientHeight = pixiText.height / (pixiText.height + pixiText.y * 2);
		pixiText.width = originalText.width * coefficientWidth;
		pixiText.height = originalText.height * coefficientHeight;
		pixiText.x = -(pixiText.width - originalText.width) / 2;
		pixiText.y = -(pixiText.height - originalText.height) / 2;
		const anchorX = (originalText.anchor.x * originalText.width) / pixiText.width;
		const anchorY = (originalText.anchor.y * originalText.height) / pixiText.height;
		pixiText.anchor.set(anchorX, anchorY);
		pixiText.pivot.x = originalText.pivot.x;
		pixiText.pivot.y = originalText.pivot.y;
	}
}

const setPropertiesForCopy = function (pixiText) {
	pixiText.style.wordWrap = false;
	pixiText.text = '';
}

const calcSignSize = function (pixiText) {
	const baseSign = '1';
	const originalText = pixiText.text;
	const originalStyles = Object.assign({}, pixiText.style);
	const returnObject = {
		' ': {width: 0, height: 0},
		'\n': {width: 0, height: 0}
	}
	pixiText.style.wordWrap = false;
	pixiText.text = baseSign;
	const width = pixiText.width;
	const height = pixiText.height;
	//changes in width
	for (let symbol in returnObject) {
		pixiText.text = symbol + baseSign;
		returnObject[symbol].width = pixiText.width - width;
		returnObject[symbol].height = pixiText.height - height;
	}
	pixiText.text = originalText;
	pixiText.style = originalStyles;
	return returnObject;
}

export default function (pixiText, intenseShadow) {
	const copy = createGoodCopy(pixiText);
	mainDecorations(copy, pixiText, false);
	copy.x += pixiText.x;
	copy.y += pixiText.y;
	if (intenseShadow) {
		for (let i = 0; i < intenseShadow; i += 1) {
			const newCopy = createGoodCopy(pixiText);
			mainDecorations(newCopy, pixiText, true);
			copy.addChild(newCopy);
			newCopy.anchor.x = 0;
			newCopy.anchor.y = 0;
			newCopy.pivot.y = newCopy.height * copy.anchor.y;
			newCopy.pivot.x = newCopy.width * copy.anchor.x;
		}
	}

	return copy;
}