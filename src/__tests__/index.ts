import parse5 = require('parse5')
import { getTarget } from '../index'

describe("getTarget", () => {
  test("return script tag", async () => {
    const hlmlString = `<html>
      <head>
        <script></script>
      <head>
    </html>`
    const ret = getTarget(parse5.parse(hlmlString), 'script')
    expect(ret.length).toEqual(1);
    expect(ret[0].nodeName).toEqual('script');

  })
})
