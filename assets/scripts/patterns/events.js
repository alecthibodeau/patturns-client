'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

let gridIndex = null

/************************************
CRUD ACTIONS — CREATE
************************************/
// On clicking 'SAVE' button…
const onNewPattern = (event) => {
  event.preventDefault()
  store.mouseDown = false
  const data = getFormFields(event.target)
  data.pattern.grid = store.mainGrid.slice()
  // console.log(data)
  api.newPattern(data)
    .then(ui.newPatternSuccess(data))
    // .then(getPatterns)
    .catch(ui.failure)
  // console.log('Create runs.')
}

/************************************
CRUD ACTIONS — READ: INDEX
************************************/
// This is borrowed code from the RadTabs project.
// .then(getTabs) is called twice — for CREATE and UPDATE:
// 1. Within the onNewTab function after api.newTab(data)
// 2. Within the onUpdateTab function after api.updateTab(data, store.tab.tab_id)
// NOTE: getPatterns is never called directly in this project (except from onGetPatterns), but may be useful later.
const getPatterns = () => {
  api.getPatterns()
    .then(ui.getPatternsSuccess)
    .catch(ui.failure)
}

// This is borrowed code from the RadTabs project.
// onGetTabs is called to refresh/show the returned API data upon two events — for READ (index) and DELETE:
//  1. Toggling the 'VIEW TABS' button in the nav bar (when the API data wasn't visible).
//  2. Deleting a tab via the 'modify' modal's 'DELETE TAB' button.
const onGetPatterns = (event) => {
  event.preventDefault()
  store.mouseDown = false
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
  $('#savedPatternsModal').modal('hide')
  $('.info-section').hide()
  fillFieldWithSavedInfo()
  fillGridWithSavedPattern()
}

// fillFieldWithSavedInfo fills the form input field with the closest info on 'MODIFY' button click …
const fillFieldWithSavedInfo = () => {
  $('.pattern-field-input-info').val(store.pattern.info)
  $('#new-pattern-panel').hide()
  $('#update-pattern-panel').show()
  // console.log('fillFieldWithSavedInfo runs.')
}

// fillGridWithSavedPattern fills the form field with the closest info on 'MODIFY' button click.
// The for loop in fillGridWithSavedPattern has two major steps:
//   Step 1. Modifies the 'store.mainGrid' array to have the same index values as the saved array.
//   Step 2. Modifies cell colors.
const fillGridWithSavedPattern = () => {
  const savedGridAsArray = store.pattern.grid.split(',') // Step 1a: Makes a new array from the string 'store.pattern.grid'
  store.mainGrid = savedGridAsArray // Step 1b: Sets the values of main grid array to match saved grid array.
  $('.grid-cell').attr('class', 'grid-cell') // Step 2a: Removes color classes from all cells.
  for (let i = 0; i < 100; i++) { // Step 2b: Adds color class of each grid-cell from corresponding cell in saved grid array.
    $(`#cell-${i}`).addClass(`${savedGridAsArray[i]}`)
  }
  // console.log('Saved grid as returned string:', store.pattern.grid)
  // console.log('Saved grid as array:', savedGridAsArray)
  // console.log('Main grid as array:', store.mainGrid)
  // console.log('fillGridWithSavedPattern runs.')
}

/************************************
CRUD ACTIONS — UPDATE
************************************/
// On clicking 'UPDATE' button…
const onUpdatePattern = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.pattern.grid = store.mainGrid.slice()
  // console.log(data)
  api.updatePattern(data, store.pattern.pattern_id)
    .then(ui.updatePatternSuccess)
    // .then(getPatterns)
    .catch(ui.failure)
  // console.log('Update runs.')
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

// store.mouseDownState = false
//
// const setMouseStateTrue = function (event) {
//   store.mouseDownState = true
//   onClickCell(event)
// }
//
// const setMouseStateFalse = function () {
//   store.mouseDownState = false
//   $('.grid-cell').off(onClickCell)
// }

/************************************
FUNCTION FOR CREATING THE GRID
************************************/

// $('.grid-container').mouseup(function () {
//   $('grid-cell').off()
// }).mousedown(function () {
//   $('.grid-cell').mouseenter(function () {
//     $(this).on('mousemove', onClickCell)
//   })
// })

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
  $('.grid-cell').on('mouseup', function () { $('grid-cell').off() })
  $('.grid-cell').on('mousedown', onClickCell)
  $('.grid-cell').mouseenter(function () {
    if (store.mouseDown) {
      $(this).on('mousemove', onClickCell)
      $(this).mouseleave(function () { $('grid-cell').off() })
      $(this).hover(function () { $('grid-cell').off() })
    } else {
      $('grid-cell').off()
    }
  })
}

/************************************
FUNCTIONS FOR COLORING GRID CELLS
************************************/
// This function selects store.currentColor…
const pickColor = function (event) {
  event.preventDefault()
  store.mouseDown = false
  $('.color-box').removeClass('selected-color')
  $(this).addClass('selected-color')
  store.currentColor = this.getAttribute('id')
  // console.log(store.currentColor)
}

// onClickCell has two major steps:
// Step 1. Modifies the 'store.mainGrid' array with the store.currentColor.
// Step 2. Modifies the cell color.
const onClickCell = function (event) {
  event.preventDefault()
  gridIndex = this.getAttribute('data-id') // Step 1a: 'data-id' is the index number of the cell
  store.mainGrid[gridIndex] = store.currentColor // Step 1b: Modifies the index in 'store.mainGrid' array with the store.currentColor.
  $(this).attr('class', 'grid-cell') // Step 2a: Removes all color classes except the '.grid-cell' default.
  $(this).addClass(`${store.currentColor}`) // Step 2b: Adds a color class (as defined by store.currentColor) which changes the cell color.
  // console.log(store.mainGrid)
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

  $(document).mousedown(function () {
    store.mouseDown = true// ; console.log(store.mouseDown)
  }).mouseup(function () {
    store.mouseDown = false// ; console.log(store.mouseDown)
  })

  /************************************
  HANDLERS — PICK COLOR & CLEAR GRID
  ************************************/

  // The 'color-box' class is for the color menu squares.
  // pickColor sets the color for cell clicks…
  $('.color-box').on('click', pickColor)

  // Clears the grid by running clearGrid function on 'CLEAR GRID' button click…
  $('#clear-grid-button').on('click', store.clearGrid)

  /************************************
  HANDLERS — CRUD
  ************************************/
  // The 'new-pattern' ID is for the form to make a new pattern.
  // onNewPerson is the function that runs on 'SAVE' button click…
  $('#new-pattern-panel').on('submit', onNewPattern)

  // Gets the API's DB through Handlebars and other functions.
  // onGetPatterns is the initial function that runs on 'GET PATTERNS' button click
  $('#get-patterns-button').on('click', onGetPatterns)

  // capturePattern captures table row data from the savedPatternsModal modal when that row's 'MODIFY' button is clicked…
  $('.pattern-return-content').on('click', '#modify-pattern-button', capturePattern)

  // onUpdatePattern is the function that runs on 'UPDATE' button click…
  $('#update-pattern-panel').on('submit', onUpdatePattern)

  // This runs onDeletePattern when a Saved Patterns delete button is clicked…
  $('.pattern-return-content').on('click', '#delete-pattern-button', onDeletePattern)
}

/************************************
EXPORTS
************************************/

module.exports = {
  createGrid,
  addPatternHandlers
}
