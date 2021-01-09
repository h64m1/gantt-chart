import React from 'react'
import { useState } from 'react'
import { Days, Day } from '../Date/Day'
import { TaskStatus } from '../Types'
import './Gantt.css'

// props type
type GanttProps = Partial<{
	thisYear: string // 今年
	yearMonth: string // 処理年月
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void
}>

function Gantt(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const today = Day(undefined, { format: 'YYYY-MM-DD' })
	const [yearMonth, setYearMonth] = useState(today)
	const [tasks, setTasks] = useState([
		{
			row: 0,
			column: 0,
			isOn: false,
		},
	])

	const addIsOn = (event: React.MouseEvent, task: TaskStatus) => {
		setTasks([...tasks, task])
	}

	console.log(tasks)

	// props
	const props: GanttProps = {
		thisYear: Day(undefined, { format: 'YYYY' }),
		yearMonth: yearMonth,
		addIsOn: addIsOn,
	}

	// selecterのoption
	const options = GetMonthOptions(props)
	const headRows = getDatesInMonth(props)
	const titles = ['a', 'b', 'c']

	return (
		<>
			<nav id="navigation">
				<select value={yearMonth} onChange={(e) => setYearMonth(e.target.value)}>
					{options}
				</select>
			</nav>
			<article id="gantt-main">
				<table>
					<thead>
						<tr key={0}>{headRows}</tr>
					</thead>
					<tbody>
						{titles.map((e, i) => {
							const bodyRows = getBody(props, i)
							return <tr key={i}>{bodyRows}</tr>
						})}
					</tbody>
					<tfoot></tfoot>
				</table>
			</article>
		</>
	)
}

/**
 * 1ヶ月分の日付を<td>の配列で取得
 * @param props オプション
 */
function getDatesInMonth(props: GanttProps): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(props.yearMonth, { format: 'DD (ddd)' })
	// タイトル用の要素を追加
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
 * 処理年月selecterのoptionを取得
 * @param props オプション
 */
function GetMonthOptions(props: GanttProps): Array<JSX.Element> {
	// 処理月
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const yearMonths: Array<string> = []
	months.forEach((value) => {
		const month = `${value}`
		const yearMonth = `${props.thisYear}-${month.padStart(2, `0`)}-01`
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

/**
 * 1ヶ月分の枠を<td>の配列で取得
 * @param props オプション
 * @param row 行番号
 */
function getBody(props: GanttProps, row: number): Array<JSX.Element> {
	// 一ヶ月分の日付
	const dates = Days(props.yearMonth, { format: 'DD (ddd)' })
	// タイトル用の要素を追加
	dates.unshift('')
	return dates.map((v, i) => {
		let className = 'gantt-body'
		if (v === '') {
			// title用のクラス名を付加
			className = className.concat(' ', 'title')
		}

		return (
			<td
				key={`body-${row}-${i}`}
				className={className}
				onClick={(e) => {
					// clickで当該セルをtasksに追加
					// TODO: 追加済みの要素は追加しないよう条件を設定
					if (props.addIsOn) {
						props.addIsOn(e, {
							row: 0,
							column: i,
							isOn: true,
						})
					}
				}}
			></td>
		)
	})
}

export default Gantt
