import React, { Dispatch } from 'react'
import { Day, Today } from '../Date/Day'
import { Action } from '../Types/Types'

type Props = {
	value: string
	dispatch: Dispatch<Action>
}

export const Select: React.FC<Props> = React.memo(({ value, dispatch }) => {
	console.debug('render Select', value)
	const thisYear = Today({ format: 'YYYY' })
	return (
		<select
			value={value}
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
		const label = Day(v, { format: 'YYYY/MM' })
		return (
			<option key={`${i}`} value={`${v}`} label={label}>
				{v}
			</option>
		)
	})
}
