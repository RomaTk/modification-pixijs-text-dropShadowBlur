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
	if (style.dropShadow && style.dropShadowBlur) {
		let newText = pixiText.text;
		let newStyle = Object.assign({}, style);
		if (style.wordWrap == true) {
			newText = deleteUnnecessarySymbols(pixiText.text, newStyle._whiteSpace);
			newStyle.whiteSpace = 'pre';
		}
		return new pixiText.constructor(newText, newStyle);
	} else {
		return;
	}
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

const mainDecorations = function (pixiText) {
	if (pixiText.style.wordWrap) {
		const wasText = pixiText.text;
		let words = getSplitedWords(wasText);
		if (pixiText.style.breakWords) {
			words = getSplitedWordsAccordingWidth(pixiText, words);
		}
		const breaks = getBreaks(pixiText, words);
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
	} else {
		const wasText = pixiText.text;
		let words = getSplitedWords(wasText);
		const breaks = getBreaks(pixiText, words);
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

export default function (pixiText) {
	const copy = createGoodCopy(pixiText);
	if (copy) {
		mainDecorations(copy);
		copy.x = pixiText.x - (copy.width - pixiText.width) / 2;
		copy.y = pixiText.y - (copy.height - pixiText.height) / 2;
		return copy;
	} else {
		return pixiText;
	}
}