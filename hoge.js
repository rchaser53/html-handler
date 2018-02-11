const targetHtmlString = `
<div src="nyanchu">
  </div>
`

console.log(targetHtmlString.trim().replace(/\>\s*\</g, '><'))
