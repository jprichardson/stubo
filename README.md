stubo
=====

stubo (pronounced stub-oh) is a simple JavaScript stubbing component. It's useful for
creating stub objects for AngularJS tests or [proxyquire](https://github.com/thlorenz/proxyquire) tests.

#### Why not Sinon?

Sinon is a great library that supports stubbing. But unfortunately it only supports stubbing
one level deep.


Installation
------------

    npm i --save stubo


Example
-------

`stubo` converts this:

```js
var stub = {
  window: {
    localStorage: {
      getItem: function () {
        return 'data'
      },
      length: 1
    }
  }
}
```

to this:

```js
var stubo = require('stubo')
var stub = {}
stubo(stub, 'window', 'localStorage.getItem()', 'data')
stubo(stub, 'window', 'localStorage.length', 1)
```

License
-------

MIT
