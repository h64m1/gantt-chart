import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import { ThisYearMonth } from '../Date/Day'
import { TaskStatus, Title } from '../Types/Types'
import { Select } from '../Select/Select'
import { HeadRow } from './HeadRow'
import { BodyRow } from './BodyRow'
import './Gantt.css'

// props type
type GanttProps = {
	yearMonth: string // 処理年月
	tasks: Array<TaskStatus>
	addIsOn: (event: React.MouseEvent, task: TaskStatus) => void
	changeTitle: (event: ChangeEvent, title: Title) => void
}

function GanttApp(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const [yearMonth, setYearMonth] = useState(ThisYearMonth({ format: 'YYYY-MM-DD' }))
	const [titles, setTitle] = useState([
		{
			yearMonth: yearMonth,
			row: 0,
			title: '',
		},
	])
	const [tasks, setTasks] = useState([
		{
			yearMonth: yearMonth,
			row: 0,
			column: 0,
			isOn: false,
		},
	])
	const [row, setRow] = useState([''])

	// タスクを追加
	const addIsOn = (event: React.MouseEvent, taskStatus: TaskStatus) => {
		// 既存taskの場合は追加しない
		const isRowColumnMatch = (e: TaskStatus) => {
			return e.row === taskStatus.row && e.column === taskStatus.column
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
			setTasks([...tasks, taskStatus])
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
	console.log('titles', titles, 'task', tasks)

	// props
	const props: GanttProps = {
		yearMonth: yearMonth,
		tasks: tasks,
		// task: task,
		addIsOn: addIsOn,
		changeTitle: changeTitle,
	}

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
				<Select value={yearMonth} onChange={(v) => setYearMonth(v)} />
			</nav>
			<article id="gantt-main">
				<Gantt props={props} row={row} addRow={addRow} deleteRow={deleteRow} />
			</article>
		</>
	)
}

type Props = {
	children?: never
	props: GanttProps
	row: string[]
	addRow: (event: React.MouseEvent) => void
	deleteRow: (event: React.MouseEvent) => void
}

const Gantt: React.FC<Props> = ({ props, row, addRow, deleteRow }) => {
	console.log('render Gantt')
	return (
		<>
			{/* 行追加、行削除のボタン */}
			<div className={'gantt-button'}>
				<button onClick={addRow}>行追加</button>
				<button onClick={deleteRow}>行削除</button>
			</div>
			{/* ガントチャートのボディ部分 */}
			<table>
				<thead>
					<HeadRow yearMonth={props.yearMonth} />
				</thead>
				<tbody>
					{row.map((e, i) => {
						return (
							<BodyRow
								key={`${i}`}
								row={i}
								yearMonth={props.yearMonth}
								tasks={props.tasks}
								changeTitle={props.changeTitle}
								addIsOn={props.addIsOn}
							/>
						)
					})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</>
	)
}

export default GanttApp
