'use strict'

const store = require('../store')
const api = require('../patterns/api.js')
const ui = require('../patterns/ui.js')

const animatePatterns = function () {
  api.getPatterns()
    .then(animation)
    .catch(ui.failure)
}

const animation = function (data) {
  if (data.patterns.length > 0) {
  // console.log('Data is: ' + data)
    for (let i = 0; i < data.patterns.length; i++) {
      const k = i
      setTimeout(function () {
        store.mainGrid = data.patterns[i].grid
        store.fillMainGrid()
      }, 100 * k)
    }
  } else {
    noSavedPatternsYet()
  }
}

const noSavedPatternsYet = () => {
  store.errorMessageColor()
  $('#messageModal').modal('show')
  $('#modalTitleMessage').text('No saved patterns yet!')
  ui.successfulPatternCrud()
}

module.exports = {
  animatePatterns,
  noSavedPatternsYet
}
