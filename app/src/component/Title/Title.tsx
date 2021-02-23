import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * タイトル列
 */
const Title: React.FC<{
	row: number
	column: number
	title: string
	id: string
}> = React.memo(({ row, column, title, id }) => {
	console.debug('render Title', row, column, id, title)

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
						id: id,
						title: e.target.value,
					})
				}
			/>
		</td>
	)
})

Title.displayName = 'Title'

export { Title }
