const parse5 = require('parse5')
const { deleteNodes } = require('../dest/index.js')

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
console.log(parse5.serialize(nodeTree))
/*
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
*/