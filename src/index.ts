// it's not correct type. just for this implements
export interface ParsedNode {
	attrs: Attribute[]
	childNodes: ParsedNode[]
	namespaceURI: string
	nodeName: string
	parentNode: ParsedNode
	tagName?: string
}

export interface Attribute {
	name: string
	value: any
}

export type Primitive = string | number | boolean | null
export type OptionType = 'tag' | 'node' | 'attribute'
export type ParsedNodeKey = 'attrs' | 'nodeName' | 'tagName'

export interface Option {
	type: 'tag' | 'node' | 'attribute'
	value: Primitive | Attribute
}

export interface AttributeOption {
	type: 'attribute'
	value: Attribute
}

export interface InsertOption extends Option {
	insertPosition: 'prepend' | 'append'
}

// just wanna decrease the parameters for developer
export const getNodes = (targetNode: ParsedNode, option: Option | string): ParsedNode[] => {
	let returnArray: ParsedNode[] = []
	searchNodes(targetNode, option, returnArray)
	return returnArray
}

const recursiveGetTarget = (
	targetNode: ParsedNode,
	option: Option | string,
	targetArray: ParsedNode[]
): ParsedNode[] => {
	searchNodes(targetNode, option, targetArray)
	return targetArray
}

const isOption = (option: Option | string): option is Option => {
	return (<Option>option).type !== undefined
}

const isAttribute = (option: Option | AttributeOption): option is AttributeOption => {
	return option.type === 'attribute'
}

const convertTypeToKey = (type: OptionType): ParsedNodeKey => {
	switch (type) {
		case 'tag':
			return 'tagName'
		case 'node':
			return 'nodeName'
		case 'attribute':
			return 'attrs'
	}
}

const hasMatchedAttribute = (node: ParsedNode, option: Attribute): boolean => {
	return (
		!!node.attrs &&
		node.attrs.some((attribute) => {
			return attribute.name === option.name && attribute.value === option.value
		})
	)
}

const searchNodes = (targetNode: ParsedNode, option: Option | string, targetArray: ParsedNode[]) => {
	targetNode.childNodes.forEach((node: ParsedNode) => {
		if (typeof option === 'string') {
			if (node.tagName === option) {
				targetArray.push(node)
			}
		}

		if (isOption(option)) {
			const key = convertTypeToKey(option.type)

			if (isAttribute(option)) {
				if (hasMatchedAttribute(node, option.value)) {
					targetArray.push(node)
				}
			} else if (node[key] === option.value) {
				targetArray.push(node)
			}
		}

		if (!!node.childNodes && 0 < node.childNodes.length) {
			recursiveGetTarget(node, option, targetArray)
		}
	})
}

export const insertNodes = (baseNode: ParsedNode, insertNode: ParsedNode, insertOption: InsertOption): void => {
	const targets = getNodes(baseNode, insertOption)
	targets.forEach((node) => {
		if (!!node.childNodes) {
			switch (insertOption.insertPosition) {
				case 'prepend':
					node.childNodes.unshift(insertNode)
					break
				case 'append':
					node.childNodes.push(insertNode)
					break
			}
		}
	})
}

export const deleteNodes = (baseNode: ParsedNode, option: Option | string): void => {
	baseNode.childNodes = baseNode.childNodes.filter((node: ParsedNode) => {
		let returnFlag = true
		if (typeof option === 'string') {
			returnFlag = node.tagName !== option
		}

		if (isOption(option)) {
			const key = convertTypeToKey(option.type)

			if (isAttribute(option)) {
				returnFlag = !hasMatchedAttribute(node, option.value)
			} else if (node[key] === option.value) {
				returnFlag = false
			}
		}

		if (!!node.childNodes && 0 < node.childNodes.length) {
			deleteNodes(node, option)
		}
		return returnFlag
	})
}
