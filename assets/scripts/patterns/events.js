'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

let currentColor = 'black'

const getPatterns = () => {
  api.getPatterns()
    .then(ui.getPatternsSuccess)
    .catch(ui.failure)
}

const onGetPatterns = (event) => {
  event.preventDefault()
  getPatterns()
}

const onClearPatterns = (event) => {
  event.preventDefault()
  ui.clearPatterns()
}

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

const savePattern = (event) => {
  // Retrieve table row data on launch of Update Pattern modal…
  store.pattern = {
    pattern_id: $(event.target).closest('tr').attr('data-id'),
    date: $(event.target).closest('tr').attr('data-date'),
    project_name: $(event.target).closest('tr').attr('data-project_name'),
    task: $(event.target).closest('tr').attr('data-task'),
    time_spent: $(event.target).closest('tr').attr('data-time_spent'),
    notes: $(event.target).closest('tr').attr('data-notes')
  }
  fillField()
}

const fillField = () => {
  // Reset form fields on launch of Update Pattern modal…
  $('#update-pattern').show()
  $('#modal-field-date').val(store.pattern.date)
  $('#modal-field-project-name').val(store.pattern.project_name)
  $('#modal-field-task').val(store.pattern.task)
  $('#modal-field-time-spent').val(store.pattern.time_spent)
  $('#modal-field-notes').val(store.pattern.notes)
}

const onUpdatePattern = (event) => {
  // On clicking submit button after updating pattern…
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updatePattern(data, store.pattern.pattern_id)
    .then(ui.updatePatternSuccess)
    .then(getPatterns)
    .catch(ui.failure)
}

const onDeletePattern = (event) => {
  event.preventDefault()
  api.deletePattern(store.pattern.pattern_id)
    .then(ui.deletePatternSuccess)
    .then(() => onGetPatterns(event))
    .catch(ui.failure)
}

// This function selects currentColor: 'black' on page load.
const pickColor = function (event) {
  event.preventDefault()
  $('.color-box').removeClass('selected-color')
  $(this).addClass('selected-color')
  currentColor = this.getAttribute('id')
  console.log(currentColor)
}

const addPatternHandlers = () => {
  // $('.pattern-return-content').on('click', savePattern).on('mouseover', '.info-td', (event) => {
  //   $(this).css('cursor', 'pointer')
  // })
  // $('#showHidePatternsButton').click((event) => {
  //   store.showHideCounter % 2 === 0 ? onGetPatterns(event) : onClearPatterns(event)
  //   store.showHideCounter++
  // })
  $('.info-section').hide()
  $('.nav-bar-signed-in').hide()
  $('#new-pattern').on('submit', onNewPattern)
  $('#update-pattern').on('submit', onUpdatePattern)
  $('#delete-pattern').on('submit', onDeletePattern)
  $('.color-box').on('click', pickColor)
}

let grid = [
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

let gridIndex = null

const onClickCell = function (event) {
  event.preventDefault()
  gridIndex = this.getAttribute('data-id')
  grid[gridIndex] = currentColor
  $(this).attr('class', 'grid-cell')
  $(this).addClass(`${currentColor}`)
  console.log(grid)

  // turnCounter % 2 === 0 ? playerPiece = 'x' : playerPiece = 'o'
  // turnCounter % 2 !== 0 ? $('#game-status').text(`player x's turn`).removeClass('o') : $('#game-status').text(`player o's turn`).addClass('o')
  // cells[cellsIndex] = playerPiece
  // $(this).addClass(`${playerPiece}`).addClass('played').unbind('click', onClickCell)
  // document.querySelector('#' + this.getAttribute('id')).innerHTML = playerPiece
  // console.log(`cell index: ${cellsIndex}`)
  // console.log(`Win value: ${winValue}`)
  // console.log(`Cells array: ${cells}`)
  // console.log(`Game is over? ${over}`)
  // turnCounter++
  // logic.checkForMatch(cells, over, turnCounter, gameData, cellsIndex, playerPiece, onClickCell)
}

const createGrid = () => {
  // console.log('Grid function runs.')
  for (let i = 0; i < 100; i++) {
    const elementCell = document.createElement('div')
    elementCell.setAttribute('class', 'grid-cell')
    elementCell.setAttribute('data-id', i)
    elementCell.setAttribute('id', 'cell-' + i)
    document.getElementById('grid-container').appendChild(elementCell)
    // console.log('Cell added.')
  }
  console.log('Grid created.')
  // $('.board-cell').addClass('played').addClass('game-over') // PUT PREGAME BACK HERE
  // console.log('Board created.')
  // if (preGame === true) {
  //   animateGameBoard(preGame)
  // }
  $('#black').addClass('selected-color')
  $('.grid-cell').on('click', onClickCell)
}

module.exports = {
  createGrid,
  addPatternHandlers
}
