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

const failure = (error) => {
  console.error(error)
}

/************************************
UI FOR CRUD ACTIONS
************************************/

// CREATE
const newPatternSuccess = (data) => {
  $('#messageModal').modal('show')
  $('#modalTitleMessage').text('New pattern created')
  successfulPatternCrud()
}

// READ – The showPatternsHtml function is what gets the data from the Handlebars file: templates/pattern-listing.handlebars
const getPatternsSuccess = (data) => {
  // go through each pattern in data and add a new
  // key called `niceDate` which has the value Date(date).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })
  const showPatternsHtml = showPatternsTemplate({ patterns: data.patterns })
  $('.info-section').show()
  $('.pattern-return-content').html(showPatternsHtml)
}

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
  // clearPatterns,
  failure
}
