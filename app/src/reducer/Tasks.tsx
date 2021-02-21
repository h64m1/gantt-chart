// state type

// const state = {
//   yearMonth: '2021-01-01',
// 	 tasks: {
// 		'task1': { id: 'task1', row: 0, title: 'タイトル1' }
// 	 }
// }

type Task = {
	id: string // タスクの主キー
	row: number // 行番号
	title: string // タスクのタイトル
	color: string // タスクの色
	beginDate: string | undefined // タスク開始日: YYYY-MM-DD
	endDate: string | undefined // タスク完了日: YYYY-MM-DD
}

type Tasks = {
	[id: string]: Task
}

type State = {
	yearMonth: string // 処理年月 TODO: 不要になるまで残す
	beginDate: string // gantt-chartの表示開始日
	endDate: string // gantt-chartの表示終了日
	tasks: Tasks
}

/**
 * Taskのidを取得
 * @param {number} id ID
 * @param {string} yearMonth 処理年月
 */
const getTaskKey = (id: number, yearMonth: string): string => {
	return `task-${yearMonth}-${id}`
}

/**
 * tasksの初期化
 * @param {number} row 行番号
 * @param {string} yearMonth 処理年月
 */
const createTask = (row: number, yearMonth: string): Task => {
	const key = getTaskKey(row, yearMonth)
	return {
		id: key,
		row: row,
		title: '',
		color: defaultColor(),
		beginDate: undefined,
		endDate: undefined,
	}
}

/**
 * カラーピッカーのデフォルト色を取得
 */
const defaultColor = (): string => {
	return '#ffff00'
}

/**
 * tasksの初期化
 * @param {string} yearMonth 処理年月
 */
const createTasks = (yearMonth: string): Tasks => {
	// 	'task1': { id: 'task1', row: 0, title: 'タイトル1' }
	const row = 0
	const key = getTaskKey(row, yearMonth)
	const tasks: Tasks = {}
	tasks[key] = createTask(row, yearMonth)
	return tasks
}

export type { Task, Tasks, State }
export { getTaskKey, createTask, createTasks }
