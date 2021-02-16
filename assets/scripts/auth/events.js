'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const validatePassword = (form) => {
  const elements = form.elements || []
  for (let i = 0; i < elements.length; i++) {
    const e = elements[i]
    if (e.hasAttribute('name')) {
      if ((e.getAttribute('name') === 'credentials[password]' || e.getAttribute('name') === 'passwords[new]')) {
        // Password must be a minimum of 12 characters long, containing at least one letter and one number.
        const passwordValidation = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/);
        const validPassword = passwordValidation.test(e.value);
        void (!validPassword && $('.password-validation-message').addClass('validation-error'));
        return validPassword;
      }
    }
  }
}

const onSignUp = function (event) {
  event.preventDefault()
  if (!validatePassword(this)) {
    return;
  };
  $('#modalTitleSignUp').text('Signing up…')
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  if (!validatePassword(this)) {
    return;
  }
  $('#modalTitleSignIn').text('Signing in…')
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  if (!validatePassword(this)) {
    return;
  }
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const removeValidationMessage = () => {
  $('.password-validation-message').removeClass('validation-error');
}

const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#nav-sign-out').on('click', onSignOut)
  $('.validation-related-button').on('click', removeValidationMessage);
}

module.exports = {
  addAuthHandlers
}
