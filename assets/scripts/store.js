'use strict'

const store = {
  successTimeout: 1500, // Success messages stay visible for this many milliseconds.
  failureTimeout: 3000, // Failure messages stay visible for this many milliseconds.
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
    $('.color-box').removeClass('selected-color') // Removes yellow highlight from all color boxes.
    $('#black').addClass('selected-color') // Adds yellow highlight to black color box.
    store.currentColor = 'black' // Sets picked color to black.
    $('.grid-cell').attr('class', 'grid-cell') // Removes all color classes from all grid-cells.
    $('.pattern-field-input-info').val('') // Clears any typed info in the form input field.
    $('#update-pattern-panel').hide() // Hides panel for updating pattern: form input field and 'SAVE' button.
    $('#new-pattern-panel').show() // Shows panel for saving pattern: form input field and 'UPDATE' button
    store.mainGrid = Array(100).fill('white') // Instantiates an array with 100 'white' values.
    // console.log(store.mainGrid)
  }
}

module.exports = store
