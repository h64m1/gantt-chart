import React, { ChangeEvent } from 'react'

import { Days } from '../Date/Day'
import { TaskStatus, Title } from '../Types/Types'

type Props = {
	row: number
	yearMonth: string
	tasks: Array<TaskStatus>
	changeTitle: (event: ChangeEvent, title: Title) => void
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void
}

export const BodyRow: React.FC<Props> = ({ row, yearMonth, tasks, changeTitle, addIsOn }) => {
	console.log('render BodyRow', row)

	const bodyRows = getBody(yearMonth, row, tasks, changeTitle, addIsOn)
	return <tr key={row}>{bodyRows}</tr>
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
	changeTitle: (event: ChangeEvent, title: Title) => void,
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void,
): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(yearMonth, { format: 'DD (ddd)' })
	// タイトル用の要素を追加
	dates.unshift('')

	return dates.map((v, column) => {
		let className = 'gantt-body'
		const isTitle = v === ''
		if (isTitle) {
			// title用のクラス名を付加
			className = className.concat(' ', 'title')
		}

		// 当該カラムのtaskが存在するか
		const task = tasks.find((e) => e.row === row && e.column === column)
		if (task?.isOn) {
			className = className.concat(' ', 'task')
		}

		// タイトル列にはフォームを表示（フォーム仮置）
		const cell = isTitle ? (
			<input
				type="text"
				className="title"
				onChange={(e) => {
					if (changeTitle) {
						changeTitle(e, {
							yearMonth: yearMonth,
							row: row,
							title: e.target.value,
						})
					}
				}}
			/>
		) : (
			''
		)

		return (
			<td
				key={`body-${row}-${column}`}
				className={className}
				onClick={(e) => {
					// title列は追加しない
					if (column === 0) {
						return
					}

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
			>
				{cell}
			</td>
		)
	})
}
