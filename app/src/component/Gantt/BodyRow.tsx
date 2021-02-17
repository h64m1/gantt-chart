import React, { Dispatch } from 'react'

import * as Day from '../../api/Date/Day'
import { Action } from '../../reducer/Action'
import { Task } from '../../reducer/Tasks'
import { BodyColumn } from './BodyColumn'
import { TitleColumn } from './TitleColumn'

type Props = {
	row: number
	yearMonth: string
	task: Task
	dispatch: Dispatch<Action>
}

// ガントチャート本体の行全体を描画
export const BodyRow: React.FC<Props> = React.memo(({ row, yearMonth, task, dispatch }) => {
	console.debug('render BodyRow', row, yearMonth, task)

	const taskStatus = task.taskStatus === undefined ? [] : task.taskStatus

	// 一ヶ月分の日付
	const dates = Day.Days(yearMonth, 'DD (ddd)')

	return (
		<tr key={row}>
			<TitleColumn row={row} yearMonth={yearMonth} title={task.title} color={task.color} dispatch={dispatch} />
			{dates.map((_, column) => {
				return (
					<BodyColumn
						key={`body-${row}-${column}`}
						row={row}
						column={column}
						yearMonth={yearMonth}
						taskStatusList={taskStatus}
						color={task.color}
						dispatch={dispatch}
					/>
				)
			})}
		</tr>
	)
})

BodyRow.displayName = 'BodyRow'
