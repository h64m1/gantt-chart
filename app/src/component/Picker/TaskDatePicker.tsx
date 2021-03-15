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
	name: TaskDate
	date?: string
}> = React.memo(({ row, name, date }) => {
	const dispatch = useTaskDispatch()
	console.debug('DatePicker: date', name, date)
	return (
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
	)
})

TaskDatePicker.displayName = 'TaskDatePicker'

export { TaskDatePicker }
