'use strict'

const store = {
  showHideCounter: 0,
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
  }
}

module.exports = store
