import React from 'react'
import { useTaskDispatch } from '../../context/TaskContext'

/**
 * カラーピッカー
 */
const ColorPicker: React.FC<{
	row: number
	column: number
	color: string
}> = React.memo(({ row, column, color }) => {
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
						id: row,
						color: e.target.value,
					})
				}
			/>
		</td>
	)
})

ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
