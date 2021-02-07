import React from 'react'
import { createTasks, Tasks } from './reducer/Tasks'
import { ThisYearMonth } from './api/Date/Day'
import GanttApp from './component/Gantt/GanttApp'
import { reducer, initializer } from './reducer/reducer'
import * as db from './db/Database'
import './App.css'

function App(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const thisYearMonth = ThisYearMonth({ format: 'YYYY-MM-DD' })
	const [{ yearMonth, tasks }, dispatch] = React.useReducer(
		reducer,
		{
			yearMonth: thisYearMonth,
			tasks: createTasks(thisYearMonth),
		},
		initializer,
	)

	React.useEffect(() => {
		let didRead = false

		// { yearMonth: '2021-02-01', tasks: { 'task1': { id: 'task1', row: 0, title: 'title1', taskStatus: [false, false]} }}
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
