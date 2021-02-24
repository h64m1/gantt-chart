import { Tasks } from './Tasks'

export type Action =
	| {
			// カレンダー開始日を設定
			type: 'beginDate'
			date: string
	  }
	| {
			// カレンダー終了日を設定
			type: 'endDate'
			date: string
	  }
	| {
			// 初期化
			type: 'init'
			beginDate: string
			endDate: string
			tasks: Tasks
	  }
	| {
			// 行毎のタイトル変更
			type: 'title'
			id: number
			title: string
	  }
	| {
			// 行毎のタスク背景色の変更
			type: 'color'
			id: number
			color: string
	  }
	| {
			// 特定タスク、当該日付のタスクON/OFF
			type: 'task'
			id: number
			column: number
	  }
	| {
			// 特定タスクの開始日を設定
			type: 'taskBeginDate'
			id: number
			date: string
	  }
	| {
			// 特定タスクの完了日を設定
			type: 'taskEndDate'
			id: number
			date: string
	  }
	| {
			// 行追加
			type: 'addRow'
	  }
	| {
			// 行削除
			type: 'deleteRow'
	  }
	| {
			// ローカルファイルのインポート
			type: 'importJson'
			data: Array<{
				key: string
				value: unknown
			}>
	  }
	| {
			// カレンダー開始日のバリデーション
			type: 'validateBeginDate'
			message: string
	  }
	| {
			// カレンダー終了日のバリデーション
			type: 'validateEndDate'
			message: string
	  }
