import React from 'react'
import ReactDatePicker from 'react-datepicker'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import './select.scss'

type SearchDate = 'beginDate' | 'endDate'

const Select: React.FC = React.memo(() => {
	const state = useTaskState()

	console.debug('render Select: ', state.beginDate, state.endDate)
	return (
		<div id="select-parent">
			<DPicker name={'beginDate'} date={state.beginDate} />
			<DPicker name={'endDate'} date={state.endDate} />
		</div>
	)
})

const DPicker: React.FC<{
	name: SearchDate
	date?: string | undefined
}> = ({ name, date }) => {
	const dispatch = useTaskDispatch()
	const _date = date === undefined ? date : new Date(date)

	return (
		<ReactDatePicker
			className="search-datepicker"
			dateFormat="yyyy/MM/dd"
			selected={_date}
			onChange={(date) => {
				// date: Date | [Date, Date] | null
				if (date instanceof Array || date === null) {
					return
				}

				return dispatch({
					type: name,
					date: Day.convertDateToString(date),
				})
			}}
		/>
	)
}

Select.displayName = 'Select'

export { Select }
