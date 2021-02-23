import React from 'react'
import ReactDatePicker from 'react-datepicker'
import * as Day from '../../api/Date/Day'
import { validate } from '../../api/Validation/Validation'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import './select.scss'

type SearchDate = 'beginDate' | 'endDate'

const Select: React.FC = React.memo(() => {
	const state = useTaskState()

	console.debug('render Select: ', state.beginDate, state.endDate)
	return (
		<>
			<div id="select-parent">
				<DatePicker name={'beginDate'} date={state.beginDate} />
				<DatePicker name={'endDate'} date={state.endDate} />
			</div>
			<div className="validation-date">
				{state.validation.beginDate === '' ? '' : <div>{state.validation.beginDate}</div>}
			</div>
			<div className="validation-date">
				{state.validation.endDate === '' ? '' : <div>{state.validation.endDate}</div>}
			</div>
		</>
	)
})

const DatePicker: React.FC<{
	name: SearchDate
	date?: string | undefined
}> = ({ name, date }) => {
	const dispatch = useTaskDispatch()
	const state = useTaskState()
	const _date = date === undefined ? date : new Date(date)

	return (
		<ReactDatePicker
			className="search-datepicker"
			dateFormat="yyyy/MM/dd"
			selected={_date}
			onChange={(dateChanged) => {
				// date: Date | [Date, Date] | null
				if (dateChanged instanceof Array || dateChanged === null) {
					return
				}

				const _dateChanged = Day.convertDateToString(dateChanged)
				const validationMessage = validate(_dateChanged, state, name)
				if (validationMessage !== '') {
					const validationType = getValidationType(name)
					return dispatch({
						type: validationType,
						message: validationMessage,
					})
				}

				return dispatch({
					type: name,
					date: _dateChanged,
				})
			}}
		/>
	)
}

type ValidationType = 'validateBeginDate' | 'validateEndDate'

/**
 * バリデーション用のアクション名を取得
 * @param {SearchDate} name 検索条件の名前
 */
function getValidationType(name: SearchDate): ValidationType {
	return name === 'beginDate' ? 'validateBeginDate' : 'validateEndDate'
}

Select.displayName = 'Select'

export { Select }
