const fs = require('fs')
const path = require('path')

module.exports = function (code, filePath, importOptions) {
  const tscpaths = Object.keys(importOptions.paths)
  const lines = code.split('\n')

  return lines.map((line) => {
    const matches = []
    const requireMatches = line.match(/require\(('|')(.*)('|')\)/g)
    const importMatches = line.match(/import (.*)('|')(.*)('|')/g)
    const exportMatches = line.match(/export (.*)('|')(.*)('|')/g)

    Array.prototype.push.apply(matches, requireMatches)
    Array.prototype.push.apply(matches, importMatches)
    Array.prototype.push.apply(matches, exportMatches)

    if (!matches || matches.length === 0) {
      return line
    }

    // Go through each require statement
    for (const match of matches) {

      // Find each paths
      for (const tscpath of tscpaths) {
        // Find required module & check if its path matching what is described in the paths config.
        const requiredModules = match.match(new RegExp(tscpath, 'g'))
        if (requiredModules && requiredModules.length > 0) {
          for (const _requiredModule of requiredModules) {
            // Skip if it resolves to the node_modules folder
            const modulePath = path.resolve('./node_modules/' + tscpath)
            if (fs.existsSync(modulePath)) {
              continue
            }
            // Get relative path and replace
            const sourcePath = path.dirname(filePath)
            const parsedTSPath = path.resolve(importOptions.outDir + '/' + importOptions.baseUrl + '/' + importOptions.paths[tscpath])
            const targetPathDir = path.dirname(parsedTSPath)
            const relativePath = path.relative(sourcePath, targetPathDir)
            if (relativePath) {
              line = line.replace(new RegExp(tscpath, 'g'), './' + relativePath + '/')
            } else {
              line = line.replace(new RegExp(tscpath, 'g'), './' + relativePath)
            }
          }
        }
      }
    }
    return line
  }).join('\n')
}
