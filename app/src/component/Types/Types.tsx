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
			yearMonth: string
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
export const getTaskKey = (id: number, yearMonth: string): string => {
	return `task-${yearMonth}-${id}`
}

export const createTask = (yearMonth: string): Task => {
	// 	{ id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
	const row = 0
	const key = getTaskKey(row + 1, yearMonth)
	return {
		id: key,
		row: row,
		title: '',
		taskStatus: createEmptyDateArray(),
	}
}

/**
 * tasksの初期化
 * @param yearMonth 処理年月
 */
export const createTasks = (yearMonth: string): Tasks => {
	// 	'task1': { id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
	const row = 0
	const key = getTaskKey(row + 1, yearMonth)
	const entities: TaskEntities = {}
	entities[key] = createTask(yearMonth)
	return {
		ids: [key],
		entities: entities,
	}
}
