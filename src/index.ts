// it's not correct type. just for this implements
export interface ParsedNode {
  attrs: Attribute,
  childNodes: ParsedNode[],
  namespaceURI: string,
  nodeName: string,
  parentNode: ParsedNode,
  tagName ? : string,
}

export interface Attribute {
  name: string,
  value: any
}

export type Primitive = string | number | boolean | null

export interface Option {
  type: 'tag' | 'node' | 'attribute'
  value: Primitive | Attribute
}

// just wanna decrease the parameters for developer
export const getTarget = (targetNode: ParsedNode, option: Option | string): ParsedNode[] => {
  let returnArray: ParsedNode[] = []
  searchNode(targetNode, option, returnArray)
  return returnArray
}

export const recursiveGetTarget = (targetNode: ParsedNode, option: Option | string, targetArray: ParsedNode[]): ParsedNode[] => {
  searchNode(targetNode, option, targetArray)
  return targetArray
}

const searchNode = (targetNode: ParsedNode, option: Option | string, targetArray: ParsedNode[]) => {
  targetNode.childNodes.forEach((node: ParsedNode) => {
    if (typeof option === 'string') {
      if (node.tagName === option) {
        targetArray.push(node)
      }
    }

    if (!!node.childNodes && 0 < node.childNodes.length) {
      recursiveGetTarget(node, option, targetArray)
    }
  })
}
