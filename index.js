var trycatch = require('trycatch');
trycatch.configure({
  'long-stack-traces': true
});

function wrapInTryCatch(itCallback) {
  return function (doneCallback) {
    trycatch(function () {
      // execute the test
      itCallback(doneCallback);
    }, function (err) {
      // log the original error stack
      console.error(err.stack);
      // force failure to indicate in the report that there has been a problem
      expect(false).toBeTruthy();
      // call the done() callback so that jasmine continues correctly
      doneCallback();
    });
  };
}


module.exports = {
  /**
   * wrap jasmine's "it" function so that each
   * test is wrapped in a trycatch handler
   */
  wrap : function (originalIt) {
    return function it(desc, cb) {
      if (cb.length === 0) {
        originalIt(desc, cb);
      } else {
        originalIt(desc, wrapInTryCatch(cb));
      }
    };
  }
};
