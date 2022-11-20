function textAbstract(text, length) {
	if (text == null) {
		return ''
	}
	if (text.length <= length) {
		return text
	}

	return text.substring(0, length - 2) + '...'
}

export { textAbstract }
