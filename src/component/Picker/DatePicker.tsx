import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

/**
 * DatePickerを表示
 */
const DatePicker: React.VFC<{
	date: string | undefined
	dateFormat: string
	onChange: (date: Date) => void
	className?: string
}> = ({ date, dateFormat, onChange, className }) => {
	const _date = date === undefined ? date : new Date(date)

	return <ReactDatePicker className={className} dateFormat={dateFormat} selected={_date} onChange={onChange} />
}

export { DatePicker }
