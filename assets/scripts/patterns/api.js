'use strict'

const config = require('../config')
const store = require('../store')

const getPatterns = function () {
  return $.ajax({
    url: config.apiUrl + '/patterns',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const newPattern = function (data) {
  return $.ajax({
    url: config.apiUrl + '/patterns',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePattern = (data, patternId) => {
  return $.ajax({
    url: config.apiUrl + '/patterns/' + patternId,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deletePattern = (patternId) => {
  return $.ajax({
    url: config.apiUrl + '/patterns/' + patternId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getPatterns,
  newPattern,
  updatePattern,
  deletePattern
}
