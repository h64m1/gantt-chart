// state type

// const state = {
//   yearMonth: '2021-01-01',
// 	 tasks: {
// 		'task1': { id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
// 	 }
// }

export type Task = {
	id: string
	row: number
	title: string
	color: string
	taskStatus: Array<boolean>
}

export type Tasks = {
	[id: string]: Task
}

export type State = {
	yearMonth: string
	tasks: Tasks
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

export const createTask = (row: number, yearMonth: string): Task => {
	// 	{ id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
	const key = getTaskKey(row + 1, yearMonth)
	return {
		id: key,
		row: row,
		title: '',
		color: defaultColor(),
		taskStatus: createEmptyDateArray(),
	}
}

/**
 * カラーピッカーのデフォルト色を取得
 */
export const defaultColor = (): string => {
	return '#ffff00'
}

/**
 * tasksの初期化
 * @param yearMonth 処理年月
 */
export const createTasks = (yearMonth: string): Tasks => {
	// 	'task1': { id: 'task1', row: 0, title: 'タイトル1', taskStatus: [false,false]}
	const row = 0
	const key = getTaskKey(row + 1, yearMonth)
	const tasks: Tasks = {}
	tasks[key] = createTask(row, yearMonth)
	return tasks
}
