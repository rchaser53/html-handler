const parse5 = require('parse5')
const { insertNodes } = require('../dest/index.js')

const hlmlString = `<!DOCTYPE html>
<html>
  <head>
    <script src="src/test.js"></script>
  </head>
  <body></body>
</html>`

const nodeTree = parse5.parse(hlmlString)
const divFrgment = parse5.parseFragment('<script src="https://third/party.js"></script>').childNodes.pop()
insertNodes(nodeTree, divFrgment, {
	type: 'tag',
	value: 'head',
	insertPosition: 'prepend'
})
console.log(parse5.serialize(nodeTree))
/*
<!DOCTYPE html>
<html>
  <head>
    <script src="https://third/party.js"></script>
    <script src="src/test.js"></script>
  </head>
  <body></body>
</html>
*/
