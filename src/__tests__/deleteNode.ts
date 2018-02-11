import parse5 = require('parse5')
import { deleteNode } from '../index'
import { trimWhiteSpace } from '../helper'

describe('deleteNode', () => {
	test('delete arbitrary node', async () => {
		const inputHlmlString = `
<html>
  <head></head>
  <body>
    <div></div>
  </body>
</html>
`
		const expectedHtmlString = `
<html>
  <head></head>
  <body></body>
</html>
`
		const document = parse5.parse(inputHlmlString)

		deleteNode(document, 'div')
		expect(trimWhiteSpace(parse5.serialize(document))).toBe(trimWhiteSpace(expectedHtmlString))
	})
})
