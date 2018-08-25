'use strict'

const store = {
  mainGrid: [],
  successTimeout: 1500,
  failureTimeout: 3000,
  successMessageColor: () => {
    $('.modal-title').addClass('modal-title-green')
  },
  errorMessageColor: () => {
    $('.modal-title').addClass('modal-title-red')
  },
  defaultMessageColor: () => {
    $('.modal-title').removeClass('modal-title-green').removeClass('modal-title-red')
  },
  clearGrid: function () {
    $('.grid-cell').removeClass('black').removeClass('red').removeClass('blue')
    $('.pattern-field-input-info').val('')
    $('#update-pattern-button').hide()
    $('#save-pattern-button').show()
    store.mainGrid = [
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
    console.log('clearGrid runs')
  }
}

module.exports = store
