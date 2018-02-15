![build_status](https://travis-ci.org/rchaser53/html-handler.svg?branch=master)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

parse5 wrapper to handle html node.

you can change html tag easily.

```js
const { HtmlHandler } = require('../dest/index.js')

const hlmlString = `<!DOCTYPE html>
<html>
  <head>
    <script src="src/test.js"></script>
  </head>
  <body></body>
</html>`

const htmlHandler = new HtmlHandler(hlmlString)
let targetNode = htmlHandler.getNodes('script')

// change node whatever you want
targetNode[0].attrs[0].value = 'https://awesome-cdn/' + targetNode[0].attrs[0].value
console.log(htmlHandler.serialize())
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
const htmlHandler = new HtmlHandler(hlmlString)
const divFrgment = htmlHandler.parseFragment('<script src="https://third/party.js"></script>')
htmlHandler.insertNodes(divFrgment, {
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

const htmlHandler = new HtmlHandler(hlmlString)
htmlHandler.deleteNodes({
	type: 'attribute',
	value: {
		name: 'class',
		value: 'third party'
	}
})
```
