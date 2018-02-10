import parse5 = require('parse5')
import {
  getTarget
} from '../index'

describe("getTarget", () => {
  test("return second parameter matched tag", async () => {
    const hlmlString = `<html>
      <head>
        <script></script>
      <head>
    </html>`
    const ret = getTarget(parse5.parse(hlmlString), 'script')
    expect(ret.length).toBe(1);
    expect(ret[0].nodeName).toBe('script');
  })

  test("return empty array if not matched", async () => {
    const hlmlString = `<html>
      <head>
        <script></script>
      <head>
    </html>`
    const ret = getTarget(parse5.parse(hlmlString), 'div')
    expect(ret.length).toBe(0);
    expect(ret).toEqual([]);
  })
})
