import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskState } from '../../context/TaskContext'
import { ColorPicker } from '../Picker/ColorPicker'
import { TaskDatePicker } from '../Picker/TaskDatePicker'
import { Title } from '../Title/Title'
import { BodyColumn } from './BodyColumn'
import './Gantt.scss'
import { HeadRow } from './HeadRow'
import { Navigation } from './Navigation'
import { Search } from './Search'

const GanttApp: React.FC = () => {
	const state = useTaskState()

	return (
		<>
			<Navigation beginDate={state.beginDate} endDate={state.endDate} validation={state.validation} />
			<article id="gantt-main">
				{/* 検索パネル: ガントチャートの表示範囲 */}
				<Search />
				<Gantt />
			</article>
		</>
	)
}

/**
 * ガントチャート本体
 */
const Gantt: React.FC = () => {
	const state = useTaskState()
	const tasks = state.tasks

	const dates = Day.DaysFromTo(state.beginDate, state.endDate, 'MM/DD (ddd)')
	console.debug('render Gantt | tasks:', tasks)
	return (
		// ガントチャート本体
		<table>
			<thead>
				<HeadRow beginDate={state.beginDate} endDate={state.endDate} />
			</thead>
			<tbody>
				{state.tasks.map((task, row) => {
					const titleColumn = 0
					return (
						<tr key={row}>
							<Title row={row} column={titleColumn} title={task.title} />
							<TaskDatePicker
								row={row}
								column={titleColumn}
								name={'taskBeginDate'}
								date={task.beginDate}
							/>
							<TaskDatePicker row={row} column={titleColumn} name={'taskEndDate'} date={task.endDate} />
							<ColorPicker row={row} column={titleColumn} color={task.color} />
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
	)
}

export default GanttApp
