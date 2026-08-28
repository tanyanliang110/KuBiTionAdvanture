const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const context = { setTimeout, clearTimeout, Date, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync('src/hold_adjust.js', 'utf8') + '\nthis.HoldAdjust = HoldAdjust;', context);

let value = 1;
const adjust = new context.HoldAdjust(() => value++, 10);
adjust.start();
assert.strictEqual(value, 2);
adjust.stop();
assert.strictEqual(adjust.isRunning(), false);
console.log('hold adjust tests passed');
