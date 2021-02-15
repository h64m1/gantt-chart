import { Action } from './Action'
import { State, Tasks, createTask, createTasks, getTaskKey } from './Tasks'
import * as db from '../db/Database'

// eslint-disable-next-line
export const reducer = (state: State, action: Action): any => {
	switch (action.type) {
		case 'yearMonth':
			console.debug('処理年月変更', action.yearMonth)
			return {
				...state,
				yearMonth: action.yearMonth,
			}

		// 初期化
		case 'init':
			return init(action.yearMonth, action.tasks)

		// タイトル修正
		case 'title':
			return title(state, action.id, action.title)

		// タスク背景色の変更
		case 'color':
			return color(state, action.id, action.color)

		// 当該日のタスク変更
		case 'task':
			return task(state, action.id, action.column)

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
 * @param state {State} ステート
 */
// eslint-disable-next-line
export const initializer = (state: State): any => {
	console.debug('initializer', state)
	return init(state.yearMonth, state.tasks)
}

/**
 * 初期化処理: useEffectでstateを初期化
 * @param yearMonth {string} 処理年月
 * @param tasks {Tasks} タスク
 */
const init = (yearMonth: string, tasks: Tasks): State => {
	console.debug('init', yearMonth, 'tasks', tasks)
	const newTasks = tasks === null || tasks === undefined ? createTasks(yearMonth) : tasks

	return {
		yearMonth: yearMonth,
		tasks: newTasks,
	}
}

/**
 * タイトル変更
 * @param state {State} ステート
 * @param id {string} ID
 * @param title {string} タイトル
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
 * @param state {State} ステート
 * @param id {string} ID
 * @param title {string} タイトル
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
 * @param state {State} ステート
 * @param id {string} ID
 * @param column {number} 列ID
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
 * 行追加
 * @param state {State} ステート
 * @param id {string} ID
 * @param title {string} タイトル
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
 * @param state {State} ステート
 * @param id {string} ID
 * @param title {string} タイトル
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
 * @param state {State} ステート
 * @param data {Array} インポートしたデータ
 */
const importJson = async (
	state: State,
	data: Array<{
		key: string
		value: unknown
	}>,
) => {
	console.debug('click import ...')
	// DBに登録
	await Promise.all(data.map(async (item) => await db.write(item.key, item.value)))
	// 現在の処理年月でstateを検索
	const dbState = (await db.read(state.yearMonth)) as State

	const newState = {
		...state,
		yearMonth: state.yearMonth,
		tasks: dbState.tasks,
	}

	return newState
}
