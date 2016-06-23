
'use strict';

class MiddlewareError extends AppError {
  constructor(message, data) {
    super(message, data);
  }
}

module.exports = MiddlewareError;