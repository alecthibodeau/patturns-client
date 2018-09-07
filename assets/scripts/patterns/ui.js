'use strict'

const store = require('../store')

// This line connects my JS to my handlebars
const showPatternsTemplate = require('../templates/pattern-listing.handlebars')

/************************************
UI FOR SUCCESS/FAILURE OF CRUD ACTIONS
************************************/

const successfulPatternCrud = () => {
  store.successMessageColor()
  setTimeout(function () {
    store.defaultMessageColor()
    // RESETTING 'MESSAGE' MODAL…
    $('#messageModal').modal('hide')
    $('#modalTitleMessage').text('')
    // RESETTING 'GET PATTERNS' MODAL…
    $('#modalTitleGetPatterns').text('Saved patterns')
  }, store.successTimeout)
}

const failure = function (error) {
  $('#messageModal').modal('show')
  $('#modalTitleMessage').text('Error. Try again')
  store.errorMessageColor()
  setTimeout(function () {
    $('#messageModal').modal('hide')
    $('#modalTitleMessage').text('')
    store.defaultMessageColor()
  }, store.failureTimeout)
  console.log('Error is :', error)
}

/************************************
UI FOR CRUD ACTIONS
************************************/

// CREATE
const newPatternSuccess = (data) => {
  $('#messageModal').modal('show')
  $('#modalTitleMessage').text('New pattern saved')
  successfulPatternCrud()
}

// READ – The showPatternsHtml function is what gets the data from the Handlebars file: templates/pattern-listing.handlebars
const getPatternsSuccess = (data) => {
  // console.log('Here is data.patterns:')
  // console.log(data.patterns)
  // debugger
  // THIS IS THE 'FOR LOOP VERSION: Creating a new key with 2-digit date information…
  // for (let i = 0; i < data.patterns.length; i++) {
  //   data.patterns[i]['numeralDate'] = new Date(data.patterns[i].updatedAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })
  // }
  // THIS IS THE '.forEach' VERSION: Creating a new key with 2-digit date information…
  data.patterns.forEach(function (element) {
    element['twoDigitDate'] = new Date(element.updatedAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })
  })
  const showPatternsHtml = showPatternsTemplate({ patterns: data.patterns })
  $('.info-section').show()
  $('.pattern-return-content').html(showPatternsHtml)

  // This is the 'for loop' that builds the mini-grid and appends it in each table row…
  for (let i = 0; i < data.patterns.length; i++) {
    // Create td…
    const miniGridTd = document.createElement('td')
    miniGridTd.setAttribute('class', 'mini-grid-td')
    miniGridTd.setAttribute('id', `mini-grid-td-${i}`)
    $(`#pattern-index-${i}`).prepend($(miniGridTd))
    // Create div within td…
    const miniGrid = document.createElement('div')
    miniGrid.setAttribute('class', 'mini-grid')
    miniGrid.setAttribute('id', `mini-grid-${i}`)
    $(`#mini-grid-td-${i}`).append($(miniGrid))
    // Create cells within dev…
    for (let x = 0; x < 100; x++) {
      const elementMiniCell = document.createElement('div')
      elementMiniCell.setAttribute('class', 'mini-grid-cell')
      elementMiniCell.setAttribute('data-id', x)
      elementMiniCell.setAttribute('id', 'mini-cell-' + x)
      $(document).ready(function () {
        $(`#mini-grid-${i}`).append(elementMiniCell)
      })
    }
  //   // Get grid info as string…
  //   store.pattern = {
  //     grid: $(event.target).closest('tr').attr('data-grid')
  //   }
  //   // Convert grid info to array…
  //   const savedMiniGridAsArray = store.pattern.grid.split(',')
  //   store.miniGrid = savedMiniGridAsArray
  //   for (let i = 0; i < 100; i++) { // Adds color class of each grid-cell from corresponding cell in saved grid array.
  //     $(`#mini-cell-${i}`).addClass(`${savedMiniGridAsArray[i]}`)
  //   }
  }
}

// Unused function to clear table info…
// const clearPatterns = () => {
//   $('.pattern-return-content').empty()
//   $('.info-section').hide()
// }

// UPDATE
const updatePatternSuccess = (data) => {
  $('#messageModal').modal('show')
  $('#modalTitleMessage').text('Pattern updated')
  successfulPatternCrud()
}

// DELETE
const deletePatternSuccess = (data) => {
  store.successMessageColor()
  $('#modalTitleGetPatterns').text('Pattern deleted')
  successfulPatternCrud()
}

module.exports = {
  newPatternSuccess,
  updatePatternSuccess,
  deletePatternSuccess,
  getPatternsSuccess,
  failure
}
