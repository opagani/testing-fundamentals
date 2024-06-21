function greet(name: string) {
	return 'Hello, ${name}!'
}

function congratulate(name: string) {
	return `Congrats, ${name}!`
}

// 🐨 Wrap each of the existing "expect()" calls in the
// "test()" function you will write later down this file.

// 💰 Use meaningful test case names, like:
// - returns a greeting message for the given name
// - returns a congratulation message for the given name

// 💰 Provide the callback to the "test()" function that
// will run these assertions.
// test('', () => {
//  expect(greet('John')).toBe('Hello, John!')
// })
expect(greet('John')).toBe('Hello, John!')
expect(congratulate('Sarah')).toBe('Congrats, Sarah!')

function expect(actual: unknown) {
	return {
		toBe(expected: unknown) {
			if (actual !== expected) {
				throw new Error(`Expected ${actual} to equal to ${expected}`)
			}
		},
	}
}

// 🐨 Create a new function called "test".
// The "test" function accepts two arguments: "title" and "callback".

// 🐨 In the "test" function, call the "callback" function
// and print a message to the console if it completes without throwing.
// Include a checkbox icon and the test's title in the message.
// 💰 See if you can *try* and *catch* any errors from the "callback".
// 💰 Use this template for success messages: `✓ ${title}`

// 🐨 If the calling the "callback" function throws an error,
// print another message to the console. In this one, include a cross
// icon, the test's name, and the thrown error.
// 💰 Use this template for error messages: `✗ ${title}`

test('returns a greeting message for the given name', () => {
	expect(greet('John')).toBe('Hello, John!')
})

test('returns a congratulation message for the given name', () => {
	expect(congratulate('Sarah')).toBe('Congrats, Sarah!')
})

function test(title: string, callback: () => void) {
	try {
		callback()
		console.log(`✓ ${title}`)
	} catch (error) {
		console.error(`✗ ${title}`)
		console.error(error, '\n')
	}
}
