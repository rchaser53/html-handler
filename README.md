![build_status](https://travis-ci.org/rchaser53/html-handler.svg?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

parse5 wrapper to handle html node

```js
const parse5 = require('parse5')
const { getNodes } = require('html-handler')

const hlmlString = `<!DOCTYPE html>
<html>
  <head>
    <script src="src/test.js"></script>
  </head>
  <body></body>
</html>`

let nodeTree = parse5.parse(hlmlString)
let targetNode = getNodes(nodeTree, 'script')

// change node whatever you want
targetNode[0].attrs[0].value = 'https://awesome-cdn/' + targetNode[0].attrs[0].value
console.log(parse5.serialize(nodeTree))
/*
<!DOCTYPE html>
<html>
  <head>
    <script src="https://awesome-cdn/src/test.js"></script>
  </head>
  <body></body>
</html>
*/
```
