'use strict'

const store = require('../store')

const randomPattern = function () {
  // console.log(store.mainGrid)
  let randomColor = 'white'
  for (let i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * 8)
    if (x === 0) {
      randomColor = 'white'
    } else if (x === 1) {
      randomColor = 'blue'
    } else if (x === 2) {
      randomColor = 'green'
    } else if (x === 3) {
      randomColor = 'yellow'
    } else if (x === 4) {
      randomColor = 'orange'
    } else if (x === 5) {
      randomColor = 'red'
    } else if (x === 6) {
      randomColor = 'brown'
    } else if (x === 7) {
      randomColor = 'black'
    }
    // console.log(randomColor)
    store.mainGrid[i] = randomColor
  }
  // console.log(store.mainGrid)
  store.fillMainGrid()
}

module.exports = {
  randomPattern
}
