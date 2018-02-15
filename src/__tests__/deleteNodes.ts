import { HtmlHandler } from '../index'
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
		const htmlHandler = new HtmlHandler(inputHlmlString)
		htmlHandler.deleteNodes('div')
		expect(trimWhiteSpace(htmlHandler.serialize())).toBe(trimWhiteSpace(expectedHtmlString))
	})

	test('delete arbitrary nest node', async () => {
		const inputHlmlString = `
<html>
  <head></head>
  <body>
    <table>
      <tbody>
        <tr>
          <td>hoge</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`
		const expectedHtmlString = `
<html>
  <head></head>
  <body></body>
</html>
`
		const htmlHandler = new HtmlHandler(inputHlmlString)
		htmlHandler.deleteNodes('table')
		expect(trimWhiteSpace(htmlHandler.serialize())).toBe(trimWhiteSpace(expectedHtmlString))
	})
})
