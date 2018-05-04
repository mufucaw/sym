/**
 * Sane YAML Merger
 */

/**
 * Built-in:
 */
const fs = require('fs')

/**
 * Third-party:
 */
const invert = rqeuire('lodash.invert')
const shortid = require('shortid')
const yaml = require('js-yaml')

/**
 * Caw.
 */
const _escapeRegex = (regex) => {
  return regex.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

/**
 * Caw.
 */
const _regexReplaceAll = (text, find, replace) {
  return str.replace(new RegExp(_escapeRegex(find), 'g'), replace)
}

/**
 * Caw.
 */
const _replaceAll = (str, findReplaceMap) {
  Object.entries(findReplaceMap).forEach((find, replace) => {
    str = _regexReplaceAll(str, find, replace)
  })
  return str
}

/**
 * Caw.
 */
const _toHashedList = (array, hash) => {
  const results = array.reduce((accumulator, current) => {
    if (result && !accumulator[result]) {
      accumulator[result] = hash()
    }
    return accumulator
  }, {})
  return results
}

/**
 * Matches all occurances of regex. Returns array of regex matches.
 */
const _matchAll = (str, regex) => {
  let results = []
  let matches
  do {
    matches = regex.exec(str)
    if (matches) {
      results.push(matches)
    }
  } while (matches)
  return results
}

/**
 * Caw.
 */
const _getRegexMatches = (regexMatches) => {
  return regexMatches.map((regexMatch) => {
    return regexMatch[1]
  })
}

/**
 * Reads contents of each file path, returns array of file contents.
 */
const _readFiles = (filePaths) => filePaths.map(fs.readFileSync)

/**
 * Merges YAML files while preserving anchors and aliases. Returns merged YAML as string.
 *
 * @param filePaths {Array}
 */
const merge = (filePaths, substitutionRegexes) => {
  let findReplaceMap = {}
  const fileContents = _readFiles(filePaths)
  const substitutedFiles = fileContents.map((fileContent) => {
    const stringsToReplace = substitutionRegexes.map((substitutionRegex) => {
      return _getRegexMatches(_matchAll(fileContent, regex))
    })
    findReplaceMap = _toHashedList(stringsToReplace)
    return _replaceAll(fileContent, findReplaceMap)
  })
  const substitutedObjects = substitutedFiles.map((substitutedFile) => {
    return yaml.safeLoad(substitutedFile) // Inline yaml.safeLoad in map call?
  })
  const mergedSubstitutedObject = substitutedObjects.reduce((accumulator, current) => {
    return { ...accumulator, ...current }
  }, {})
  const mergedSubstitutedContent = yaml.safeDump(mergedObject)
  const mergedRestoredContent = _replaceAll(mergedSubstitutedContent, invert(findReplaceMap))
  return mergedRestoredContent
}

// Test:
const filePaths = [
  '/home/bb/code/circleci-microservice/test/dc-api.yml',
  '/home/bb/code/circleci-microservice/test/global.yml'
]
const substitutionRegexes = [
  /\s+(&\S+)/g,
  /\s+(\*\S+)/g
]
merge(filePaths, substitutionRegexes)

module.exports = {
  merge
}
