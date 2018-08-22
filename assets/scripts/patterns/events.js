'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')

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
  api.newPattern(data)
    .then(ui.newPatternSuccess(data))
    .then(getPatterns)
    .catch(ui.failure)
}

const savePattern = (event) => {
  // Retrieve patternle row data on launch of Update Pattern modal…
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

const addPatternHandlers = () => {
  $('.pattern-return-content').on('click', savePattern).on('mouseover', '.info-td', (event) => {
    $(this).css('cursor', 'pointer')
  })
  $('#showHidePatternsButton').click((event) => {
    store.showHideCounter % 2 === 0 ? onGetPatterns(event) : onClearPatterns(event)
    store.showHideCounter++
  })
  $('.info-section').hide()
  $('.nav-bar').hide()
  $('#new-pattern').on('submit', onNewPattern)
  $('#update-pattern').on('submit', onUpdatePattern)
  $('#delete-pattern').on('submit', onDeletePattern)
}

module.exports = {
  addPatternHandlers
}
