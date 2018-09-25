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
  store.data = data
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
    // Get array for i's mini-grid…
    store.savedMiniGridAsArray = data.patterns[i].grid
    // Create td and insert it into Handlebars row…
    const miniGridTd = document.createElement('td')
    miniGridTd.setAttribute('class', 'mini-grid-td')
    miniGridTd.setAttribute('id', `mini-grid-td-${i}`)
    $(`#pattern-index-${i}`).prepend($(miniGridTd))
    // Create div and insert it into td…
    const miniGrid = document.createElement('div')
    miniGrid.setAttribute('class', 'mini-grid-container')
    miniGrid.setAttribute('id', `mini-grid-container-${i}`)
    $(`#mini-grid-td-${i}`).append($(miniGrid))
    // Create cells within miniGrid and color them from the array…
    for (let x = 0; x < 100; x++) {
      const elementMiniCell = document.createElement('div')
      elementMiniCell.setAttribute('class', store.savedMiniGridAsArray[x])
      $(elementMiniCell).addClass('mini-grid-cell')
      elementMiniCell.setAttribute('data-id', x)
      elementMiniCell.setAttribute('id', 'mini-grid-cell-' + x)
      $(document).ready(function () {
        $(`#mini-grid-container-${i}`).append(elementMiniCell)
      })
    }
  }
  $('#modalTitleGetPatterns').text('Saved patterns')
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
