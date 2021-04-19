import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * カラーピッカー
 */
const ColorPicker: React.VFC<{
	row: number
	color: string
}> = React.memo(({ row, color }) => {
	const dispatch = useTaskDispatch()

	// タスク用のカラーピッカー
	return (
		<input
			type="color"
			value={color}
			onChange={(e) =>
				dispatch({
					type: 'color',
					id: row,
					color: e.target.value,
				})
			}
		/>
	)
})

ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
