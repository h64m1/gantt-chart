import React from 'react'
import * as Day from '../api/Date/Day'
import { Send } from '../api/Send'
import * as db from '../db/Database'
import { Action } from '../reducer/Action'
import { initializer, reducer } from '../reducer/reducer'
import { createTasks, State, Tasks } from '../reducer/Tasks'

const TaskStateContext = React.createContext<State>({
	yearMonth: Day.DayF(),
	beginDate: Day.addF(-1, 'month'),
	endDate: Day.addF(-1, 'month'),
	tasks: {},
})

type Dispatch = (action: Action) => void
const TaskDispatchContext = React.createContext<Dispatch | undefined>(undefined)

/**
 * タスク用のプロバイダ
 * @param children 子要素
 */
const TaskProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	// 当日の日付で処理年月stateを初期化
	const thisYearMonth = Day.startOfF('month')
	// TODO: 開始日と終了日、実装完了までは処理年月を残す
	const beginDate = Day.addF(-1, 'month')
	const endDate = Day.addF(1, 'month')
	console.debug('begin, end', beginDate, endDate)
	const [state, dispatch] = React.useReducer(
		reducer,
		{
			yearMonth: thisYearMonth,
			beginDate: beginDate,
			endDate: endDate,
			tasks: createTasks(thisYearMonth),
		},
		initializer,
	)

	// send apiのテスト
	Send()

	React.useEffect(() => {
		let didRead = false

		;(async () => {
			const tasks = (await db.read(state.yearMonth)) as Tasks
			if (!didRead) {
				// マウント時に初期化
				dispatch({
					type: 'init',
					yearMonth: state.yearMonth,
					beginDate: state.beginDate,
					endDate: state.endDate,
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
