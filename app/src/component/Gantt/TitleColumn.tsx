import 'flatpickr/dist/themes/material_blue.css'
import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { getTaskKey, TaskDate } from '../../reducer/Tasks'
import { DatePicker } from '../Picker/DatePicker'

const TitleColumn: React.FC<{
	row: number
	title: string
	color: string
}> = React.memo(({ row, title, color }) => {
	const state = useTaskState()
	console.debug('render TitleColumn', row, state.yearMonth, title, color)

	const column = 0
	const id = getTaskKey(row, state.yearMonth)
	const task = state.tasks[id]

	return (
		<>
			<Title row={row} column={column} title={title} id={id} />
			<DPicker row={row} column={column} id={id} name={'taskBeginDate'} date={task.beginDate} />
			<DPicker row={row} column={column} id={id} name={'taskEndDate'} date={task.endDate} />
			<ColorPicker row={row} column={column} color={color} id={id} />
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
}> = ({ row, column, title, id }) => {
	const dispatch = useTaskDispatch()

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
}> = ({ row, column, color, id }) => {
	const dispatch = useTaskDispatch()

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
const DPicker: React.FC<{
	row: number
	column: number
	id: string
	name: TaskDate
	date?: string
}> = ({ row, column, id, name, date }) => {
	const dispatch = useTaskDispatch()
	console.debug('DatePicker: date', name, date)
	return (
		<td key={`date-${row}-${column}`} className="gantt-body date">
			<DatePicker
				className="task-datepicker"
				dateFormat="yyyy/MM/dd"
				date={date}
				onChange={(date) => {
					// date: Date | [Date, Date] | null
					console.warn('DatePicker onChange:', date)
					if (date instanceof Array || date === null) {
						return
					}

					return dispatch({
						type: name,
						id: id,
						date: Day.convertDateToString(date),
					})
				}}
			/>
		</td>
	)
}

TitleColumn.displayName = 'TitleColumn'

export { TitleColumn }
