const VERSION = 1
const NAME = 'testDb'
const STORE = 'gantt'

/**
 * DBを取得
 * @param event db versionが変わった場合のevent
 */
const getDb = (event: IDBVersionChangeEvent): IDBDatabase => {
	// IDBOpenDBRequestでキャストしないとresultが取得できない
	return (event.target as IDBOpenDBRequest).result
}

export const dbTest = (): void => {
	const openRequest = indexedDB.open(NAME, VERSION)
	openRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
		const db = getDb(event)
		db.createObjectStore(STORE, {
			keyPath: 'key',
		})
	}
}
