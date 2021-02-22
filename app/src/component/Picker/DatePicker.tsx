import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch } from '../../context/TaskContext'
import { TaskDate } from '../../reducer/Tasks'
import './datepicker.scss'

/**
 * 開始日/終了日
 */
const DatePicker: React.FC<{
	row: number
	column: number
	id: string
	name: TaskDate
	date?: string
}> = ({ row, column, id, name, date }) => {
	return (
		<td key={`date-${row}-${column}`} className="gantt-body date">
			{date === undefined ? <div>{'Loading ...'}</div> : <DateComponent id={id} name={name} date={date} />}
		</td>
	)
}

/**
 * DatePickerを表示
 */
const DateComponent: React.FC<{
	id: string
	name: TaskDate
	date: string
}> = ({ id, name, date }) => {
	const dispatch = useTaskDispatch()
	console.debug('DatePicker: date', name, date)
	const _date = new Date(date)

	return (
		<ReactDatePicker
			className="datepicker"
			dateFormat="yyyy/MM/dd"
			selected={_date}
			onChange={(date) => {
				// date: Date | [Date, Date] | null
				console.warn('DatePicker onChange:', date)
				if (date instanceof Array || date === null) {
					return
				}

				return dispatch({
					type: name,
					id: id,
					date: Day.convertDateToString(date),
				})
			}}
		/>
	)
}

export { DatePicker }
