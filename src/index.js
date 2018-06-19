const os = require('os')

const IF_REGEX = /^\/\/#if (.*)/
const ELSE_REGEX = /^\/\/#else$/
const ENDIF_REGEX = /^\/\/#endif$/

// Equivalent to calling eval in the global scope.
const geval = eval

module.exports = (source) => {
  let lines = source.split(os.EOL)

  const result = lines.reduce((reduction, line) => {
    const {
      lines,
      stack,
    } = reduction
    const last = stack[stack.length - 1]
    let predicate

    if (predicate = IF_REGEX.exec(line)) {
      // #if
      let condition = false
      try {
        condition = geval(predicate[1])
      } catch(err) {
        console.error(err)
        condition = false
      }

      stack.push({
        tag: 'IF',
        condition,
      })
    } else if (predicate = ENDIF_REGEX.exec(line)) {
      // #endif
      if (last && last.tag === 'IF') {
        stack.pop()
      }
    } else if (predicate = ELSE_REGEX.exec(line)) {
      if (last && last.tag === 'IF') {
        const lastIf = stack.pop()

        stack.push({
          tag: 'IF',
          condition: !lastIf.condition,
        })
      }
    } else {
      // Normal code line.
      if (!last || last.tag !== 'IF' || last.condition) {
        lines.push(line)
      }
    }

    return {
      lines,
      stack
    }
  }, {
    lines: [],
    stack: []
  })

  return result.lines.join(os.EOL)
}
