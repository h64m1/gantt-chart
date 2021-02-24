import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch } from '../../context/TaskContext'
import { TaskDate } from '../../reducer/Tasks'
import { DatePicker } from './DatePicker'

/**
 * 開始日/終了日
 */
const TaskDatePicker: React.FC<{
	row: number
	column: number
	name: TaskDate
	date?: string
}> = React.memo(({ row, column, name, date }) => {
	const dispatch = useTaskDispatch()
	console.debug('DatePicker: date', name, date)
	return (
		<td key={`date-${row}-${column}`} className="gantt-body date">
			<DatePicker
				className="task-datepicker"
				dateFormat="yyyy/MM/dd"
				date={date}
				onChange={(date) => {
					// date: Date | [Date, Date] | null
					console.debug('DatePicker onChange:', date)
					if (date instanceof Array || date === null) {
						return
					}

					return dispatch({
						type: name,
						id: row,
						date: Day.convertDateToString(date),
					})
				}}
			/>
		</td>
	)
})

TaskDatePicker.displayName = 'TaskDatePicker'

export { TaskDatePicker }
