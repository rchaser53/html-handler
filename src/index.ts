// it's not correct type. just for this implements
export interface ParsedNode {
  attrs: { name: string, value: any },
  childNodes: ParsedNode[],
  namespaceURI: string,
  nodeName: string,
  parentNode: ParsedNode,
  tagName: string,
}

export const getTarget = (targetNode: ParsedNode, key: string, retArray: ParsedNode[] = []): ParsedNode[] => {
  targetNode.childNodes.forEach((node: any) => {
    if (node.tagName === key) {
      retArray.push(node)
    } else if (!!node.childNodes && 0 < node.childNodes.length) {
      getTarget(node, key, retArray)
    }
  })
  return retArray
}