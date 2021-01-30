import React from 'react'
import { createTasks } from './component/Types/Types'
import { ThisYearMonth } from './component/Date/Day'
import GanttApp from './component/Gantt/GanttApp'
import { reducer, initializer } from './reducer'
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
		// マウント時に初期化
		dispatch({
			type: 'init',
			yearMonth: yearMonth,
		})
	}, [yearMonth])

	return (
		<div className="App">
			<GanttApp yearMonth={yearMonth} tasks={tasks} dispatch={dispatch} />
		</div>
	)
}

export default App
