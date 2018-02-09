export const getTarget = (targetNode: any, key: string, retArray: any[] = []): any[] => {
  targetNode.childNodes.forEach((node: any) => {
    if (node.tagName === key) {
      retArray.push(node)
    } else if (!!node.childNodes && 0 < node.childNodes.length) {
      getTarget(node, key, retArray)
    }
  })
  return retArray
}