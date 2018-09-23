'use strict'

const store = require('../store')

const exampleOne = Array(100).fill('red')
const exampleTwo = Array(100).fill('green')
const exampleThree = Array(100).fill('blue')

const examplesPatterns = function (fillMainGrid) {
  store.mainGrid = exampleOne
  console.log(store.mainGrid)
  fillMainGrid()

  // setTimeout(function () {
  //   store.mainGrid = exampleOne
  //   console.log(store.mainGrid)
  //   fillMainGrid()
  // }, store.successTimeout)
}

module.exports = {
  examplesPatterns
}
