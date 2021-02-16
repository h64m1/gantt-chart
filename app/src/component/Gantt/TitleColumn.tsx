import React from 'react'
import { Action } from '../../reducer/Action'
import { getTaskKey } from '../../reducer/Tasks'

import 'flatpickr/dist/themes/material_blue.css'
import DatePicker from 'react-flatpickr'

type Props = {
	row: number
	yearMonth: string
	title: string
	color: string
	dispatch: React.Dispatch<Action>
}

export const TitleColumn: React.FC<Props> = React.memo(({ row, yearMonth, title, color, dispatch }) => {
	console.debug('render TitleColumn', row, yearMonth, title, color)

	const column = 0
	const id = getTaskKey(row + 1, yearMonth)

	return (
		<>
			<Title row={row} column={column} title={title} id={id} dispatch={dispatch} />
			<ColorPicker row={row} column={column} color={color} id={id} dispatch={dispatch} />
			<Date dateName={'beginDate'} row={row} column={column} date={yearMonth} id={id} dispatch={dispatch} />
			<Date dateName={'endDate'} row={row} column={column} date={yearMonth} id={id} dispatch={dispatch} />
		</>
	)
})

/**
 * タイトル列
 */
const Title: React.FC<{
	row: number
	column: number
	title: string
	id: string
	dispatch: React.Dispatch<Action>
}> = ({ row, column, title, id, dispatch }) => {
	return (
		<td key={`title-${row}-${column}`} className="gantt-body title">
			{/* タイトル */}
			<input
				type="text"
				className="title"
				value={title}
				onChange={(e) =>
					dispatch({
						type: 'title',
						id: id,
						title: e.target.value,
					})
				}
			/>
		</td>
	)
}

/**
 * カラーピッカー
 */
const ColorPicker: React.FC<{
	row: number
	column: number
	color: string
	id: string
	dispatch: React.Dispatch<Action>
}> = ({ row, column, color, id, dispatch }) => {
	return (
		<td key={`color-picker-${row}-${column}`} className="gantt-body color-picker">
			{/* タスク用のカラーピッカー */}
			<input
				type="color"
				value={color}
				onChange={(e) =>
					dispatch({
						type: 'color',
						id: id,
						color: e.target.value,
					})
				}
			/>
		</td>
	)
}

/**
 * 開始日/終了日
 */
const Date: React.FC<{
	dateName: string
	row: number
	column: number
	date: string
	id: string
	dispatch: React.Dispatch<Action>
}> = ({ dateName, row, column, date, id, dispatch }) => {
	return (
		<td key={`${dateName}-${row}-${column}`} className="gantt-body date">
			{/* タスクの日付 */}
			<DatePicker />
		</td>
	)
}

TitleColumn.displayName = 'TitleColumn'
