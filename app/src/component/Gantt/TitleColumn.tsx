import React, { Dispatch } from 'react'
import { Action } from '../../reducer/Action'
import { getTaskKey } from '../../reducer/Tasks'

type Props = {
	row: number
	yearMonth: string
	title: string
	dispatch: Dispatch<Action>
}

export const TitleColumn: React.FC<Props> = React.memo(({ row, yearMonth, title, dispatch }) => {
	console.debug('render TitleColumn', row, yearMonth, title)

	const className = 'gantt-body title'
	const column = 0

	return (
		<td key={`title-${row}-${column}`} className={className}>
			{
				// タイトル列にはフォームを表示（フォーム仮置）
				<input
					type="text"
					className="title"
					value={title}
					onChange={(e) =>
						dispatch({
							type: 'title',
							id: getTaskKey(row + 1, yearMonth),
							title: e.target.value,
						})
					}
				/>
			}
		</td>
	)
})

TitleColumn.displayName = 'TitleColumn'
