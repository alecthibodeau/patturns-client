'use strict'

const store = require('../store')

// This line connects my JS to my handlebars
const showPatternsTemplate = require('../templates/pattern-listing.handlebars')

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

const newPatternSuccess = (data) => {
  $('#modalTitleNewPattern').text('New pattern created')
  $('#new-pattern').slideToggle(200)
  store.successMessageColor()
  setTimeout(function () {
    $('#newPatternModal').modal('hide')
    $('#modalTitleNewPattern').text('New pattern')
    store.defaultMessageColor()
    $('#new-pattern').show()
  }, store.successTimeout)
}

const successfulModification = () => {
  store.successMessageColor()
  $('#update-pattern').slideToggle(200)
  $('#delete-pattern').slideToggle(200)
  setTimeout(function () {
    // $('#modifyPatternModal').modal('hide')
    $('#modalTitleGetPatterns').text('Saved patterns')
    store.defaultMessageColor()
    $('#modify-pattern').show()
    $('#delete-pattern').show()
  }, store.successTimeout)
}

const updatePatternSuccess = (data) => {
  $('#modalTitleModifyPattern').text('Pattern updated')
  successfulModification()
}

const deletePatternSuccess = (data) => {
  store.successMessageColor()
  $('#modalTitleGetPatterns').text('Pattern deleted')
  successfulModification()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  newPatternSuccess,
  updatePatternSuccess,
  deletePatternSuccess,
  getPatternsSuccess,
  // clearPatterns,
  failure
}
