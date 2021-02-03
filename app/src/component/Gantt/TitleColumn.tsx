import React from 'react'
import { Action } from '../../reducer/Action'
import { getTaskKey } from '../../reducer/Tasks'

type Props = {
	row: number
	yearMonth: string
	title: string
	color: string
	dispatch: React.Dispatch<Action>
}

export const TitleColumn: React.FC<Props> = React.memo(({ row, yearMonth, title, color, dispatch }) => {
	console.debug('render TitleColumn', row, yearMonth, title, color)

	const column = 0
	const id = getTaskKey(row + 1, yearMonth)

	return (
		<>
			<td key={`title-${row}-${column}`} className="gantt-body title">
				{/* タイトル */}
				<input
					type="text"
					className="title"
					value={title}
					onChange={(e) =>
						dispatch({
							type: 'title',
							id: id,
							title: e.target.value,
						})
					}
				/>
			</td>
			<td key={`color-picker-${row}-${column}`} className="gantt-body color-picker">
				{/* タスク用のカラーピッカー */}
				<input
					type="color"
					value={color}
					onChange={(e) =>
						dispatch({
							type: 'color',
							id: id,
							color: e.target.value,
						})
					}
				/>
			</td>
		</>
	)
})

TitleColumn.displayName = 'TitleColumn'
