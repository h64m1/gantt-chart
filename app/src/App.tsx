import React, { useEffect, useReducer } from 'react'
import { createTasks } from './component/Types/Types'
import { ThisYearMonth } from './component/Date/Day'
import GanttApp from './component/Gantt/GanttApp'
import { reducer } from './reducer'
import './App.css'

function App(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const [{ yearMonth, tasks }, dispatch] = useReducer(reducer, {
		yearMonth: ThisYearMonth({ format: 'YYYY-MM-DD' }),
		tasks: createTasks(),
	})

	useEffect(() => {
		// マウント時に行数を初期化
		dispatch({
			type: 'init',
		})
	}, [yearMonth])

	return (
		<div className="App">
			<GanttApp yearMonth={yearMonth} tasks={tasks} dispatch={dispatch} />
		</div>
	)
}

export default App
