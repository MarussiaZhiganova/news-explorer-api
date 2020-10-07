 module.exports = {
   "env": {
       "es6": true,
       "node": true
   },
   "extends": [
       "airbnb-base"
   ],
   "globals": {
    "Atomics": "readonly",
       "SharedArrayBuffer": "readonly"
   },
   "parserOptions": {
       "ecmaVersion": 2018
   },
   "rules": {
    'no-console': 'off',
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'eslint-disable-line': 'off',
    'eslint-disable-next-line': 'off',
    'eslint-disable': 'off',
   }
 };
