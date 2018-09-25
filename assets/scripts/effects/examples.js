'use strict'

const store = require('../store')

const examplesPatterns = function () {
  // These variables need to be inside the function to be recognized…
  const exampleOne = Array(100).fill('red')
  const exampleTwo = Array(100).fill('orange')
  const exampleThree = Array(100).fill('yellow')
  const exampleFour = Array(100).fill('green')
  // const exampleFive = Array(100).fill('blue')
  const exampleFive = ['blue', 'blue', 'blue', 'blue', 'white', 'white', 'blue', 'blue', 'white', 'blue', 'brown', 'brown', 'brown', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'white', 'brown', 'brown', 'brown', 'brown', 'blue', 'white', 'blue', 'green', 'blue', 'blue', 'brown', 'yellow', 'yellow', 'yellow', 'blue', 'blue', 'green', 'green', 'green', 'blue', 'brown', 'yellow', 'blue', 'yellow', 'blue', 'blue', 'green', 'brown', 'green', 'blue', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'orange', 'orange', 'brown', 'orange', 'orange', 'yellow', 'yellow', 'yellow', 'yellow', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'yellow', 'yellow', 'red', 'red', 'orange', 'orange', 'orange', 'yellow', 'yellow', 'brown', 'green', 'yellow', 'yellow', 'yellow', 'orange', 'orange', 'green', 'yellow', 'brown', 'black', 'green', 'green', 'green', 'green', 'orange', 'green', 'green', 'brown', 'black', 'black']
  const examplesArray = [exampleOne, exampleTwo, exampleThree, exampleFour, exampleFive]

  // 'for loop' running once…
  for (let i = 1; i < 5; i++) {
    const k = i
    store.mainGrid = examplesArray[0]
    store.fillMainGrid()
    setTimeout(function () {
      store.mainGrid = examplesArray[i]
      store.fillMainGrid()
    }, 1000 * k)
  }
}

module.exports = {
  examplesPatterns
}
