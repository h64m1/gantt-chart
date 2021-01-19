import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import { Days, Day, YearMonth } from '../Date/Day'
import { Task, TaskStatus, Title } from '../Types/Types'
import './Gantt.css'

// props type
type GanttProps = {
	thisYear: string // 今年
	yearMonth: string // 処理年月
	// tasks: Array<TaskStatus>
	task: Task
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void
	changeTitle: (event: ChangeEvent, title: Title) => void
}

function Gantt(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const format = { format: 'YYYY-MM-DD' }
	const today = Day(undefined, format)
	const [yearMonth, setYearMonth] = useState(YearMonth(today, format))

	const emptyTitle = {
		yearMonth: yearMonth,
		row: 0,
		title: '',
	}
	const [titles, setTitle] = useState([emptyTitle])

	const emptyTaskStatus = {
		yearMonth: yearMonth,
		row: 0,
		column: 0,
		isOn: false,
	}
	// const [tasks, setTasks] = useState([emptyTaskStatus])

	const emptyTask = {
		yearMonth: yearMonth,
		row: [0],
		titles: [emptyTitle],
		tasks: [emptyTaskStatus],
	}
	const [task, setTask] = useState(emptyTask)
	const [row, setRow] = useState([''])

	// タスクを追加
	const addIsOn = (event: React.MouseEvent, taskStatus: TaskStatus) => {
		// 既存taskの場合は追加しない
		const isRowColumnMatch = (e: TaskStatus) => {
			return e.row === taskStatus.row && e.column === taskStatus.column
		}
		// const isTaskFound = tasks.some(isRowColumnMatch)
		const isTaskFound = task.tasks.some(isRowColumnMatch)

		if (isTaskFound) {
			// 既存のタスクが存在する場合
			task.tasks.forEach((e: TaskStatus, i: number, o: Array<TaskStatus>) => {
				if (isRowColumnMatch(e)) {
					o[i].isOn = !o[i].isOn
				}
			})
			setTask({
				yearMonth: yearMonth,
				row: task.row,
				titles: task.titles,
				tasks: task.tasks,
			})
		} else {
			// タスク新規追加
			setTask({
				yearMonth: yearMonth,
				row: task.row,
				titles: task.titles,
				tasks: [...task.tasks, taskStatus],
			})
		}
	}

	// タイトルを変更
	const changeTitle = (event: ChangeEvent, title: Title) => {
		// 既存タイトルの場合は追加しない
		const isRowMatch = (e: Title) => {
			return e.row === title.row
		}
		const isTitleFound = titles.some(isRowMatch)

		if (isTitleFound) {
			// 既存タイトルが存在する場合
			titles.forEach((e: Title, i: number, o: Array<Title>) => {
				if (isRowMatch(e)) {
					o[i].title = title.title
				}
			})

			setTitle([...titles])
		} else {
			// タイトル新規追加
			setTitle([...titles, title])
		}
	}

	// 確認
	console.log('titles', titles, 'task', task)

	// props
	const props: GanttProps = {
		thisYear: Day(undefined, { format: 'YYYY' }),
		yearMonth: yearMonth,
		// tasks: tasks,
		task: task,
		addIsOn: addIsOn,
		changeTitle: changeTitle,
	}

	// selecterのoption
	const options = GetMonthOptions(props)
	const headRows = getDatesInMonth(props)

	// 行追加と削除
	const addRow = () => {
		console.log('行追加:', row.length)
		setRow([...row, ''])
	}

	const deleteRow = () => {
		console.log('行削除')
		if (row.length > 1) {
			// 要素が1つの場合は削除しない
			row.pop()
		}
		setRow([...row])
	}

	useEffect(() => {
		// マウント時に行数を初期化
		setRow([])
	}, [yearMonth])

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
						{row.map((e, i) => {
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

	const tasks = props.task.tasks

	return dates.map((v, column) => {
		let className = 'gantt-body'
		const isTitle = v === ''
		if (isTitle) {
			// title用のクラス名を付加
			className = className.concat(' ', 'title')
		}

		// 当該カラムのtaskが存在するか
		const task = tasks.find((e) => e.row === row && e.column === column)
		if (task?.isOn) {
			className = className.concat(' ', 'task')
		}

		// タイトル列にはフォームを表示（フォーム仮置）
		const cell = isTitle ? (
			<input
				type="text"
				className="title"
				onChange={(e) => {
					if (props.changeTitle) {
						props.changeTitle(e, {
							yearMonth: props.yearMonth,
							row: row,
							title: e.target.value,
						})
					}
				}}
			/>
		) : (
			''
		)

		return (
			<td
				key={`body-${row}-${column}`}
				className={className}
				onClick={(e) => {
					// title列は追加しない
					if (column === 0) {
						return
					}

					// clickで当該セルをtasksに追加
					if (props.addIsOn) {
						props.addIsOn(e, {
							yearMonth: props.yearMonth,
							row: row,
							column: column,
							isOn: true,
						})
					}
				}}
			>
				{cell}
			</td>
		)
	})
}

export default Gantt
