import parse5 = require('parse5')
import { getTarget } from '../index'

describe('getTarget', () => {
	test('return matched tag', async () => {
		const hlmlString = `<html>
      <head>
        <script></script>
      </head>
    </html>`
		const ret = getTarget(parse5.parse(hlmlString), 'script')
		expect(ret.length).toBe(1)
		expect(ret[0].nodeName).toBe('script')
	})

	test('return empty array if not matched', async () => {
		const hlmlString = `<html>
      <head>
        <script></script>
      </head>
    </html>`
		const ret = getTarget(parse5.parse(hlmlString), 'div')
		expect(ret.length).toBe(0)
		expect(ret).toEqual([])
	})

	test('return node which tag name is script', async () => {
		const hlmlString = `<html>
      <head>
        <script></script>
      </head>
    </html>`

		const ret = getTarget(parse5.parse(hlmlString), { type: 'tag', value: 'script' })
		expect(ret.length).toBe(1)
		expect(ret[0].nodeName).toBe('script')
	})

	test("return node which attribute src is 'js/hoge.js'", async () => {
		const hlmlString = `<html>
      <head>
        <script src="js/hoge.js"></script>
        <script src="js/fuga.js"></script>
        <link href="test"></link>
      </head>
    </html>`

		const ret = getTarget(parse5.parse(hlmlString), {
			type: 'attribute',
			value: {
				name: 'src',
				value: 'js/hoge.js'
			}
		})
		expect(ret.length).toBe(1)
		expect(ret[0].nodeName).toBe('script')
	})

	test('return nest node correctly', async () => {
		const hlmlString = `<html>
      <body>
        <div>
          <div></div>
        </div>
      </body>
    </html>`

		const ret = getTarget(parse5.parse(hlmlString), 'div')
		expect(ret.length).toBe(2)
		expect(ret.map((elem) => elem.nodeName)).toEqual(['div', 'div'])
	})
})
