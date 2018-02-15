import { HtmlHandler } from '../index'
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
		const htmlhandler = new HtmlHandler(inputHlmlString)
		htmlhandler.insertNodes(htmlhandler.parseFragment('<div></div>'), {
			type: 'tag',
			value: 'body',
			insertPosition: 'append'
		})
		expect(trimWhiteSpace(htmlhandler.serialize())).toBe(trimWhiteSpace(expectedHtmlString))
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
		const htmlhandler = new HtmlHandler(inputHlmlString)
		htmlhandler.insertNodes(htmlhandler.parseFragment('<script src="js/beforeTest.js"></script>'), {
			type: 'tag',
			value: 'head',
			insertPosition: 'prepend'
		})
		expect(trimWhiteSpace(htmlhandler.serialize())).toBe(trimWhiteSpace(expectedHtmlString))
	})
})
