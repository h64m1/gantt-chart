// state type
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
