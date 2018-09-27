'use strict'

const store = require('../store')

const examplesPatterns = function () {
  // These variables need to be inside the function to be recognized…
  const exampleOne = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'blue', 'blue', 'yellow', 'orange', 'orange', 'green', 'green', 'orange', 'orange', 'yellow', 'blue', 'blue', 'yellow', 'orange', 'red', 'red', 'red', 'red', 'orange', 'yellow', 'blue', 'blue', 'yellow', 'green', 'red', 'white', 'white', 'red', 'green', 'yellow', 'blue', 'blue', 'yellow', 'green', 'red', 'white', 'white', 'red', 'green', 'yellow', 'blue', 'blue', 'yellow', 'orange', 'red', 'red', 'red', 'red', 'orange', 'yellow', 'blue', 'blue', 'yellow', 'orange', 'orange', 'green', 'green', 'orange', 'orange', 'yellow', 'blue', 'blue', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue']
  const exampleTwo = ['red', 'white', 'white', 'blue', 'orange', 'orange', 'blue', 'white', 'white', 'red', 'white', 'red', 'white', 'blue', 'orange', 'orange', 'blue', 'white', 'red', 'white', 'white', 'white', 'red', 'white', 'white', 'white', 'white', 'red', 'white', 'white', 'blue', 'blue', 'white', 'red', 'white', 'white', 'red', 'white', 'blue', 'blue', 'orange', 'orange', 'white', 'white', 'green', 'green', 'white', 'white', 'orange', 'orange', 'orange', 'orange', 'white', 'white', 'green', 'green', 'white', 'white', 'orange', 'orange', 'blue', 'blue', 'white', 'red', 'white', 'white', 'red', 'white', 'blue', 'blue', 'white', 'white', 'red', 'white', 'white', 'white', 'white', 'red', 'white', 'white', 'white', 'red', 'white', 'blue', 'orange', 'orange', 'blue', 'white', 'red', 'white', 'red', 'white', 'white', 'blue', 'orange', 'orange', 'blue', 'white', 'white', 'red']
  const exampleThree = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red']
  const exampleFour = ['green', 'green', 'green', 'blue', 'blue', 'blue', 'blue', 'green', 'green', 'green', 'green', 'orange', 'orange', 'red', 'red', 'red', 'red', 'orange', 'orange', 'green', 'green', 'orange', 'orange', 'blue', 'yellow', 'yellow', 'blue', 'orange', 'orange', 'green', 'blue', 'red', 'blue', 'blue', 'yellow', 'yellow', 'blue', 'blue', 'red', 'blue', 'blue', 'red', 'yellow', 'yellow', 'green', 'green', 'yellow', 'yellow', 'red', 'blue', 'blue', 'red', 'yellow', 'yellow', 'green', 'green', 'yellow', 'yellow', 'red', 'blue', 'blue', 'red', 'blue', 'blue', 'yellow', 'yellow', 'blue', 'blue', 'red', 'blue', 'green', 'orange', 'orange', 'blue', 'yellow', 'yellow', 'blue', 'orange', 'orange', 'green', 'green', 'orange', 'orange', 'red', 'red', 'red', 'red', 'orange', 'orange', 'green', 'green', 'green', 'green', 'blue', 'blue', 'blue', 'blue', 'green', 'green', 'green']
  const exampleFive = ['red', 'orange', 'red', 'orange', 'red', 'orange', 'red', 'orange', 'red', 'orange', 'orange', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'red', 'red', 'blue', 'green', 'green', 'green', 'green', 'green', 'green', 'blue', 'orange', 'orange', 'blue', 'green', 'red', 'yellow', 'yellow', 'red', 'green', 'blue', 'red', 'red', 'blue', 'green', 'yellow', 'green', 'green', 'yellow', 'green', 'blue', 'orange', 'orange', 'blue', 'green', 'yellow', 'green', 'green', 'yellow', 'green', 'blue', 'red', 'red', 'blue', 'green', 'red', 'yellow', 'yellow', 'red', 'green', 'blue', 'orange', 'orange', 'blue', 'green', 'green', 'green', 'green', 'green', 'green', 'blue', 'red', 'red', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'orange', 'orange', 'red', 'orange', 'red', 'orange', 'red', 'orange', 'red', 'orange', 'red']
  const examplesArray = [exampleOne, exampleTwo, exampleThree, exampleFour, exampleFive]

  // 'for loop' running once…
  for (let i = 1; i < 5; i++) {
    const k = i
    store.mainGrid = examplesArray[0]
    store.fillMainGrid()
    setTimeout(function () {
      store.mainGrid = examplesArray[i]
      store.fillMainGrid()
    }, 2000 * k)
  }
}

module.exports = {
  examplesPatterns
}
