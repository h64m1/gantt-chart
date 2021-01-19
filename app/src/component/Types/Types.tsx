// state type

export type Task = {
	yearMonth: string
	row: Array<number>
	titles: Array<Title>
	tasks: Array<TaskStatus>
}
export interface TaskStatus {
	yearMonth: string
	row: number
	column: number
	isOn: boolean
}

export interface Title {
	yearMonth: string
	row: number
	title: string
}
