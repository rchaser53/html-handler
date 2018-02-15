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
