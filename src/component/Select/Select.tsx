import React from 'react'
import * as Day from '../../api/Date/Day'
import { validate } from '../../api/Validation/Validation'
import { DatePicker } from '../../component/Picker/DatePicker'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'
import { Validation } from '../../reducer/Tasks'
import './select.css'

type SearchDate = 'beginDate' | 'endDate'

const Select: React.FC<{
	beginDate: string
	endDate: string
	validation: Validation
}> = React.memo(({ beginDate, endDate, validation }) => {
	console.debug('render Select: ', beginDate, endDate)
	return (
		<>
			<div id="select-parent" className="flex w-full justify-center">
				<DPicker name={'beginDate'} date={beginDate} />
				<span className="ml-1 mr-1"></span>
				<DPicker name={'endDate'} date={endDate} />
			</div>
			<div className="validation-date">
				{validation.beginDate === '' ? '' : validation.beginDate}
				{validation.endDate === '' ? '' : validation.endDate}
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
			className="w-28 border border-black"
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
