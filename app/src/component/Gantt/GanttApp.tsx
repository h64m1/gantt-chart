import React from 'react'
import { Action } from '../../reducer/Action'
import { Tasks } from '../../reducer/Tasks'
import { Select } from '../Select/Select'
import { HeadRow } from './HeadRow'
import { BodyRow } from './BodyRow'
import * as db from '../../db/Database'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'

import './Gantt.scss'

type Props = {
	yearMonth: string
	tasks: Tasks
	dispatch: React.Dispatch<Action>
}

export const GanttApp: React.FC<Props> = ({ yearMonth, tasks, dispatch }) => {
	return (
		<>
			<nav id="navigation">
				<Navigation yearMonth={yearMonth} dispatch={dispatch} />
			</nav>
			<article id="gantt-main">{<Gantt yearMonth={yearMonth} tasks={tasks} dispatch={dispatch} />}</article>
		</>
	)
}

const Navigation: React.FC<{
	yearMonth: string
	dispatch: React.Dispatch<Action>
}> = ({ yearMonth, dispatch }) => {
	return (
		<>
			<Select value={yearMonth} dispatch={dispatch} />
			<div className="export">
				<span
					className="export-button"
					onClick={async (event) => {
						console.debug('click export ...', event)
						try {
							const response = await db.readAll()
							window.api.export(response)
						} catch (e) {
							console.debug('error: cannot find window.api')
						}
					}}
				>
					<FontAwesomeIcon icon={faFileExport} className="export-icon" />
					エクスポート
				</span>
			</div>
		</>
	)
}

const Gantt: React.FC<Props> = ({ yearMonth, tasks, dispatch }) => {
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
					<HeadRow yearMonth={yearMonth} />
				</thead>
				<tbody>
					{Object.values(tasks).map((task, row) => {
						console.debug('Gantt:', yearMonth, row, 'task:', task)
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
