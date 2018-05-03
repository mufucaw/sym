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

/**
 * Constants:
 */
const FIND_ANCHORS_REGEX = /\s+(&\S+)/g
const FIND_ALIASES_REGEX = /\s+(\*\S+)/g

/**
 * Matches all occurances of regex. Returns array of regex matches.
 */
const _matchAll = (regex, text) => {
  let results = []
  let matches
  do {
    matches = regex.exec(text)
    if (matches) {
      results.push(matches)
    }
  } while (matches)
  return results
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
  return invert(results)
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
 * Caw.
 */
const _findAliasesAndAnchors = (text) => {
  return {
    aliases: _findAliases(text),
    anchors: _findAnchors(text)
  }
}

/**
 * Caw.
 */
const _findAliases = _find(FIND_ALIASES_REGEX)

/**
 * Caw.
 */
const _findAnchors = _find(FIND_ANCHORS_REGEX)

/**
 * Caw.
 */
const _find = (regex) => {
  return (text) => {
    return _toHashedList(_getRegexMatches(_matchAll(regex, text), getFirstCaptureGroup, shortid))
  }
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
const merge = (filePaths) => {
  const files = _readFiles(filePaths)
  const substitutedFiles = files.map((fileText) => {
    const { aliases, anchors } = _findAliasesAndAnchors(fileText)
    return _substituteAliasesAndAnchors(fileText, { aliases, anchors })
  })
  // dump mergedObject to YAML, output
}

// Test:
merge('/home/bb/code/circleci-microservice/test/dc-api.yml', '/home/bb/code/circleci-microservice/test/global.yml')

module.exports = {
  merge
}
