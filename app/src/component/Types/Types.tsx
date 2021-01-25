// state type

// const state = {
// 	yearMonth: '2021-01-01',
// 	tasks: {
// 		ids: ['task1', 'task2', 'task3'],
// 		entities: {
// 			'task1': { id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
// 		}
// 	}
// }

export type Task = {
	id: string
	row: number
	title: string
	taskStatus: Array<boolean>
}

export type TaskEntities = {
	[id: string]: Task
}

export type Tasks = {
	ids: Array<string>
	entities: TaskEntities
}

export type State = {
	yearMonth: string
	tasks: Tasks
}

export type Action =
	| {
			// 処理年月の変更
			type: 'yearMonth'
			yearMonth: string
	  }
	| {
			// 初期化
			type: 'init'
	  }
	| {
			// 行毎のタイトル変更
			type: 'title'
			id: string
			title: string
	  }
	| {
			// 特定タスク、当該日付のタスクON/OFF
			type: 'task'
			id: string
			column: number
	  }
	| {
			// 行追加
			type: 'addRow'
			// id: string
	  }
	| {
			// 行削除
			type: 'deleteRow'
	  }

/**
 * 31日分の要素を持つ配列を取得
 */
export const createEmptyDateArray = (): Array<boolean> => {
	return Array(31).fill(false)
}

/**
 * Taskのidを取得
 * @param id ID
 */
export const getTaskKey = (id: number): string => {
	return `task${id}`
}

export const createTask = (): Task => {
	// 	{ id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
	const row = 0
	const key = getTaskKey(row + 1)
	return {
		id: key,
		row: row,
		title: '',
		taskStatus: createEmptyDateArray(),
	}
}

export const createTasks = (): Tasks => {
	// 	'task1': { id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
	const row = 0
	const key = getTaskKey(row + 1)
	const entities: TaskEntities = {}
	entities[key] = createTask()
	return {
		ids: [key],
		entities: entities,
	}
}
