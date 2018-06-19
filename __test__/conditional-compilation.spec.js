const loader = require('../src/index')
const { join } = require('path')
const fs = require('fs')

const fixturesDir = join(__dirname, 'fixtures', 'conditional-compilation')

test('single if', () => {
	const actual = loader(fs.readFileSync(join(fixturesDir, 'single-if.js'), 'utf8'))

	expect(actual).toMatchSnapshot()
})

test('if else', () => {
	const actual = loader(fs.readFileSync(join(fixturesDir, 'if-else.js'), 'utf8'))

	expect(actual).toMatchSnapshot()
})
