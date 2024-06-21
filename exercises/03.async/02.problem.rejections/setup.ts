interface Assertions {
	toBe(expected: unknown): void

	// 🐨 Declare a new key called "rejects".
	// In that key, define a new assertion function called "toThrow".
	// The "toThrow" assertion accepts a single argument: the
	// expected Error instance.
	// 💰 rejects: { toThrow(expected: Error): Promise<void> }
	rejects: {
		toThrow(expected: Error): Promise<void>
	}
}

declare global {
	var expect: (actual: unknown) => Assertions
	var test: (title: string, callback: () => void) => void
	var beforeAll: (callback: () => void) => void
	var afterAll: (callback: () => void) => void
	var rejects: { toThrow(expected: Error): Promise<void> }
}

globalThis.expect = function (actual: unknown) {
	return {
		toBe(expected: unknown) {
			if (actual !== expected) {
				throw new Error(`Expected ${actual} to equal to ${expected}`)
			}
		},
		// 🐨 Following the type declaration for Assertions,
		// add a new key called "rejects" and declare the
		// "toThrow" function.
		// 💰 rejects: { toThrow(expected) { ... } }

		// 🐨 In the "toThrow()" function, listen to when the "actual"
		// Promise rejects, and compare the rejection error message
		// with the "expected" error message from the "toThrow()" argument.
		// 💰 return actual.catch((error) => { ... })

		// 🐨 Bonus points if you make "toThrow()" function throw an error
		// if the "actual" Promise *resolves*.

		rejects: {
			toThrow(expected) {
				if (!(actual instanceof Promise)) {
					throw new Error(`Expected ${actual} to be a promise`)
				}

				return actual
					.then(() => {
						throw new Error(`Expected ${actual} to reject but it didn't`)
					})
					.catch(error => {
						if (error.message !== expected.message) {
							throw new Error(
								`Expected ${error.message} to equal to ${expected.message}`,
							)
						}
					})
			},
		},
	}
}

globalThis.test = async function (title, callback) {
	try {
		await callback()
		console.log(`✓ ${title}`)
	} catch (error) {
		console.error(`✗ ${title}`)
		console.error(error, '\n')
	}
}

globalThis.beforeAll = function (callback) {
	callback()
}

globalThis.afterAll = function (callback) {
	process.on('beforeExit', () => {
		callback()
	})
}
