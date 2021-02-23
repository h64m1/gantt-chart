import React from 'react'
import * as Day from '../../api/Date/Day'
import { validate } from '../../api/Validation/Validation'
import { DatePicker } from '../../component/Picker/DatePicker'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import './select.scss'

type SearchDate = 'beginDate' | 'endDate'

const Select: React.FC = React.memo(() => {
	const state = useTaskState()

	console.debug('render Select: ', state.beginDate, state.endDate)
	return (
		<>
			<div id="select-parent">
				<DPicker name={'beginDate'} date={state.beginDate} />
				<DPicker name={'endDate'} date={state.endDate} />
			</div>
			<div className="validation-date">
				{state.validation.beginDate === '' ? '' : state.validation.beginDate}
				{state.validation.endDate === '' ? '' : state.validation.endDate}
			</div>
		</>
	)
})

const DPicker: React.FC<{
	name: SearchDate
	date?: string | undefined
}> = ({ name, date }) => {
	const dispatch = useTaskDispatch()
	const state = useTaskState()

	return (
		<DatePicker
			className="search-datepicker"
			dateFormat="yyyy/MM/dd"
			date={date}
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
