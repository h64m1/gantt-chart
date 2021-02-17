import React from 'react'
import { AddMonth, ThisYearMonth } from './api/Date/Day'
import { Send } from './api/Send'
import './App.css'
import GanttApp from './component/Gantt/GanttApp'
import * as db from './db/Database'
import { initializer, reducer } from './reducer/reducer'
import { createTasks, Tasks } from './reducer/Tasks'

function App(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const format = { format: 'YYYY-MM-DD' }
	const thisYearMonth = ThisYearMonth(format)
	// TODO: 開始日と終了日、実装完了までは処理年月を残す
	const beginDate = AddMonth(-1)
	const endDate = AddMonth(1)
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
