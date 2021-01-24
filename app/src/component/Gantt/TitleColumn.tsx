import React, { Dispatch } from 'react'
import { Action } from '../Types/Types'

type Props = {
	row: number
	dispatch: Dispatch<Action>
}

export const TitleColumn: React.FC<Props> = ({ row, dispatch }) => {
	console.log('render TitleColumn', row)

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
							index: row,
							title: e.target.value,
						})
					}
				/>
			}
		</td>
	)
}
