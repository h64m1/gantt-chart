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
			return {
				...state,
				tasks: createTasks(),
			}
		case 'title': {
			console.debug('タイトル変更', state)
			const newTasks = { ...state.tasks }
			newTasks.entities[action.id].title = action.title
			return {
				...state,
				tasks: newTasks,
			}
		}
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
			console.debug('行削除', action)
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
