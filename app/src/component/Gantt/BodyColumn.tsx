import React, { Dispatch } from 'react'
import { Action, getTaskKey } from '../Types/Types'

type Props = {
	row: number
	column: number
	taskStatusList: Array<boolean>
	dispatch: Dispatch<Action>
}

// ガントチャート本体の列を描画
export const BodyColumn: React.FC<Props> = React.memo(({ row, column, taskStatusList, dispatch }) => {
	const className = getClassName(column, taskStatusList)

	return (
		<td
			className={className}
			onClick={() => {
				// clickで当該セルをtasksに追加
				dispatch({
					type: 'task',
					id: getTaskKey(row + 1),
					column: column,
				})
			}}
		></td>
	)
})

BodyColumn.displayName = 'BodyColumn'

/**
 * クラス名指定
 * @param column 列コード
 * @param taskStatusList タスクの状態リスト
 */
const getClassName = (column: number, taskStatusList: Array<boolean>): string => {
	let className = 'gantt-body'

	// 当該カラムのtaskが存在するか
	const taskStatus = taskStatusList.find((_, i) => i === column)
	if (taskStatus) {
		className = className.concat(' ', 'task')
	}

	return className
}
