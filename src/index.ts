// it's not correct type. just for this implements
export interface ParsedNode {
  attrs: { name: string, value: any },
  childNodes: ParsedNode[],
  namespaceURI: string,
  nodeName: string,
  parentNode: ParsedNode,
  tagName: string,
}

// just wanna decrease the parameters for developer
export const getTarget = (targetNode: ParsedNode, key: string): ParsedNode[] => {
  let returnArray: ParsedNode[] = []
  searchNode(targetNode, key, returnArray)
  return returnArray
}

export const recursiveGetTarget = (targetNode: ParsedNode, key: string, targetArray: ParsedNode[]): ParsedNode[] => {
  searchNode(targetNode, key, targetArray)
  return targetArray
}

const searchNode = (targetNode: ParsedNode, key: string, targetArray: ParsedNode[] ) => {
  targetNode.childNodes.forEach((node: ParsedNode) => {
    if (node.tagName === key) {
      targetArray.push(node)
    } else if (!!node.childNodes && 0 < node.childNodes.length) {
      recursiveGetTarget(node, key, targetArray)
    }
  })
}