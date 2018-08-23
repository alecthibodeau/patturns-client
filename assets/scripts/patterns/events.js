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

// Capture table row data from Saved Patterns modal…
const capturePattern = (event) => {
  console.log('capturePattern runs.')
  store.pattern = {
    pattern_id: $(event.target).closest('tr').attr('data-id'),
    thumbnail: $(event.target).closest('tr').attr('data-thumbnail'),
    date: $(event.target).closest('tr').attr('data-date'),
    info: $(event.target).closest('tr').attr('data-info')
  }
  fillField()
}

const fillField = () => {
  console.log('fillField runs.')
  // Reset form field on selection of Update Pattern modal…
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

// const onDeletePattern = (event) => {
//   event.preventDefault()
//   api.deletePattern(store.pattern.pattern_id)
//     .then(ui.deletePatternSuccess)
//     .then(() => onGetPatterns(event))
//     .catch(ui.failure)
// }

const onDeletePattern = (event) => {
  event.preventDefault()
  // closest is a handlebar method that will look for the closest tr and target the data-id
  const patternId = $(event.target).closest('tr').attr('data-id')
  api.deletePattern(patternId)
    .then(() => onGetPatterns(event))
    .catch(ui.failure)
}

// This function selects currentColor: It's set to 'black' on page load.
const pickColor = function (event) {
  event.preventDefault()
  $('.color-box').removeClass('selected-color')
  $(this).addClass('selected-color')
  currentColor = this.getAttribute('id')
  console.log(currentColor)
}

const addPatternHandlers = () => {
  $('.info-section').hide()
  $('.nav-bar-signed-in').hide()
  $('#clear-grid-button').on('click', clearGrid)
  $('#new-pattern').on('submit', onNewPattern)
  // $('#update-pattern').on('submit', onUpdatePattern)
  // $('#delete-pattern-button').on('submit', onDeletePattern)
  $('.color-box').on('click', pickColor)
  $('#black').addClass('selected-color')
  $('#get-patterns-button').on('click', onGetPatterns)
  $('#update-pattern-button').hide()
  // $('#modify-pattern-button').on('click', onUpdatePattern)

  // This runs capturePattern when a Saved Patterns modify button is clicked
  $('.pattern-return-content').on('click', '#modify-pattern-button', capturePattern)

  $('.pattern-return-content').on('click', '#delete-button', onDeletePattern)

  // $('#modify-pattern-button').on('click', capturePattern).on('mouseover', '.info-td', (event) => {
  //   $(this).css('cursor', 'pointer')
  // })
}

const clearGrid = function () {
  $('.grid-cell').removeClass('black').removeClass('red').removeClass('blue')
  $('#modal-field-info').val('')
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
