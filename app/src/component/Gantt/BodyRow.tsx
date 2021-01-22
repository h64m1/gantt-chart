import React, { ChangeEvent } from 'react'

import { Days } from '../Date/Day'
import { TaskStatus, Title } from '../Types/Types'
import { TitleColumn } from './TitleColumn'

type Props = {
	row: number
	yearMonth: string
	tasks: Array<TaskStatus>
	changeTitle: (event: ChangeEvent, title: Title) => void
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void
}

export const BodyRow: React.FC<Props> = ({ row, yearMonth, tasks, changeTitle, addIsOn }) => {
	console.log('render BodyRow', row)

	const bodyRows = getBody(yearMonth, row, tasks, addIsOn)
	return (
		<tr key={row}>
			<TitleColumn yearMonth={yearMonth} row={row} changeTitle={changeTitle} />
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
	tasks: Array<TaskStatus>,
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void,
): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(yearMonth, { format: 'DD (ddd)' })
	// タイトル用の要素を追加
	dates.unshift('')

	return dates.map((v, column) => {
		let className = 'gantt-body'

		// 当該カラムのtaskが存在するか
		const task = tasks.find((e) => e.row === row && e.column === column)
		if (task?.isOn) {
			className = className.concat(' ', 'task')
		}

		return (
			<td
				key={`body-${row}-${column}`}
				className={className}
				onClick={(e) => {
					// clickで当該セルをtasksに追加
					if (addIsOn) {
						addIsOn(e, {
							yearMonth: yearMonth,
							row: row,
							column: column,
							isOn: true,
						})
					}
				}}
			></td>
		)
	})
}
