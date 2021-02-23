import * as db from '../db/Database'
import { Action } from './Action'
import { createTask, createTasks, getTaskKey, State, Tasks } from './Tasks'

// eslint-disable-next-line
export const reducer = (state: State, action: Action): any => {
	switch (action.type) {
		// カレンダー開始日変更
		case 'beginDate':
			return beginDate(state, action.date)

		// カレンダー終了日変更
		case 'endDate':
			return endDate(state, action.date)

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

		// タスク開始日変更
		case 'taskBeginDate':
			return taskBeginDate(state, action.id, action.date)

		// タスク完了日変更
		case 'taskEndDate':
			return taskEndDate(state, action.id, action.date)

		// 行追加と削除
		case 'addRow':
			return addRow(state)

		case 'deleteRow':
			return deleteRow(state)

		// ローカルファイルのインポート
		case 'importJson':
			return importJson(state, action.data)

		// カレンダー開始日のバリデーション
		case 'validateBeginDate':
			return validateBeginDate(state, action.message)

		// カレンダー終了日のバリデーション
		case 'validateEndDate':
			return validateEndDate(state, action.message)
	}
}

/**
 * stateの初期化
 * @param {State} state ステート
 */
// eslint-disable-next-line
export const initializer = (state: State): any => {
	console.debug('initializer', state)
	return init(state.yearMonth, state.beginDate, state.endDate, state.tasks)
}

/**
 * カレンダー開始日を変更
 * @param {State} state ステート
 * @param {string} date 日付
 */
const beginDate = (state: State, date: string) => {
	console.debug('開始日変更', date)
	return {
		...state,
		beginDate: date,
	}
}

/**
 * カレンダー終了日を変更
 * @param {State} state ステート
 * @param {string} date 日付
 */
const endDate = (state: State, date: string) => {
	console.debug('終了日変更', date)
	return {
		...state,
		endDate: date,
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
		validation: {
			beginDate: '',
			endDate: '',
		},
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
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
			},
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * タスク開始日変更
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} date 開始日
 */
const taskBeginDate = (state: State, id: string, date: string) => {
	console.debug('タスク開始日変更', state, id, date)
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
				beginDate: date,
			},
		},
	}
	db.write(state.yearMonth, newState.tasks)

	return newState
}

/**
 * タスク完了日変更
 * @param {State} state ステート
 * @param {string} id ID
 * @param {string} date 完了日
 */
const taskEndDate = (state: State, id: string, date: string) => {
	console.debug('タスク開始日変更', state, id, date)
	const newState = {
		...state,
		tasks: {
			...state.tasks,
			[id]: {
				...state.tasks[id],
				endDate: date,
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

	const key = getTaskKey(length, state.yearMonth)
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
		const key = getTaskKey(length - 1, state.yearMonth)
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

/**
 * カレンダー開始日のバリデーション
 * @param {State} state ステート
 * @param {string} message バリデーションメッセージ
 */
const validateBeginDate = (state: State, message: string) => {
	console.debug('開始日バリデーション', message)
	return {
		...state,
		validation: {
			...state.validation,
			beginDate: message,
		},
	}
}

/**
 * カレンダー終了日のバリデーション
 * @param {State} state ステート
 * @param {string} message バリデーションメッセージ
 */
const validateEndDate = (state: State, message: string) => {
	console.debug('終了日バリデーション', message)
	return {
		...state,
		validation: {
			...state.validation,
			endDate: message,
		},
	}
}
