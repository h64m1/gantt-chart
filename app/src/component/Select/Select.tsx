import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskDispatch, useTaskState } from '../../context/TaskContext'

const Select: React.FC = React.memo(() => {
	const state = useTaskState()
	const dispatch = useTaskDispatch()

	const yearMonth = state.yearMonth

	console.debug('render Select', yearMonth)
	const thisYear = Day.DayF(undefined, 'YYYY')
	return (
		<select
			value={yearMonth}
			onChange={(e) =>
				dispatch({
					type: 'yearMonth',
					yearMonth: e.target.value,
				})
			}
		>
			{getMonthOptions(thisYear)}
		</select>
	)
})

Select.displayName = 'Select'

/**
 * 処理年月selecterのoptionを取得
 * @param props オプション
 */
function getMonthOptions(thisYear: string): Array<JSX.Element> {
	// 処理月
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const yearMonths: Array<string> = []
	months.forEach((value) => {
		const month = `${value}`
		const yearMonth = `${thisYear}-${month.padStart(2, `0`)}-01`
		yearMonths.push(yearMonth)
	})

	return yearMonths.map((v, i) => {
		const label = Day.DayF(v, 'YYYY/MM')
		return (
			<option key={`${i}`} value={`${v}`} label={label}>
				{v}
			</option>
		)
	})
}

export { Select }
