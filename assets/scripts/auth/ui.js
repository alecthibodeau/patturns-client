'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#modalTitleSignUp').text('Signed up successfully')
  store.successMessageColor()
  $('#sign-up').slideToggle(200)
  setTimeout(function () {
    $('#signUpModal').modal('hide')
    $('#modalTitleSignUp').text('Sign up')
    $('#sign-up').slideToggle(200)
    store.defaultMessageColor()
    $('#signInModal').modal('show')
  }, store.successTimeout)
}

const signUpFailure = function (error) {
  $('#modalTitleSignUp').text('Error on sign up. Try again')
  store.errorMessageColor()
  setTimeout(function () {
    $('#modalTitleSignUp').text('Sign up')
    store.defaultMessageColor()
  }, store.failureTimeout)
  console.log('signUpFailure ran. Error is :', error)
}

const signInSuccess = function (data) {
  $('#modalTitleSignIn').text('Signed in successfully')
  store.successMessageColor()
  $('#sign-in').slideToggle(200)
  $('#nav-sign-up').hide()
  $('#nav-sign-in').hide()
  $('.nav-bar').show()
  $('.intro-bar').hide()
  setTimeout(function () {
    $('#signInModal').modal('hide')
    $('#modalTitleSignIn').text('Sign in')
    $('#sign-in').show()
    store.defaultMessageColor()
  }, store.successTimeout)
  // store is an empty object: store = {}. We'll fill it with information. See store.js
  store.user = data.user
}

const signInFailure = function (error) {
  $('#modalTitleSignIn').text('Error on sign in. Try again.')
  store.errorMessageColor()
  setTimeout(function () {
    $('#modalTitleSignIn').text('Sign in')
    store.defaultMessageColor()
  }, store.failureTimeout)
  console.log('signInFailure ran. Error is :', error)
}

const changePasswordSuccess = function (data) {
  $('#modalTitleChangePassword').text('Changed password successfully')
  store.successMessageColor()
  $('#change-password').slideToggle(200)
  setTimeout(function () {
    $('#changePasswordModal').modal('hide')
    $('#modalTitleChangePassword').text('Change password')
    store.defaultMessageColor()
    $('#change-password').show()
  }, store.successTimeout)
}

const changePasswordFailure = function (error) {
  $('#modalTitleChangePassword').text('Error on change password. Try again.')
  store.errorMessageColor()
  setTimeout(function () {
    $('#modalTitleChangePassword').text('Change password')
    store.defaultMessageColor()
  }, store.failureTimeout)
  console.log('changePasswordFailure ran. Error is :', error)
}

const signOutSuccess = function (data) {
  $('#modalTitleSignOut').text('Signed out successfully')
  store.successMessageColor()
  $('#nav-sign-up').show()
  $('#nav-sign-in').show()
  $('.info-section').hide()
  $('.nav-bar').hide()
  $('.intro-bar').show()
  store.showHideCounter = 0

  setTimeout(function () {
    $('#signOutModal').modal('hide')
    $('#modalTitleSignOut').text('Sign out')
    store.defaultMessageColor()
  }, store.successTimeout)
  store.user = null
}

const signOutFailure = function (error) {
  $('#modalTitleSignOut').text('Error on sign out. Try again')
  store.errorMessageColor()
  setTimeout(function () {
    $('#signOutModal').modal('hide')
    $('#modalTitleSignOut').text('Sign out')
    store.defaultMessageColor()
  }, store.failureTimeout)
  console.log('signOutFailure ran. Error is :', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
