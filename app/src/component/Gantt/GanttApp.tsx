import React, { Dispatch } from 'react'
import { Action, Tasks } from '../Types/Types'
import { Select } from '../Select/Select'
import { HeadRow } from './HeadRow'
import { BodyRow } from './BodyRow'
import './Gantt.css'

type Props = {
	yearMonth: string
	tasks: Tasks
	dispatch: Dispatch<Action>
}

export const GanttApp: React.FC<Props> = ({ yearMonth, tasks, dispatch }) => {
	return (
		<>
			<nav id="navigation">{<Select value={yearMonth} dispatch={dispatch} />}</nav>
			<article id="gantt-main">{<Gantt yearMonth={yearMonth} tasks={tasks} dispatch={dispatch} />}</article>
		</>
	)
}

const Gantt: React.FC<Props> = ({ yearMonth, tasks, dispatch }) => {
	const maxRow = tasks.ids.length
	console.debug('render Gantt', maxRow)
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
					<HeadRow yearMonth={yearMonth} />
				</thead>
				<tbody>
					{Object.values(tasks.entities).map((task, row) => {
						return (
							<BodyRow key={`${row}`} row={row} yearMonth={yearMonth} task={task} dispatch={dispatch} />
						)
					})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</>
	)
}

export default GanttApp
