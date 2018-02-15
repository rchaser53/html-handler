const parse5 = require('parse5')
const { getNodes } = require('../dest/index.js')

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