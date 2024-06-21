import {
	greet,
	greetByResponse,
	congratulate,
	NotificationManager,
} from './greet.js'

const OriginalDate = globalThis.Date

beforeAll(() => {
	globalThis.Date = new Proxy(globalThis.Date, {
		construct: () => new OriginalDate('2024-01-01'),
	})
})

afterAll(() => {
	globalThis.Date = OriginalDate
})

test('returns a greeting message for the given name', () => {
	expect(greet('John')).toBe('Hello, John! Happy, Sunday.')
})

test('returns a greeting message for the given user response', async () => {
	const response = Response.json({ firstName: 'Patrick' })
	expect(await greetByResponse(response)).toBe('Hello, Patrick! Happy, Sunday.')
})

test('throws on greeting user with undefined user response', async () => {
	await expect(greetByResponse(undefined)).rejects.toThrow(
		new Error('Failed to greet the user: no user response provided'),
	)
})

test('returns a congratulation message for the given name', () => {
	expect(congratulate('Sarah')).toBe('Congrats, Sarah!')
})

// 🐨 Create a "waitFor()" function that accepts a single argument:
// a "callback" function.
// 💰 async function waitFor(callback: () => void, maxRetries = 5) {}

// 🐨 In the "waitFor()" function, call the "callback" function.
// - If it doesn't throw, return.
// - If it throws, re-run it after a 250ms interval.
// - Retry the callback 5 times. If it still throws,
// throw the last thrown error as-is.
// 💰 Use a "while" loop and an early return to break it.
// let retries = 0
// while (retries < maxRetries) {
//   try {
//     retries++
//     callback()
//     return
//   } catch (error) {
//     if (retries === maxRetries) {
//       throw error
//     }
//     await new Promise(resolve => setTimeout(resolve, 250))
//   }
// }

async function waitFor(callback: () => void) {
	let retries = 0
	const maxRetries = 5

	while (retries < maxRetries) {
		try {
			retries++
			callback()
			return
		} catch (error) {
			if (retries === maxRetries) {
				throw error
			}

			await new Promise(resolve => setTimeout(resolve, 250))
		}
	}
}

test('displays a notification when a new user joins', async () => {
	const manager = new NotificationManager()
	manager.showNotification(Response.json({ firstName: 'Kate' }))

	// 🐨 Use the newly created "waitFor()" function
	// to wrap this assertion and, thus, await it to eventually resolve.
	await waitFor(() => {
		expect(manager.notifications[0]).toBe('Hello, Kate! Happy, Sunday.')
	})
})
