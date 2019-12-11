// await-timeout v0.5.0 by Vitaliy Potapov
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Timeout = factory());
}(this, function () { 'use strict';

  function promiseFinally(promise, fn) {
    const success = result => {
      fn();
      return result;
    };
    const error = e => {
      fn();
      return Promise.reject(e);
    };
    return Promise.resolve(promise).then(success, error);
  }

  /**
   * Converts any value to Error.
   * @param {*} value
   * @returns {Error}
   */
  function toError(value) {
    value = typeof value === 'function' ? value() : value;
    return typeof value === 'string' ? new Error(value) : value;
  }

  /**
   * Promise-based replacement for setTimeout / clearTimeout.
   */

  class Timeout {
    constructor() {
      this._id = null;
      this._delay = null;
    }

    get id() {
      return this._id;
    }

    get delay() {
      return this._delay;
    }

    set(delay, rejectReason = '') {
      return new Promise((resolve, reject) => {
        this.clear();
        const fn = rejectReason ? () => reject(toError(rejectReason)) : resolve;
        this._id = setTimeout(fn, delay);
        this._delay = delay;
      });
    }

    wrap(promise, delay, rejectReason = '') {
      const wrappedPromise = promiseFinally(promise, () => this.clear());
      const timer = this.set(delay, rejectReason);
      return Promise.race([wrappedPromise, timer]);
    }

    clear() {
      if (this._id) {
        clearTimeout(this._id);
      }
    }
  }

  Timeout.set = function (delay, rejectReason) {
    return new Timeout().set(delay, rejectReason);
  };

  Timeout.wrap = function (promise, delay, rejectReason) {
    return new Timeout().wrap(promise, delay, rejectReason);
  };

  return Timeout;

}));
