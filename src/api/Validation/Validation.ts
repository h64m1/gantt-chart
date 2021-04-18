import { State } from '../../reducer/Tasks'
import * as Day from '../Date/Day'

type ValidationType = 'beginDate' | 'endDate'

const validate = (value: unknown, state: State, type: ValidationType): string => {
	switch (type) {
		case 'beginDate': {
			const date = typeof value === 'string' ? value : ''
			return validateBeginDate(date, state)
		}
		case 'endDate': {
			const date = typeof value === 'string' ? value : ''
			return validateEndDate(date, state)
		}
	}
}

/**
 * カレンダー開始日のバリデーション
 * @param {string} beginDate 開始日
 * @param {State} state ステート
 */
function validateBeginDate(beginDate: string, state: State): string {
	// 開始日 < 終了日となっていること
	const begin = Day.Day(beginDate)
	const end = Day.Day(state.endDate)
	if (begin.isAfter(end)) {
		return `開始日${beginDate}は終了日${state.endDate}以前の日付を設定して下さい`
	}

	// validation ok
	return ''
}

/**
 * カレンダー終了日のバリデーション
 * @param {string} endDate 終了日
 * @param {State} state ステート
 */
function validateEndDate(endDate: string, state: State): string {
	// 開始日 < 終了日となっていること
	const begin = Day.Day(state.beginDate)
	const end = Day.Day(endDate)
	if (end.isBefore(begin)) {
		return `終了日${state.beginDate}は開始日${endDate}以後の日付を設定して下さい`
	}

	// validation ok
	return ''
}

export { validate }
