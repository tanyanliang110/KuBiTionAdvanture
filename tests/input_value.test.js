const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const context = { console };
vm.createContext(context);
vm.runInContext(fs.readFileSync('src/input_value.js', 'utf8') + '\nthis.readInputValue = readInputValue;', context);
assert.strictEqual(context.readInputValue({nativeEvent:{target:{value:4}}}, 1), 4);
assert.strictEqual(context.readInputValue(null, 2), 2);
console.log('input value tests passed');
