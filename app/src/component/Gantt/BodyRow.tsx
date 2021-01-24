import React, { Dispatch } from 'react'

import { Days } from '../Date/Day'
import { Action, Task } from '../Types/Types'
import { TitleColumn } from './TitleColumn'

type Props = {
	row: number
	yearMonth: string
	task: Task
	dispatch: Dispatch<Action>
}

export const BodyRow: React.FC<Props> = ({ row, yearMonth, task, dispatch }) => {
	console.log('render BodyRow', row)

	const taskStatus = task.taskStatus === undefined ? [] : task.taskStatus
	const bodyRows = getBody(yearMonth, row, taskStatus, dispatch)
	return (
		<tr key={row}>
			<TitleColumn row={row} dispatch={dispatch} />
			{bodyRows}
		</tr>
	)
}

/**
 * 1ヶ月分の枠を<td>の配列で取得
 * @param yearMonth 処理年月
 * @param row 行番号
 */
function getBody(
	yearMonth: string,
	row: number,
	taskStatusList: Array<boolean>,
	dispatch: Dispatch<Action>,
): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(yearMonth, { format: 'DD (ddd)' })
	// タイトル用の要素を追加
	dates.unshift('')

	return dates.map((v, column) => {
		let className = 'gantt-body'

		// 当該カラムのtaskが存在するか
		const taskStatus = taskStatusList.find((status, i) => i === column)
		if (taskStatus) {
			className = className.concat(' ', 'task')
		}

		return (
			<td
				key={`body-${row}-${column}`}
				className={className}
				onClick={() => {
					// clickで当該セルをtasksに追加
					dispatch({
						type: 'task',
						row: row,
						column: column,
					})
				}}
			></td>
		)
	})
}
