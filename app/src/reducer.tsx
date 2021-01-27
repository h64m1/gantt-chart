import { Action, State, createTasks, createTask, getTaskKey } from './component/Types/Types'

// eslint-disable-next-line
export const reducer = (state: State, action: Action): any => {
	switch (action.type) {
		case 'yearMonth':
			console.debug('処理年月変更', action.yearMonth)
			return {
				...state,
				yearMonth: action.yearMonth,
			}
		case 'init':
			return init(action.yearMonth)

		case 'title':
			return title(state, action.id, action.title)

		case 'task': {
			console.debug('タスク変更', state)
			// ONとOFFを切り替える
			const taskStatus = [...state.tasks.entities[action.id].taskStatus]
			taskStatus[action.column] = !taskStatus[action.column]
			return {
				...state,
				tasks: {
					...state.tasks,
					entities: {
						...state.tasks.entities,
						[action.id]: {
							...state.tasks.entities[action.id],
							taskStatus: taskStatus,
						},
					},
				},
			}
		}

		// 行追加と削除
		case 'addRow': {
			const newTasks = { ...state.tasks }
			console.debug('行追加:', action)
			const ids = newTasks.ids
			const entities = newTasks.entities

			const key = getTaskKey(ids.length + 1, state.yearMonth)
			ids.push(key)
			entities[key] = createTask(state.yearMonth)

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
			console.debug('行削除', action)
			const ids = newTasks.ids
			const entities = newTasks.entities

			if (ids.length > 1) {
				// 要素が1つの場合は削除しない
				const key = getTaskKey(ids.length, state.yearMonth)
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

/**
 * stateの初期化
 */
// eslint-disable-next-line
export const initializer = (state: State): any => {
	console.debug('initializer', state)
	return init(state.yearMonth)
}

/**
 * 初期化処理: useEffectでstateを初期化
 * @param state ステート
 * @param yearMonth 処理年月
 */
const init = (yearMonth: string): State => {
	console.debug('init', yearMonth)

	return {
		yearMonth: yearMonth,
		tasks: createTasks(yearMonth),
	}
}

/**
 * タイトル変更
 * @param state ステート
 * @param id ID
 * @param title タイトル
 */
const title = (state: State, id: string, title: string) => {
	console.debug('タイトル変更', title)
	return {
		...state,
		tasks: {
			...state.tasks,
			entities: {
				...state.tasks.entities,
				[id]: {
					...state.tasks.entities[id],
					title: title,
				},
			},
		},
	}
}