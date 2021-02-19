import React from 'react'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { ExportButton, ImportButton } from '../Button/Button'
import { Select } from '../Select/Select'
import { BodyRow } from './BodyRow'
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

const Navigation: React.FC = () => {
	return (
		<>
			<Select />
			<ExportButton />
			<ImportButton />
		</>
	)
}

const Gantt: React.FC = () => {
	const state = useTaskState()
	const dispatch = useTaskDispatch()

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
					<HeadRow />
				</thead>
				<tbody>
					{Object.values(tasks).map((task, row) => {
						console.debug('Gantt:', state.yearMonth, row, 'task:', task)
						return <BodyRow key={`${row}`} row={row} task={task} />
					})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</>
	)
}

export default GanttApp
