const parse5 = require('parse5')
const { getTarget } = require('../dest/index')

const htmlString = `
<html>
  <body>
    <div class="hoge">
      <div class="fuga" ></div>
    </div>
  </body>
</html>
`

const document = parse5.parse(htmlString)
const nodes = getTarget(document, 'div')

const documentFragment = parse5.parseFragment('<div></div>').childNodes.pop()

console.log(documentFragment)

console.log(
	// document,
	// parse5.serialize(document)
	parse5.serialize(document)
)
