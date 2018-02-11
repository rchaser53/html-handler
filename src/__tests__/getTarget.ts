import parse5 = require('parse5')
import { insert } from '../index'

describe('insert', () => {
	test('insert arbitrary node', async () => {
		const inputHlmlString = `<html><head></head><body></body></html>`
		const expectedHtmlString = `<html><head></head><body><div></div></body></html>`
		const divFrgment = parse5.parseFragment('<div></div>').childNodes.pop()
		const document = parse5.parse(inputHlmlString)

		insert(document, divFrgment, 'body')
		expect(parse5.serialize(document)).toBe(expectedHtmlString)
	})
})
