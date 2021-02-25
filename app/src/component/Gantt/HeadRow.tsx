import React from 'react'
import * as Day from '../../api/Date/Day'

const HeadRow: React.FC<{
	beginDate: string
	endDate: string
}> = React.memo(({ beginDate, endDate }) => {
	console.debug('render HeadRow')
	const headRows = getHeadRowContents(beginDate, endDate)
	return <tr key={0}>{headRows}</tr>
})

HeadRow.displayName = 'HeadRow'

/**
 * 開始日から完了日までの日付を<td>の配列で取得
 * @param {string} beginDate 開始日
 * @param {string} endDate 終了日
 */
function getHeadRowContents(beginDate: string, endDate: string): Array<JSX.Element> {
	// 開始日から完了日まで
	const dates = Day.DaysFromTo(beginDate, endDate, 'MM/DD (ddd)')
	console.debug('  HeadRow: 開始日-完了日', beginDate, endDate, '日付配列', dates)

	// タイトル用の要素を追加
	dates.unshift('')
	// 開始日と終了日の要素を追加
	dates.unshift('')
	dates.unshift('')
	// カラーピッカー用の要素追加
	dates.unshift('')

	return dates.map((v, i) => {
		// 曜日判定
		let className = 'gantt-head'
		const dayOfWeek = getDayOfWeek(v)
		if (dayOfWeek) {
			className = className.concat(' ', dayOfWeek)
		}
		if (v === '') {
			// title用のクラス名を付加
			className = className.concat(' ', 'title')
		}

		return (
			<td key={`head${i + 1}`} className={className}>
				{v}
			</td>
		)
	})
}

/**
 * 曜日を取得
 * @param date 日付
 * @return 曜日
 */
function getDayOfWeek(date: string): string {
	return getDayOfWeekString(date, 'Sat') || getDayOfWeekString(date, 'Sun')
}

/**
 * 日付が曜日に該当する場合、曜日を返却
 * @param date 日付
 * @param dayOfWeek 曜日
 * @return 曜日
 */
function getDayOfWeekString(date: string, dayOfWeek: string): string {
	return date.includes(dayOfWeek) ? dayOfWeek.toLowerCase() : ''
}

export { HeadRow }
