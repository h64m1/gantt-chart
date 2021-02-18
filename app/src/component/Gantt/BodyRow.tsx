import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskState } from '../../context/TaskContext'
import { Task } from '../../reducer/Tasks'
import { BodyColumn } from './BodyColumn'
import { TitleColumn } from './TitleColumn'

// ガントチャート本体の行全体を描画
export const BodyRow: React.FC<{
	row: number
	task: Task
}> = React.memo(({ row, task }) => {
	const state = useTaskState()
	console.debug('render BodyRow', row, state.yearMonth, task)

	const taskStatus = task.taskStatus === undefined ? [] : task.taskStatus

	// 一ヶ月分の日付
	const dates = Day.Days(state.yearMonth, 'DD (ddd)')

	return (
		<tr key={row}>
			<TitleColumn row={row} title={task.title} color={task.color} />
			{dates.map((_, column) => {
				return (
					<BodyColumn
						key={`body-${row}-${column}`}
						row={row}
						column={column}
						taskStatusList={taskStatus}
						color={task.color}
					/>
				)
			})}
		</tr>
	)
})

BodyRow.displayName = 'BodyRow'
