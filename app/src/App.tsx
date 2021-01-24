import React, { useEffect, useReducer } from 'react'
import { Action, State } from './component/Types/Types'
import { ThisYearMonth } from './component/Date/Day'
import GanttApp from './component/Gantt/GanttApp'
import './App.css'

/**
 * 31日分の要素を持つ配列を取得
 */
const getEmptyDateArray = (): Array<boolean> => {
	return Array(31).fill(false)
}

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'yearMonth':
			console.log('処理年月変更', action.yearMonth)
			return {
				...state,
				yearMonth: action.yearMonth,
			}
		case 'init':
			return {
				...state,
				tasks: [
					{
						row: 0,
						title: '',
						taskStatus: getEmptyDateArray(),
					},
				],
			}
		case 'title': {
			console.log('タイトル変更', state)
			const newTasks = [...state.tasks]
			newTasks[action.index].title = action.title
			return {
				...state,
				tasks: newTasks,
			}
		}
		case 'task': {
			console.log('タスク変更', state)
			const newTasks = [...state.tasks]
			const currentTask = newTasks[action.row]
			if (currentTask.taskStatus === undefined) {
				return {
					...state,
				}
			}

			currentTask.taskStatus[action.column] = !currentTask.taskStatus[action.column]
			console.log('タスク状態', currentTask.taskStatus[action.column])
			return {
				...state,
				tasks: newTasks,
			}
		}

		// 行追加と削除
		case 'addRow': {
			const newTasks = [...state.tasks]
			console.log('行追加:', action, state.tasks, newTasks)
			if (newTasks[action.index]) {
				newTasks[action.index].row = action.index
			} else {
				newTasks.push({
					row: action.index,
					title: '',
					taskStatus: getEmptyDateArray(),
				})
			}
			return {
				...state,
				tasks: newTasks,
			}
		}
		case 'deleteRow': {
			const newTasks = [...state.tasks]
			console.log('行削除', action, state.tasks.length)
			if (state.tasks.length > 1) {
				// 要素が1つの場合は削除しない
				newTasks.pop()
			}
			return {
				...state,
				tasks: newTasks,
			}
		}
	}
}

function App(): JSX.Element {
	// 当日の日付で処理年月stateを初期化
	const [{ yearMonth, tasks }, dispatch] = useReducer(reducer, {
		yearMonth: ThisYearMonth({ format: 'YYYY-MM-DD' }),
		tasks: [
			{
				row: 0,
				title: '',
				taskStatus: getEmptyDateArray(),
			},
		],
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
