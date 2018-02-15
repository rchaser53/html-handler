import parse5 = require('parse5')

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

export class HtmlHandler {
	node: ParsedNode

	constructor(htmlString: string) {
		this.node = parse5.parse(htmlString)
	}

	getNodes(option: Option | string): ParsedNode[] {
		let returnArray: ParsedNode[] = []
		this.searchNodes(this.node, option, returnArray)
		return returnArray
	}

	recursiveGetTarget(targetNode: ParsedNode, option: Option | string, targetArray: ParsedNode[]): ParsedNode[] {
		this.searchNodes(targetNode, option, targetArray)
		return targetArray
	}

	searchNodes(targetNode: ParsedNode, option: Option | string, targetArray: ParsedNode[]): void {
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
				this.recursiveGetTarget(node, option, targetArray)
			}
		})
	}

	insertNodes(insertNode: ParsedNode, insertOption: InsertOption): void {
		const targets = this.getNodes(insertOption)
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

	deleteNodes(option: Option | string): void {
		this.recursiveDeleteNodes(this.node, option)
	}

	recursiveDeleteNodes(baseNode: ParsedNode, option: Option | string): void {
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
				this.recursiveDeleteNodes(node, option)
			}
			return returnFlag
		})
	}

	parseFragment(fragment: string): ParsedNode {
		return parse5.parseFragment(fragment).childNodes.pop()
	}

	serialize(): string {
		return parse5.serialize(this.node)
	}
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
