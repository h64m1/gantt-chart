import 'flatpickr/dist/themes/material_blue.css'
import React from 'react'
import FlatPickr from 'react-flatpickr'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { getTaskKey } from '../../reducer/Tasks'

const TitleColumn: React.FC<{
	row: number
	title: string
	color: string
}> = React.memo(({ row, title, color }) => {
	const state = useTaskState()
	console.debug('render TitleColumn', row, state.yearMonth, title, color)

	const column = 0
	const id = getTaskKey(row + 1, state.yearMonth)

	return (
		<>
			<Title row={row} column={column} title={title} id={id} />
			<DatePicker row={row} column={column} id={id} />
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
const DatePicker: React.FC<{
	row: number
	column: number
	id: string
}> = ({ row, column, id }) => {
	const dispatch = useTaskDispatch()

	return (
		<td key={`date-${row}-${column}`} className="gantt-body date">
			{/* タスクの日付 */}
			<FlatPickr
				options={{ mode: 'range' }}
				onChange={(dates, currentDate) => {
					// currentDate: YYYY-MM-DD to YYYY-MM-DD
					const beginDate = getBeginDate(currentDate)
					const endDate = getEndDate(currentDate)
					dispatch({
						type: 'taskDate',
						id: id,
						beginDate: beginDate,
						endDate: endDate,
					})
				}}
			/>
		</td>
	)
}

/**
 * 開始日を出力
 * @param {string} currentDate FlatPickrの出力日付文字列
 */
function getBeginDate(currentDate: string): string {
	const dates = currentDate.split('to')
	return dates[0].trim()
}

/**
 * 完了日を出力
 * @param {string} currentDate FlatPickrの出力日付文字列
 */
function getEndDate(currentDate: string): string {
	const dates = currentDate.split('to')
	if (dates.length < 2) {
		return dates[0].trim()
	}

	return dates[1].trim()
}

TitleColumn.displayName = 'TitleColumn'

export { TitleColumn }
