'use strict'

const store = require('../store')

const examplesPatterns = function (fillMainGrid) {
  // These variables need to be inside the function to be recognized…
  const exampleOne = Array(100).fill('red')
  const exampleTwo = Array(100).fill('orange')
  const exampleThree = Array(100).fill('yellow')
  const exampleFour = Array(100).fill('green')
  const exampleFive = Array(100).fill('blue')
  const examplesArray = [exampleOne, exampleTwo, exampleThree, exampleFour, exampleFive]

  // store.mainGrid = examplesArray[0]
  // fillMainGrid()

  // setInterval seemingly running randomly…
  for (let i = 0; i < 5; i++) {
    const k = i
    setTimeout(function () {
      store.mainGrid = examplesArray[i]
      fillMainGrid()
      console.log('count ', k)
      console.log(1000 * (k + 1))
    }, 1000 * (k + 1))
    // if (i === 4) {
    //   i = 0
    // }
  }

  // for (let i = 0; i < 5; i++) {
  //   const k = i
  //   setTimeout(function () {
  //     store.mainGrid = examplesArray[i]
  //     fillMainGrid()
  //     console.log('count ', k)
  //     console.log(1000 * (k + 1))
  //   }, 1000 * (k + 1))
  // }

  // Working loop…
  // for (let i = 0; i < 5; i++) {
  //   const k = i
  //   setTimeout(function () {
  //     console.log('count ', k)
  //   }, 500 * (k + 1))
  // }
}

// Code with clearGrid that works…
// const examplesPatterns = function () {
//   setTimeout(function () {
//     store.clearGrid()
//   }, 200)
// }

// Code to prove that setTimeout set this to the global object…
// const examplesPatterns = function () {
//   (function () {
//     alert(this) // alerts hello
//     setTimeout(function () {
//       alert(this === window) // true
//     }, 1000)
//   }).call('hello')
// }

module.exports = {
  examplesPatterns
}
