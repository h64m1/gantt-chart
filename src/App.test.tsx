import React from 'react'
import { render, screen } from '@testing-library/react'
import * as db from './db/Database'
import App from './App'

// App test
describe('renders App', () => {
	it('render buttons', () => {
		// buttons
		render(<App />)
		expect(screen.getByText('Export')).toBeInTheDocument()
		expect(screen.getByText('Import')).toBeInTheDocument()
		expect(screen.getByText(/行追加/i)).toBeInTheDocument()
		expect(screen.getByText(/行削除/i)).toBeInTheDocument()
	})
})

// DB test
describe('Test IndexedDB', () => {
	describe('Write and read data', () => {
		it('task entities', async () => {
			const object = {
				id: [0, 1, 2],
				entities: {
					key0: {
						id: '0',
						row: 0,
						title: 'タイトル',
					},
				},
			}
			const key: db.dbKey = '0'
			await db.write(key, object)
			const ret = await db.read(key)
			expect(ret).toEqual(object)
			const ret2 = await db.read(key)
			expect(ret2).toEqual(object)
			db.close()
		})
	})
})
