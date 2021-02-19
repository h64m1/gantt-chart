import { Action } from './Action'
import { State, Tasks, createTask, createTasks, getTaskKey } from './Tasks'
import * as Day from '../api/Date/Day'
import * as db from '../db/Database'

// eslint-disable-next-line
export const reducer = (state: State, action: Action): any => {
	switch (action.type) {
		case 'yearMonth':
			return yearMonth(state, action.yearMonth)

		// 初期化
		case 'init':
			return init(action.yearMonth, action.beginDate, action.endDate, action.tasks)

		// タイトル修正
		case 'title':
			return title(state, action.id, action.title)

		// タスク背景色の変更
		case 'color':
			return color(state, action.id, action.color)

		// 当該日のタスク変更
		case 'task':
			return task(state, action.id, action.column)

		// 当該日のタスク日付変更
		case 'taskDate':
			return taskDate(state, action.id, action.beginDate, action.endDate)

		// 行追加と削除
		case 'addRow':
			return addRow(state)

		case 'deleteRow':
			return deleteRow(state)

		// ローカルファイルのインポート
		case 'importJson':
			return importJson(state, action.data)
	}
}

/**
 * stateの初期化
 * @param {State} state ステート
 */
// eslint-disable-next-line
export const initializer = (state: State): any => {
	console.debug('initializer', state)
	return init(state.yearMonth, state.endDate, state.endDate, state.tasks)
}

/**
 * 処理年月を変更
 * @param {State} state ステート
 * @param {string} yearMonth 処理年月
 */
const yearMonth = (state: State, yearMonth: string) => {
	console.debug('処理年月変更', yearMonth)
	return {
		...state,
		beginDate: Day.addF(-1, 'month', yearMonth),
		endDate: Day.addF(1, 'month', yearMonth),
		yearMonth: yearMonth,
	}
}

/**
 * 初期化処理: useEffectでstateを初期化
 * @param {string} yearMonth 処理年月
 * @param {string} beginDate 開始日
 * @param {string} endDate 終了日
 * @param {Tasks} tasks タスク
 */
const init = (yearMonth: string, beginDate: string, endDate: string, tasks: Tasks): State => {
	console.debug('init', yearMonth, 'tasks', tasks)
	const newTasks = tasks === null || tasks === undefined ? createTasks(yearMonth) : tasks

	return {
		yearMonth: yearMonth,
		beginDate: beginDate,
		endDate: endDate,
		tasks: newTasks,
	}
}

/**
 * タイトル変更
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} title タイトル
 */
const title = (state: State, id: string, title: string) => {
	console.debug('タイトル変更', id, title)
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
				title: title,
			},
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * タスク背景色の変更
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} title タイトル
 */
const color = (state: State, id: string, color: string) => {
	console.debug('タスク背景色変更', id, color)
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
				color: color,
			},
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * task変更
 * @param {State} state ステート
 * @param {string} id ID
 * @param {number} column 列ID
 */
const task = (state: State, id: string, column: number) => {
	console.debug('タスク変更', state, id, column)
	// ONとOFFを切り替える
	const taskStatus = [...state.tasks[id].taskStatus]
	taskStatus[column] = !taskStatus[column]
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
				taskStatus: taskStatus,
			},
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * task日付変更
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} beginDate 開始日
 * @param {string} endDate 終了日
 */
const taskDate = (state: State, id: string, beginDate: string, endDate: string) => {
	console.debug('タスク日付変更', state, id, beginDate, endDate)
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
				beginDate: beginDate,
				endDate: endDate,
			},
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * 行追加
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} title タイトル
 */
const addRow = (state: State) => {
	console.debug('行追加:', state)

	const tasks = { ...state.tasks }
	const length = Object.values(tasks).length

	const key = getTaskKey(length + 1, state.yearMonth)
	const newState = {
		...state,
		tasks: {
			...tasks,
			[key]: createTask(length, state.yearMonth),
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * 行削除
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} title タイトル
 */
const deleteRow = (state: State) => {
	console.debug('行削除', state)

	const tasks = { ...state.tasks }
	const length = Object.values(tasks).length

	if (length > 1) {
		// 要素が1つの場合は削除しない
		const key = getTaskKey(length, state.yearMonth)
		delete tasks[key]
	}

	const newState = {
		...state,
		tasks: tasks,
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * ファイルのインポート
 * @param {State} state ステート
 * @param {Array} data インポートしたデータ
 */
const importJson = (
	state: State,
	data: Array<{
		key: string
		value: unknown
	}>,
) => {
	const currentData = data.find((item) => item.key === state.yearMonth)
	console.debug('click import ...', currentData)

	const newState = {
		...state,
		yearMonth: state.yearMonth,
		tasks: currentData?.value,
	}

	// DBに登録
	Promise.all(data.map(async (item) => await db.write(item.key, item.value)))

	return newState
}
