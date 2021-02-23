import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * カラーピッカー
 */
const ColorPicker: React.FC<{
	row: number
	column: number
	color: string
	id: string
}> = React.memo(({ row, column, color, id }) => {
	const dispatch = useTaskDispatch()

	return (
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
	)
})

ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
