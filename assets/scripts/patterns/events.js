'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

let currentColor = 'black'
let gridIndex = null

/************************************
CRUD ACTIONS — CREATE
************************************/
// On clicking 'SAVE' button…
const onNewPattern = (event) => {
  // console.log('Create runs.')
  event.preventDefault()
  const data = getFormFields(event.target)
  data.pattern.grid = store.mainGrid.slice()
  // console.log(data)
  api.newPattern(data)
    .then(ui.newPatternSuccess(data))
    // .then(getPatterns)
    .catch(ui.failure)
}

/************************************
CRUD ACTIONS — READ: INDEX
************************************/
const getPatterns = () => {
  api.getPatterns()
    .then(ui.getPatternsSuccess)
    .catch(ui.failure)
}

const onGetPatterns = (event) => {
  event.preventDefault()
  getPatterns()
}

/************************************
CRUD ACTIONS — READ: SHOW
************************************/
// capturePattern captures table row data from the savedPatternsModal modal when that row's 'MODIFY' button is clicked…
// The 'closest' method here looks for the closest tr and targets its data-id…
const capturePattern = (event) => {
  store.pattern = {
    pattern_id: $(event.target).closest('tr').attr('data-id'),
    thumbnail: $(event.target).closest('tr').attr('data-thumbnail'),
    date: $(event.target).closest('tr').attr('data-date'),
    grid: $(event.target).closest('tr').attr('data-grid'),
    info: $(event.target).closest('tr').attr('data-info')
  }
  fillFieldWithSavedInfo()
  fillGridWithSavedPattern()
}

// fillFieldWithSavedInfo fills the form field with the closest info on 'MODIFY' button click …
const fillFieldWithSavedInfo = () => {
  // console.log('fillFieldWithSavedInfo runs.')
  $('#new-pattern-panel').hide()
  $('#update-pattern-panel').show()
  $('.pattern-field-input-info').val(store.pattern.info)
  $('#savedPatternsModal').modal('hide')
}

// fillGridWithSavedPattern fills the form field with the closest info on 'MODIFY' button click.
// The for loop in fillGridWithSavedPattern has two major steps:
//   Step 1. Modifies the 'store.mainGrid' array to have the same index values as the saved array.
//   Step 2. Modifies cell colors.
const fillGridWithSavedPattern = () => {
  // console.log('fillGridWithSavedPattern runs.')
  const savedGridAsArray = store.pattern.grid.split(',') // Makes a new array from the string 'store.pattern.grid'
  $('.grid-cell').attr('class', 'grid-cell')
  // console.log('Saved grid as returned string:', store.pattern.grid)
  // console.log('Saved grid as array:', savedGridAsArray)
  // console.log('Main grid as array:', store.mainGrid)
  for (let i = 0; i < savedGridAsArray.length; i++) {
    store.mainGrid[i] = savedGridAsArray[i]
    $(`#cell-${i}`).addClass(`${savedGridAsArray[i]}`)
  }
  // console.log('Central grid is: ' + store.mainGrid) // This returns a string in the console.
  // console.log('Saved grid is: ' + savedGridAsArray) // This returns a string in the console.
}

/************************************
CRUD ACTIONS — UPDATE
************************************/
// On clicking 'UPDATE' button…
const onUpdatePattern = (event) => {
  // console.log('Update runs.')
  event.preventDefault()
  const data = getFormFields(event.target)
  data.pattern.grid = store.mainGrid.slice()
  // console.log(data)
  api.updatePattern(data, store.pattern.pattern_id)
    .then(ui.updatePatternSuccess)
    .then(getPatterns)
    .catch(ui.failure)
}

/************************************
CRUD ACTIONS — DELETE
************************************/
// The 'closest' method here looks for the closest tr and targets its data-id…
const onDeletePattern = (event) => {
  event.preventDefault()
  const patternId = $(event.target).closest('tr').attr('data-id')
  // console.log(`patternId = ${patternId}`)
  api.deletePattern(patternId)
    .then(() => onGetPatterns(event))
    .then(ui.deletePatternSuccess)
    .catch(ui.failure)
}

/************************************
FUNCTION FOR CREATING THE GRID
************************************/
// createGrid fills the 'grid-container' empty div with 100 cells.
// 'store.clearGrid' sets the empty array 'store.mainGrid' to 100 values of "white".
const createGrid = () => {
  for (let i = 0; i < 100; i++) {
    const elementCell = document.createElement('div')
    elementCell.setAttribute('class', 'grid-cell')
    elementCell.setAttribute('data-id', i)
    elementCell.setAttribute('id', 'cell-' + i)
    document.getElementById('grid-container').appendChild(elementCell)
  }
  store.clearGrid()
  $('.grid-cell').on('click', onClickCell)
  // console.log(store.mainGrid)
}

/************************************
FUNCTIONS FOR COLORING GRID CELLS
************************************/
// This function selects currentColor…
const pickColor = function (event) {
  event.preventDefault()
  $('.color-box').removeClass('selected-color')
  $(this).addClass('selected-color')
  currentColor = this.getAttribute('id')
  // console.log(currentColor)
}

// onClickCell has two major steps:
// Step 1. Modifies the 'store.mainGrid' array with the currentColor.
// Step 2. Modifies the cell color.
const onClickCell = function (event) {
  event.preventDefault()
  gridIndex = this.getAttribute('data-id') // Step 1a: 'data-id' is the index number of the cell
  store.mainGrid[gridIndex] = currentColor // Step 1b: Modifies the index in 'store.mainGrid' array with the currentColor.
  $(this).attr('class', 'grid-cell') // Step 2a: Removes all color classes except the '.grid-cell' default.
  $(this).addClass(`${currentColor}`) // Step 2b: Adds a color class (as defined by currentColor) which changes the cell color.
}

/************************************
HANDLERS
************************************/

const addPatternHandlers = () => {
  /************************************
  HANDLERS — PAGE LOAD
  ************************************/
  $('.info-section').hide()
  $('.nav-bar-signed-in').hide()
  $('#update-pattern-panel').hide()
  $('#black').addClass('selected-color') // <= This sets the default color to black.

  // The 'color-box' class is for the color menu squares.
  // pickColor sets the color for cell clicks…
  $('.color-box').on('click', pickColor)

  // Clears the grid by running clearGrid function on 'CLEAR GRID' button click…
  $('#clear-grid-button').on('click', store.clearGrid)

  // capturePattern captures table row data from the savedPatternsModal modal when that row's 'MODIFY' button is clicked…
  $('.pattern-return-content').on('click', '#modify-pattern-button', capturePattern)

  /************************************
  HANDLERS — CRUD
  ************************************/
  // The 'new-pattern' ID is for the form to make a new pattern.
  // onNewPerson is the function that runs on 'SAVE' button click…
  $('#new-pattern-panel').on('submit', onNewPattern)

  // Gets the API's DB through Handlebars and other functions.
  // onGetPatterns is the initial function that runs on 'GET PATTERNS' button click
  $('#get-patterns-button').on('click', onGetPatterns)

  // onUpdatePattern is the function that runs on 'UPDATE' button click…
  $('#update-pattern-panel').on('submit', onUpdatePattern)

  // This runs onDeletePattern when a Saved Patterns delete button is clicked…
  $('.pattern-return-content').on('click', '#delete-button', onDeletePattern)
}

/************************************
EXPORTS
************************************/

module.exports = {
  createGrid,
  addPatternHandlers
}
