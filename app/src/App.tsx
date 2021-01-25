import React, { useEffect, useReducer } from 'react'
import { Action, State, createTasks, createTask, getTaskKey } from './component/Types/Types'
import { ThisYearMonth } from './component/Date/Day'
import GanttApp from './component/Gantt/GanttApp'
import './App.css'

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
				tasks: createTasks(),
			}
		case 'title': {
			console.log('タイトル変更', state)
			const newTasks = { ...state.tasks }
			newTasks.entities[action.id].title = action.title
			return {
				...state,
				tasks: newTasks,
			}
		}
		case 'task': {
			console.log('タスク変更', state)
			const newTasks = { ...state.tasks }
			const task = newTasks.entities[action.id]
			// ONとOFFを切り替える
			task.taskStatus[action.column] = !task.taskStatus[action.column]
			return {
				...state,
				tasks: newTasks,
			}
		}

		// 行追加と削除
		case 'addRow': {
			const newTasks = { ...state.tasks }
			console.log('行追加:', action)
			const ids = newTasks.ids
			const entities = newTasks.entities

			const key = getTaskKey(ids.length + 1)
			ids.push(key)
			entities[key] = createTask()

			return {
				...state,
				tasks: {
					ids: ids,
					entities: entities,
				},
			}
		}
		case 'deleteRow': {
			const newTasks = { ...state.tasks }
			console.log('行削除', action)
			const ids = newTasks.ids
			const entities = newTasks.entities

			if (ids.length > 1) {
				// 要素が1つの場合は削除しない
				const key = getTaskKey(ids.length)
				ids.pop()
				delete entities[key]
			}
			return {
				...state,
				tasks: {
					ids: ids,
					entities: entities,
				},
			}
		}
	}
}

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
