import parse5 = require('parse5')
import { insertNodes } from '../index'
import { trimWhiteSpace } from '../helper'

describe('insertNodes', () => {
	test('insert arbitrary node', async () => {
		const inputHlmlString = `
<html>
  <head></head>
  <body></body>
</html>
`
		const expectedHtmlString = `
<html>
  <head></head>
  <body>
    <div></div>
  </body>
</html>
`
		const divFrgment = parse5.parseFragment('<div></div>').childNodes.pop()
		const document = parse5.parse(inputHlmlString)

		insertNodes(document, divFrgment, {
			type: 'tag',
			value: 'body',
			insertPosition: 'append'
		})
		expect(trimWhiteSpace(parse5.serialize(document))).toBe(trimWhiteSpace(expectedHtmlString))
	})

	test('insert arbitrary node', async () => {
		const inputHlmlString = `
<html>
  <head>
    <script src="js/test.js"></script>
  </head>
  <body></body>
</html>
`
		const expectedHtmlString = `
<html>
  <head>
    <script src="js/beforeTest.js"></script>
    <script src="js/test.js"></script>
  </head>
  <body></body>
</html>
`
		const scriptFrgment = parse5.parseFragment('<script src="js/beforeTest.js"></script>').childNodes.pop()
		const document = parse5.parse(inputHlmlString)

		insertNodes(document, scriptFrgment, {
			type: 'tag',
			value: 'head',
			insertPosition: 'prepend'
		})
		expect(trimWhiteSpace(parse5.serialize(document))).toBe(trimWhiteSpace(expectedHtmlString))
	})
})
