import React from 'react'
import { render } from '@testing-library/react'
import * as db from './db/Database'
import App from './App'

// App test
test('renders learn react link', () => {
	const { getByText } = render(<App />)
	const addBUtton = getByText(/行追加/i)
	expect(addBUtton).toBeInTheDocument()
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
						taskStatus: [false, false, true],
					},
				},
			}

			const key: db.dbKey = '0'
			await db.write(key, object)
			const ret = await db.read(key)
			expect(ret).toEqual(object)

			const ret2 = await db.read(key)
			expect(ret2).toEqual(object)
		})
	})
})
