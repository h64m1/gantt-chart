// state type
// const state = {
// 	 tasks: [
// 		{ id: 'task1', title: 'タイトル1', ... },
// 		{ id: 'task2', title: 'タイトル2', ... },
// 	 ]
// }

type TaskDate = 'taskBeginDate' | 'taskEndDate'
type YearMonth = string

type Task = {
	id: string // タスクの主キー
	title: string // タスクのタイトル
	color: string // タスクの色
	beginDate: string | undefined // タスク開始日: YYYY-MM-DD
	endDate: string | undefined // タスク完了日: YYYY-MM-DD
}

type Tasks = Array<Task>

type Validation = {
	beginDate: YearMonth
	endDate: YearMonth
}

type State = {
	key: string // uniqueなkey
	beginDate: YearMonth // gantt-chartの表示開始日
	endDate: YearMonth // gantt-chartの表示終了日
	tasks: Tasks
	validation: Validation
}

/**
 * Taskのidを生成
 */
const generateKey = (): string => {
	// keyは固定
	return 'gantt-chart'
}

/**
 * tasksの初期化
 */
const createTask = (): Task => {
	return {
		id: generateKey(),
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
 */
const createTasks = (): Tasks => {
	// 	[{ id: 'task1', title: 'タイトル1', ... }]
	return [createTask()]
}

export type { TaskDate, Task, Tasks, Validation, State }
export { generateKey, createTask, createTasks }
