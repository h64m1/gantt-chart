import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { getTaskKey } from '../../reducer/Tasks'

// ガントチャート本体の列を描画
const BodyColumn: React.FC<{
	row: number
	column: number
	day: string
	color: string
}> = React.memo(({ row, column, day, color }) => {
	const className = 'gantt-body'
	const state = useTaskState()
	const dispatch = useTaskDispatch()

	const id = getTaskKey(row, state.yearMonth)
	const task = state.tasks[id]

	const style = { backgroundColor: '' }
	if (hasTask(day, task.beginDate, task.endDate)) {
		style.backgroundColor = color
	}

	return (
		<td
			className={className}
			style={style}
			// TODO: 一旦clickでのtask assignをoff
			// onClick={() => {
			// 	// clickで当該セルをtasksに追加
			// 	dispatch({
			// 		type: 'task',
			// 		id: getTaskKey(row, state.yearMonth),
			// 		column: column,
			// 	})
			// }}
		></td>
	)
})

BodyColumn.displayName = 'BodyColumn'

/**
 * 当該カラムがタスクを持っているか
 * @param {string} date 当該カラムの日付
 * @param {string} beginDate 開始日
 * @param {string} endDate 完了日
 */
const hasTask = (date: string, beginDate?: string, endDate?: string): boolean => {
	// 当該カラムの日付が、開始日と終了日の範囲内かどうか
	const _date = Day.Day(date)
	const _beginDate = Day.Day(beginDate)
	const _endDate = Day.Day(endDate)

	const isBeginDateOk = _date.isSame(_beginDate) || _date.isAfter(_beginDate)
	const isEndDateOk = _date.isSame(_endDate) || _date.isBefore(_endDate)
	return isBeginDateOk && isEndDateOk
}

export { BodyColumn }
