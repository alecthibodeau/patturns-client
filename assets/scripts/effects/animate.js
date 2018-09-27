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
  // console.log('Data is: ' + data)
  for (let i = 0; i < data.patterns.length; i++) {
    const k = i
    // animationCycle = setTimeout(function () {
    setTimeout(function () {
      store.mainGrid = data.patterns[i].grid
      store.fillMainGrid()
    }, 100 * k)
    // clearTimeout(animationCycle)
  }
}

module.exports = {
  animatePatterns
}
