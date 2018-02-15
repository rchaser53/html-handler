import { HtmlHandler } from '../index'
import { trimWhiteSpace } from '../helper'

describe('serialize', () => {
	test('serializeBody emits body only', async () => {
		const inputHlmlString = `
<html>
  <head></head>
  <body>
    <div>
      <div>hoge</div>
    </div>
  </body>
</html>
`
		const expectedHtmlString = `<div><div>hoge</div></div>`
		const htmlhandler = new HtmlHandler(inputHlmlString)
		expect(trimWhiteSpace(htmlhandler.serializeBody())).toBe(trimWhiteSpace(expectedHtmlString))
	})

	test('serializeHead emits head only', async () => {
		const inputHlmlString = `
<html>
  <head>
    <script src="hoge.js"></script>
    <link href="test.css">
  </head>
  <body>
    <div>
      <div>hoge</div>
    </div>
  </body>
</html>
`
		const expectedHtmlString = `<script src="hoge.js"></script><link href="test.css">`
		const htmlhandler = new HtmlHandler(inputHlmlString)
		expect(trimWhiteSpace(htmlhandler.serializeHead())).toBe(trimWhiteSpace(expectedHtmlString))
	})
})
