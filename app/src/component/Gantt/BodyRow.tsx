import React, { Dispatch } from 'react'

import { Days } from '../Date/Day'
import { Action, Task } from '../Types/Types'
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
	console.debug('render BodyRow', row)

	const taskStatus = task.taskStatus === undefined ? [] : task.taskStatus

	// 一ヶ月分の日付
	const dates = Days(yearMonth, { format: 'DD (ddd)' })

	return (
		<tr key={row}>
			<TitleColumn row={row} dispatch={dispatch} />
			{dates.map((_, column) => {
				return (
					<BodyColumn
						key={`body-${row}-${column}`}
						row={row}
						column={column}
						taskStatusList={taskStatus}
						dispatch={dispatch}
					/>
				)
			})}
		</tr>
	)
})

BodyRow.displayName = 'BodyRow'
