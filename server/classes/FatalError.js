
'use strict';

class FatalError extends AppError {
  constructor(message, data) {
    super(message, data);
  }
}

module.exports = FatalError;