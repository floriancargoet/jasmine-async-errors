jasmine-async-errors
====================

Jasmine-oriented domain wrapper to catch those nasty asynchronous errors in your tests

```
it = require('jasmine-async-errors').wrap(it);

// now, write your tests as usual
describe('asynchronous jasmine errors', function() {

  it('asynchronous errors are reported', function (done) {

    setTimeout(function outerTimeout() {
      expect(true).toBeTruthy();
        setTimeout(function innerTimeout() {
          expect(true).toBeTruthy();

          bad.code;

          done(); // never called
        });
    });
  });

  it('synchronous tests still work', function () {
    expect(1).toEqual(1);
  });
});

```
