import { Column, Table } from '@h64m1/react-table-component'
import React from 'react'
import * as Day from '../../api/Date/Day'
import { useTaskState } from '../../context/TaskContext'
import { ColorPicker } from '../Picker/ColorPicker'
import { TaskDatePicker } from '../Picker/TaskDatePicker'
import { Title } from '../Title/Title'
import './Gantt.scss'
import { Navigation } from './Navigation'
import { Search } from './Search'

const GanttApp: React.FC = () => {
	const state = useTaskState()
	console.debug('render GanttApp | tasks:', state.tasks)

	const className: { [key: string]: string } = {}
	className['title'] = 'gantt-body title'
	className['taskBeginDate'] = 'gantt-body date'
	className['taskEndDate'] = 'gantt-body date'
	className['color'] = 'gantt-body color-picker'

	const dates = Day.DaysFromTo(state.beginDate, state.endDate, 'MM/DD (ddd)')
	const data = state.tasks.map((task, row) => {
		const d = {
			title: <Title row={row} title={task.title} />,
			beginDate: <TaskDatePicker row={row} name={'taskBeginDate'} date={task.beginDate} />,
			endDate: <TaskDatePicker row={row} name={'taskEndDate'} date={task.endDate} />,
			color: <ColorPicker row={row} color={task.color} />,
		}
		const dd: { [key: string]: React.ReactElement | undefined } = {}
		dates.forEach((dayTitle, column) => {
			dd[dayTitle] = undefined

			const day = Day.addF(column, 'day', state.beginDate)
			const style = { backgroundColor: '' }
			if (hasTask(day, task.beginDate, task.endDate)) {
				style.backgroundColor = task.color
				dd[dayTitle] = <div style={style}>{'　'}</div>
			}
		})

		return Object.assign(dd, d)
	})
	console.debug('tasks', state.tasks, 'data', data)

	// カラーピッカー用の要素追加
	dates.unshift('color')
	// 開始日と終了日の要素を追加
	dates.unshift('endDate')
	dates.unshift('beginDate')
	// タイトル用の要素を追加
	dates.unshift('title')

	const header: { [key: string]: string } = {}
	header['title'] = ''
	header['beginDate'] = ''
	header['endDate'] = ''
	header['color'] = ''

	return (
		<>
			<nav id="navigation">
				<Navigation beginDate={state.beginDate} endDate={state.endDate} validation={state.validation} />
			</nav>
			<article id="gantt-main">
				{/* 検索パネル: ガントチャートの表示範囲 */}
				<Search />
				<Table data={data}>
					{dates.map((e) => (
						<Column
							key={e}
							name={e}
							header={header[e] !== undefined ? header[e] : e}
							className={className[e]}
						/>
					))}
				</Table>
			</article>
		</>
	)
}

/**
 * 当該カラムがタスクを持っているか
 * @param {string} date 当該カラムの日付
 * @param {string} beginDate 開始日
 * @param {string} endDate 完了日
 */
const hasTask = (date: string, beginDate?: string, endDate?: string): boolean => {
	// 当該カラムの日付が、開始日と終了日の範囲内かどうか
	const _date = Day.Day(date)
	const _beginDate = Day.Day(beginDate)
	const _endDate = Day.Day(endDate)

	const isBeginDateOk = _date.isSame(_beginDate) || _date.isAfter(_beginDate)
	const isEndDateOk = _date.isSame(_endDate) || _date.isBefore(_endDate)
	return isBeginDateOk && isEndDateOk
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

export default GanttApp
