import React from 'react'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { getTaskKey } from '../../reducer/Tasks'

// ガントチャート本体の列を描画
const BodyColumn: React.FC<{
	row: number
	column: number
	taskStatusList: Array<boolean>
	color: string
}> = React.memo(({ row, column, taskStatusList, color }) => {
	const className = 'gantt-body'
	const state = useTaskState()
	const dispatch = useTaskDispatch()

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
					id: getTaskKey(row + 1, state.yearMonth),
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

export { BodyColumn }
