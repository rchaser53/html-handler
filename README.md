![build_status](https://travis-ci.org/rchaser53/html-handler.svg?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

parse5 wrapper to handle html node.

you can change html tag easily.

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

insert html tag

```js
const nodeTree = parse5.parse(hlmlString)
const divFrgment = parse5.parseFragment('<script src="https://third/party.js"></script>').childNodes.pop()
insertNodes(nodeTree, divFrgment, {
	type: 'tag',
	value: 'head',
	insertPosition: 'prepend'
})
```

delete html tag

```js
const hlmlString = `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <button class="third party">you want delete</button>
  </body>
</html>`

const nodeTree = parse5.parse(hlmlString)
deleteNodes(nodeTree, {
	type: 'attribute',
	value: {
		name: 'class',
		value: 'third party'
	}
})
```
