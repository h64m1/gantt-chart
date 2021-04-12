import { v4 as uuidv4 } from 'uuid'

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

type SearchDate = {
	beginDate: YearMonth // gantt-chartの表示開始日
	endDate: YearMonth // gantt-chartの表示終了日
}

type State = {
	taskDbKey: string // task用のDB key
	searchDateKey: string // 検索処理年月日用のkey
	beginDate: YearMonth // gantt-chartの表示開始日
	endDate: YearMonth // gantt-chartの表示終了日
	tasks: Tasks
	validation: Validation
}

/**
 * Taskのidを生成
 */
const generateKey = (): string => {
	return uuidv4()
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

/**
 * Stateから検索処理年月日を取得
 * @param state State
 * @returns 検索処理年月日
 */
const searchDate = (state: State): SearchDate => {
	return {
		beginDate: state.beginDate,
		endDate: state.endDate,
	}
}

export type { SearchDate, TaskDate, Task, Tasks, Validation, State }
export { generateKey, createTask, createTasks, searchDate }
