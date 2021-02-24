import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * タイトル列
 */
const Title: React.FC<{
	row: number
	column: number
	title: string
}> = React.memo(({ row, column, title }) => {
	console.debug('render Title', row, column, title)

	const dispatch = useTaskDispatch()

	return (
		<td key={`title-${row}-${column}`} className="gantt-body title">
			{/* タイトル */}
			<input
				type="text"
				className="title"
				value={title}
				onChange={(e) =>
					dispatch({
						type: 'title',
						id: row,
						title: e.target.value,
					})
				}
			/>
		</td>
	)
})

Title.displayName = 'Title'

export { Title }
