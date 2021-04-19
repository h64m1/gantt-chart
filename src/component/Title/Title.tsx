import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * タイトル列
 */
const Title: React.VFC<{
	row: number
	title: string
}> = React.memo(({ row, title }) => {
	const dispatch = useTaskDispatch()

	//  タイトル
	return (
		<input
			aria-label="input-text"
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
