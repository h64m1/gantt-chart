import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * タイトル列
 */
const Title: React.FC<{
	row: number
	title: string
}> = React.memo(({ row, title }) => {
	console.debug('render Title', row, title)

	const dispatch = useTaskDispatch()

	//  タイトル
	return (
		<input
			type="text"
			className="font-bold border"
			value={title}
			onChange={(e) =>
				dispatch({
					type: 'title',
					id: row,
					title: e.target.value,
				})
			}
		/>
	)
})

Title.displayName = 'Title'

export { Title }
