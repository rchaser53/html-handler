![build_status](https://travis-ci.org/rchaser53/html-handler?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

parse5 wrapper to handle html node

```js
const parse5 = require('parse5')
const { getNodes } = require('html-handler')

const hlmlString = `<html>
  <head>
    <script></script>
  </head>
</html>`
const ret = getNodes(parse5.parse(hlmlString), 'script')
/*
[ { nodeName: 'script',
    tagName: 'script',
    attrs: [],
    namespaceURI: 'http://www.w3.org/1999/xhtml',
    childNodes: [],
    parentNode:
     { nodeName: 'head',
       tagName: 'head',
       attrs: [],
       namespaceURI: 'http://www.w3.org/1999/xhtml',
       childNodes: [Array],
       parentNode: [Object] } } ]
*/
```
