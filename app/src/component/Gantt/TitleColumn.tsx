import React, { Dispatch } from 'react'
import { Action, getTaskKey } from '../Types/Types'

type Props = {
	row: number
	dispatch: Dispatch<Action>
}

export const TitleColumn: React.FC<Props> = React.memo(({ row, dispatch }) => {
	console.debug('render TitleColumn', row)

	const className = 'gantt-body title'
	const column = 0

	return (
		<td key={`title-${row}-${column}`} className={className}>
			{
				// タイトル列にはフォームを表示（フォーム仮置）
				<input
					type="text"
					className="title"
					onChange={(e) =>
						dispatch({
							type: 'title',
							id: getTaskKey(row + 1),
							title: e.target.value,
						})
					}
				/>
			}
		</td>
	)
})

TitleColumn.displayName = 'TitleColumn'
