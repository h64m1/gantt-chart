import React from 'react'
import { Action } from '../../reducer/Action'
import { getTaskKey } from '../../reducer/Tasks'

type Props = {
	row: number
	column: number
	yearMonth: string
	taskStatusList: Array<boolean>
	color: string
	dispatch: React.Dispatch<Action>
}

// ガントチャート本体の列を描画
export const BodyColumn: React.FC<Props> = React.memo(({ row, column, yearMonth, taskStatusList, color, dispatch }) => {
	const className = 'gantt-body'

	const style = { backgroundColor: '' }
	if (hasTask(column, taskStatusList)) {
		style.backgroundColor = color
	}

	return (
		<td
			className={className}
			style={style}
			onClick={() => {
				// clickで当該セルをtasksに追加
				dispatch({
					type: 'task',
					id: getTaskKey(row + 1, yearMonth),
					column: column,
				})
			}}
		></td>
	)
})

BodyColumn.displayName = 'BodyColumn'

/**
 * 当該カラムがタスクを持っているか
 * @param column 列コード
 * @param taskStatusList タスクの状態リスト
 */
const hasTask = (column: number, taskStatusList: Array<boolean>): boolean => {
	// 当該カラムのtaskが存在するか
	const taskFound = taskStatusList.find((_, i) => i === column)
	return taskFound === undefined ? false : taskFound
}
