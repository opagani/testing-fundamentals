interface Assertions {
	toBe(expected: unknown): void
}

declare global {
	var expect: (actual: unknown) => Assertions
	var test: (title: string, callback: () => void) => void

	// 🐨 Declare a new function called "beforeAll".
	// It accepts a single argument: the "callback" function.
	var beforeAll: (callback: () => void) => void

	// 🐨 Similarly, declare a new function called "afterAll".
	// It also accepts a single "callback" argument.
	var afterAll: (callback: () => void) => void

	// 🐨 Finally, set the newly created "beforeAll" and "afterAll"
	// functions on the "globalThis" object. This will make them available
	// globally in our tests.
}

globalThis.expect = function (actual: unknown) {
	return {
		toBe(expected: unknown) {
			if (actual !== expected) {
				throw new Error(`Expected ${actual} to equal to ${expected}`)
			}
		},
	}
}

globalThis.test = function (title, callback) {
	try {
		callback()
		console.log(`✓ ${title}`)
	} catch (error) {
		console.error(`✗ ${title}`)
		console.error(error, '\n')
	}
}

// 🐨 Add the "beforeAll" function to the "globalThis" object.
// This way, it will be available to our tests on runtime.
// 💰 globalThis.beforeAll = function (callback) { ... }

// 🐨 In the "beforeAll" function, call the "callback" function.

globalThis.beforeAll = function (callback) {
	callback()
}

globalThis.afterAll = function (callback) {
	process.on('beforeExit', () => {
		callback()
	})
}

// 🐨 Next, add the "afterAll" function to the "globalThis" object.
// 💰 globalThis.afterAll = function (callback) { ... }

// 🐨 In the "afterAll" function, call the "callback" function
// only when the tests's are done.
// 💰 The tests are done when the Node.js process exits.
// process.on('beforeExit', callback)

globalThis.afterAll = function (callback) {
	process.on('beforeExit', () => {
		callback()
	})
}
