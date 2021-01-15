import React from 'react'
import { useState } from 'react'
import { Days, Day, YearMonth } from '../Date/Day'
import { TaskStatus } from '../Types/Types'
import './Gantt.css'

// props type
type GanttProps = {
	thisYear: string // 今年
	yearMonth: string // 処理年月
	tasks: Array<TaskStatus>
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void
}

function Gantt(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const format = { format: 'YYYY-MM-DD' }
	const today = Day(undefined, format)
	const [yearMonth, setYearMonth] = useState(YearMonth(today, format))
	const [tasks, setTasks] = useState([
		{
			yearMonth: yearMonth,
			row: 0,
			column: 0,
			isOn: false,
		},
	])
	const [title, setTitle] = useState([''])

	const addIsOn = (event: React.MouseEvent, task: TaskStatus) => {
		// 既存taskの場合は追加しない
		const isRowColumnMatch = (e: TaskStatus) => {
			return e.row === task.row && e.column === task.column
		}
		const isTaskFound = tasks.some(isRowColumnMatch)

		if (isTaskFound) {
			// 既存のタスクが存在する場合
			tasks.forEach((e: TaskStatus, i: number, o: Array<TaskStatus>) => {
				if (isRowColumnMatch(e)) {
					o[i].isOn = !o[i].isOn
				}
			})
			setTasks([...tasks])
		} else {
			// タスク新規追加
			setTasks([...tasks, task])
		}
	}

	console.log(tasks)

	// props
	const props: GanttProps = {
		thisYear: Day(undefined, { format: 'YYYY' }),
		yearMonth: yearMonth,
		tasks: tasks,
		addIsOn: addIsOn,
	}

	// selecterのoption
	const options = GetMonthOptions(props)
	const headRows = getDatesInMonth(props)

	// 行追加と削除
	const addRow = () => {
		console.log('行追加')
		setTitle([...title, ''])
	}

	const deleteRow = () => {
		console.log('行削除')
		title.pop()
		setTitle([...title])
	}

	return (
		<>
			<nav id="navigation">
				<select value={yearMonth} onChange={(e) => setYearMonth(e.target.value)}>
					{options}
				</select>
			</nav>
			<article id="gantt-main">
				{/* ガントチャートのボディ部分 */}
				<table>
					<thead>
						<tr key={0}>{headRows}</tr>
					</thead>
					<tbody>
						{title.map((e, i) => {
							const bodyRows = getBody(props, i)
							return <tr key={i}>{bodyRows}</tr>
						})}
					</tbody>
					<tfoot></tfoot>
				</table>
				{/* 行追加、行削除のボタン */}
				<button className={'gantt-button'} onClick={addRow}>
					行追加
				</button>
				<button className={'gantt-button'} onClick={deleteRow}>
					行削除
				</button>
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

	const tasks = props.tasks

	return dates.map((v, i) => {
		let className = 'gantt-body'
		if (v === '') {
			// title用のクラス名を付加
			className = className.concat(' ', 'title')
		}

		// 当該カラムのtaskが存在するか
		const column = i
		const task = tasks.find((e) => e.row === row && e.column === column)
		if (task?.isOn) {
			className = className.concat(' ', 'task')
		}

		return (
			<td
				key={`body-${row}-${i}`}
				className={className}
				onClick={(e) => {
					// title列は追加しない
					if (i === 0) {
						return
					}

					// clickで当該セルをtasksに追加
					if (props.addIsOn) {
						props.addIsOn(e, {
							yearMonth: props.yearMonth,
							row: row,
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
