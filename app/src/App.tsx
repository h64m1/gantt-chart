import React from 'react'
import * as Day from './api/Date/Day'
import { Send } from './api/Send'
import './App.css'
import GanttApp from './component/Gantt/GanttApp'
import * as db from './db/Database'
import { initializer, reducer } from './reducer/reducer'
import { createTasks, Tasks } from './reducer/Tasks'

const App: React.FC = () => {
	// 当日の日付で処理年月stateを初期化
	const thisYearMonth = Day.startOfF('month')
	// TODO: 開始日と終了日、実装完了までは処理年月を残す
	const beginDate = Day.addF(-1, 'month')
	const endDate = Day.addF(1, 'month')
	console.debug('begin, end', beginDate, endDate)
	const [{ yearMonth, tasks }, dispatch] = React.useReducer(
		reducer,
		{
			yearMonth: thisYearMonth,
			tasks: createTasks(thisYearMonth),
		},
		initializer,
	)

	// send apiのテスト
	Send()

	React.useEffect(() => {
		let didRead = false

		;(async () => {
			const tasks = (await db.read(yearMonth)) as Tasks
			if (!didRead) {
				// マウント時に初期化
				dispatch({
					type: 'init',
					yearMonth: yearMonth,
					beginDate: beginDate,
					endDate: endDate,
					tasks: tasks,
				})
			}
		})()

		return () => {
			didRead = true
		}
	}, [yearMonth])

	return (
		<div className="App">
			<GanttApp yearMonth={yearMonth} tasks={tasks} dispatch={dispatch} />
		</div>
	)
}

export default App
