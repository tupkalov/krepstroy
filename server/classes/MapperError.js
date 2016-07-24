
'use strict';

class MapperError extends AppError {
  constructor(message, data) {
    super(message, data);
  }
}

module.exports = MapperError;