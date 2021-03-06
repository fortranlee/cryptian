"use strict";

function NotImplementedError(message) {
  this.message = message || '';
}

NotImplementedError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: NotImplementedError
  },
  name: {
    value: 'NotImplementedError'
  },
  stack: {
    get: function get() {
      return new Error().stack;
    }
  }
});
exports.NotImplementedError = NotImplementedError;