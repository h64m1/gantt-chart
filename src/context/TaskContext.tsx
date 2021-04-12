import React from 'react'
import * as Day from '../api/Date/Day'
import * as Key from '../api/Key/Key'
import { Send } from '../api/Send'
import * as db from '../db/Database'
import { Action } from '../reducer/Action'
import { initializer, reducer } from '../reducer/reducer'
import { createTasks, SearchDate, State, Tasks } from '../reducer/Tasks'

const TaskStateContext = React.createContext<State>({
	taskDbKey: Key.taskDbKey,
	searchDateKey: Key.searchDateKey,
	beginDate: Day.addF(-1, 'month'),
	endDate: Day.addF(-1, 'month'),
	tasks: [],
	validation: {
		beginDate: '',
		endDate: '',
	},
})

type Dispatch = (action: Action) => void
const TaskDispatchContext = React.createContext<Dispatch | undefined>(undefined)

/**
 * タスク用のプロバイダ
 * @param children 子要素
 */
const TaskProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const beginDate = Day.addF(-1, 'month')
	const endDate = Day.addF(1, 'month')
	const [state, dispatch] = React.useReducer(
		reducer,
		{
			beginDate: beginDate,
			endDate: endDate,
			tasks: createTasks(),
		},
		initializer,
	)

	// send apiのテスト
	Send()

	React.useEffect(() => {
		let didRead = false

		;(async () => {
			const { beginDate, endDate } = (await db.read(state.searchDateKey)) as SearchDate
			const tasks = (await db.read(state.taskDbKey)) as Tasks
			if (!didRead) {
				// マウント時に初期化
				dispatch({
					type: 'init',
					beginDate: beginDate,
					endDate: endDate,
					tasks: tasks,
				})
			}
		})()

		return () => {
			didRead = true
		}
	}, [state.beginDate, state.endDate])

	return (
		<TaskStateContext.Provider value={state}>
			<TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
		</TaskStateContext.Provider>
	)
}

/**
 * state用のcontextを取得
 */
function useTaskState(): State {
	const context = React.useContext(TaskStateContext)
	if (context === undefined) {
		throw new Error('useTaskState must be used within a TaskProvider')
	}
	return context
}

/**
 * dispatch用のcontextを取得
 */
function useTaskDispatch(): Dispatch {
	const context = React.useContext(TaskDispatchContext)
	if (context === undefined) {
		throw new Error('useTaskDispatch must be used within a TaskProvider')
	}
	return context
}

export { TaskProvider, useTaskState, useTaskDispatch }
