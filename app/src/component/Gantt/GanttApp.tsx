import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { getTaskKey } from '../../reducer/Tasks'
import { ExportButton, ImportButton } from '../Button/Button'
import { ColorPicker } from '../Picker/ColorPicker'
import { TaskDatePicker } from '../Picker/TaskDatePicker'
import { Select } from '../Select/Select'
import { Title } from '../Title/Title'
import { BodyColumn } from './BodyColumn'
import './Gantt.scss'
import { HeadRow } from './HeadRow'

const GanttApp: React.FC = () => {
	return (
		<>
			<nav id="navigation">
				<Navigation />
			</nav>
			<article id="gantt-main">
				<Gantt />
			</article>
		</>
	)
}

/**
 * ナビゲーション
 */
const Navigation: React.FC = () => {
	return (
		<>
			<Select />
			<ExportButton />
			<ImportButton />
		</>
	)
}

/**
 * ガントチャート本体
 */
const Gantt: React.FC = () => {
	const state = useTaskState()
	const dispatch = useTaskDispatch()

	const dates = Day.DaysFromTo(state.beginDate, state.endDate, 'MM/DD (ddd)')

	const tasks = state.tasks
	const maxRow = Object.values(tasks).length
	console.debug('render Gantt', maxRow, 'tasks:', tasks)
	return (
		<>
			{/* 行追加、行削除のボタン */}
			<div className={'gantt-button'}>
				<button onClick={() => dispatch({ type: 'addRow' })}>行追加</button>
				<button onClick={() => dispatch({ type: 'deleteRow' })}>行削除</button>
			</div>
			{/* ガントチャートのボディ部分 */}
			<table>
				<thead>
					<HeadRow beginDate={state.yearMonth} endDate={state.endDate} />
				</thead>
				<tbody>
					{Object.values(tasks).map((task, row) => {
						const titleColumn = 0
						const id = getTaskKey(row, state.yearMonth)
						return (
							<tr key={row}>
								<Title row={row} column={titleColumn} title={task.title} id={id} />
								<TaskDatePicker
									row={row}
									column={titleColumn}
									id={id}
									name={'taskBeginDate'}
									date={task.beginDate}
								/>
								<TaskDatePicker
									row={row}
									column={titleColumn}
									id={id}
									name={'taskEndDate'}
									date={task.endDate}
								/>
								<ColorPicker row={row} column={titleColumn} color={task.color} id={id} />
								{dates.map((_, column) => {
									const day = Day.addF(column, 'day', state.beginDate)
									return (
										<BodyColumn
											key={`body-${row}-${column}`}
											row={row}
											column={column}
											day={day}
											color={task.color}
										/>
									)
								})}
							</tr>
						)
					})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</>
	)
}

export default GanttApp
