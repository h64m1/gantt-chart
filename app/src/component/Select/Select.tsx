import React from 'react'
import { Day } from '../Date/Day'

type Props = {
	value: string
	onChange: (value: string) => void
}

export const Select: React.FC<Props> = ({ value, onChange }) => {
	console.log('render Select', value)
	const thisYear = Day(undefined, { format: 'YYYY' })
	return (
		<select value={value} onChange={(e) => onChange(e.target.value)}>
			{getMonthOptions(thisYear)}
		</select>
	)
}

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
