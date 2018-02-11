export const trimWhiteSpace = (htmlString: string): string => {
	return htmlString.trim().replace(/\>\s*\</g, '><')
}
