import React, { ChangeEvent } from 'react'

import { Title } from '../Types/Types'

type Props = {
	yearMonth: string
	row: number
	changeTitle: (event: ChangeEvent, title: Title) => void
}

export const TitleColumn: React.FC<Props> = ({ yearMonth, row, changeTitle }) => {
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
			}
		</td>
	)
}
