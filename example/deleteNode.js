const { HtmlHandler } = require('../dest/index.js')

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
console.log(htmlHandler.serialize())
/*
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
*/
