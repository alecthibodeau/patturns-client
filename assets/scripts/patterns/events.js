'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

let currentColor = 'black'
let grid = []
let gridIndex = null

const getPatterns = () => {
  api.getPatterns()
    .then(ui.getPatternsSuccess)
    .catch(ui.failure)
}

const onGetPatterns = (event) => {
  event.preventDefault()
  getPatterns()
}

// const onClearPatterns = (event) => {
//   event.preventDefault()
//   ui.clearPatterns()
// }

const onNewPattern = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.pattern.grid = grid.slice()
  console.log(data)
  api.newPattern(data)
    .then(ui.newPatternSuccess(data))
    // .then(getPatterns)
    .catch(ui.failure)
}

// capturePattern captures table row data from the Saved Patterns modal.
// The 'closest' method here looks for the closest tr and targets its data-id…
const capturePattern = (event) => {
  console.log('capturePattern runs.')
  store.pattern = {
    pattern_id: $(event.target).closest('tr').attr('data-id'),
    thumbnail: $(event.target).closest('tr').attr('data-thumbnail'),
    date: $(event.target).closest('tr').attr('data-date'),
    grid: $(event.target).closest('tr').attr('data-grid'),
    info: $(event.target).closest('tr').attr('data-info')
  }
  fillField()
}

// Fill form field with closest info on 'MODIFY' button click …
const fillField = () => {
  console.log('fillField runs.')
  $('#save-pattern-button').hide()
  $('#update-pattern-button').show()
  // $('#get-patterns-button').hide()
  $('#modal-field-info').val(store.pattern.info)
  $('#getPatternsModal').modal('hide')
}

// const onUpdatePattern = (event) => {
//   // On clicking submit button after updating pattern…
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   api.updatePattern(data, store.pattern.pattern_id)
//     .then(ui.updatePatternSuccess)
//     .then(getPatterns)
//     .catch(ui.failure)
// }

// The 'closest' method here looks for the closest tr and targets its data-id…
const onDeletePattern = (event) => {
  event.preventDefault()
  const patternId = $(event.target).closest('tr').attr('data-id')
  console.log(`patternId = ${patternId}`)
  api.deletePattern(patternId)
    .then(() => onGetPatterns(event))
    .catch(ui.failure)
}

// This function selects currentColor…
const pickColor = function (event) {
  event.preventDefault()
  $('.color-box').removeClass('selected-color')
  $(this).addClass('selected-color')
  currentColor = this.getAttribute('id')
  console.log(currentColor)
}

const addPatternHandlers = () => {
  // Handlers the run on Page Load…
  $('.info-section').hide()
  $('.nav-bar-signed-in').hide()
  $('#update-pattern-button').hide()
  $('#black').addClass('selected-color') // <= This sets the default color to black.

  // The 'color-box' class is for the color menu squares.
  // pickColor sets the color for cell clicks…
  $('.color-box').on('click', pickColor)

  // Clears the grid by running clearGrid function on 'CLEAR GRID' button click…
  $('#clear-grid-button').on('click', clearGrid)

  // The 'new-pattern' ID is for the form to make a new pattern.
  // onNewPerson is the function that runs on 'SAVE' button click…
  $('#new-pattern').on('submit', onNewPattern)

  // Gets the API's DB through Handlebars and other functions.
  // onGetPatterns is the initial function that runs on 'GET PATTERNS' button click
  $('#get-patterns-button').on('click', onGetPatterns)

  // This runs capturePattern when a Saved Patterns modify button is clicked…
  $('.pattern-return-content').on('click', '#modify-pattern-button', capturePattern)

  // This runs onDeletePattern when a Saved Patterns delete button is clicked…
  $('.pattern-return-content').on('click', '#delete-button', onDeletePattern)

  // $('#update-pattern').on('submit', onUpdatePattern)
  // $('#delete-pattern-button').on('submit', onDeletePattern)
  // $('#modify-pattern-button').on('click', onUpdatePattern)
}

const clearGrid = function () {
  $('.grid-cell').removeClass('black').removeClass('red').removeClass('blue')
  $('#modal-field-info').val('')
  $('#update-pattern-button').hide()
  $('#save-pattern-button').show()
  grid = [
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'
  ]
  console.log(grid)
  return grid
}

const onClickCell = function (event) {
  event.preventDefault()
  gridIndex = this.getAttribute('data-id')
  grid[gridIndex] = currentColor
  $(this).attr('class', 'grid-cell')
  $(this).addClass(`${currentColor}`)
  console.log(grid)
}

const createGrid = (grid) => {
  for (let i = 0; i < 100; i++) {
    const elementCell = document.createElement('div')
    elementCell.setAttribute('class', 'grid-cell')
    elementCell.setAttribute('data-id', i)
    elementCell.setAttribute('id', 'cell-' + i)
    document.getElementById('grid-container').appendChild(elementCell)
  }
  clearGrid(grid)
  console.log('Grid created.')
  // $('.board-cell').addClass('played').addClass('game-over') // PUT PREGAME BACK HERE
  // console.log('Board created.')
  // if (preGame === true) {
  //   animateGameBoard(preGame)
  // }
  $('.grid-cell').on('click', onClickCell)
}

module.exports = {
  createGrid,
  addPatternHandlers
}
