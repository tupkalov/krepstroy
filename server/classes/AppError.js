
'use strict';

class AppError extends Error {
  constructor(message, data) {
    super(message);
    this.status = data && data.status || 500;
    this.info = data && data.info || null;
    this.name = this.constructor.name;
    this.message = message; 
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(message)).stack; 
    }
  }

  toString (){
    console.log(`Error ${this.status}: ${this.name}:${this.message}`);
    this.info && console.log(this.info);
    console.log(this.stack);
  }
}

module.exports = AppError;