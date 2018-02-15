const { HtmlHandler } = require('../dest/index.js')

const hlmlString = `<!DOCTYPE html>
<html>
  <head>
    <script src="src/test.js"></script>
  </head>
  <body></body>
</html>`

const htmlHandler = new HtmlHandler(hlmlString)
const divFrgment = htmlHandler.parseFragment('<script src="https://third/party.js"></script>')
htmlHandler.insertNodes(divFrgment, {
	type: 'tag',
	value: 'head',
	insertPosition: 'prepend'
})
console.log(htmlHandler.serialize())
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
