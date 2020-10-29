import { JSXElement } from '@babel/types'
import React from 'react'

type SelectProps = Partial<{
	list: Array<string>
}>

export function Select(props: SelectProps): JSX.Element {
	const emptySelect = <select>{}</select>
	if (props === undefined) {
		// propsが空の場合
		return emptySelect
	}

	if (props.list === undefined) {
		// props.listが空の場合
		return emptySelect
	}

	const options = props.list.map((v, i) => {
		return (
			<option key={`${i}`} value={`${v}`}>
				{v}
			</option>
		)
	})
	return <select>{options}</select>
}
