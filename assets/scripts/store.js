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
    store.mouseDown = false
    $('.current-color').attr('class', 'current-color').addClass('green') // Sets the default disc color.
    store.currentColor = 'green' // Sets the value of the current color.
    $('.grid-cell').attr('class', 'grid-cell') // Removes all color classes from all grid-cells.
    $('.pattern-field-input-info').val('') // Clears any typed info in the form input field.
    $('#update-pattern-panel').hide() // Hides panel for updating pattern: form input field and 'SAVE' button.
    $('#new-pattern-panel').show() // Shows panel for saving pattern: form input field and 'UPDATE' button
    store.mainGrid = Array(100).fill('white') // Instantiates an array with 100 'white' values.
    // console.log(store.mainGrid)
  },
  // fillMainGrid fills the main grid using the values of the 'store.mainGrid' saved array.
  // The array 'store.mainGrid' is defined from within various functions, including fillGridWithSavedPattern
  fillMainGrid: () => {
    // event.preventDefault()
    $('.grid-cell').attr('class', 'grid-cell') // Step 1: Removes color classes from all cells.
    for (let i = 0; i < 100; i++) { // Step 2: Adds color class of each grid-cell from corresponding cell in saved grid array.
      $(`#cell-${i}`).addClass(`${store.mainGrid[i]}`)
    }
  }
}

module.exports = store
