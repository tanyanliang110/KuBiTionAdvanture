const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const values = new Map();
const context = {
  localStorage: {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  },
  console
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('src/local_storage.js', 'utf8') + '\nthis.OldKubiStorage = OldKubiStorage;', context);

const state = {
  time: { day: 3, hour: 8 },
  settings: { save_account: 'remote-account' },
  saveData: { stale: true },
  wind: null,
  detailedItem: 'temporary',
  playerState: { health: 10 }
};

assert.strictEqual(context.OldKubiStorage.save(state), true);
const saved = JSON.parse(values.get('kubi_save_1'));
assert.deepStrictEqual(saved.time, state.time);
assert.strictEqual(saved.settings, undefined);
assert.strictEqual(saved.saveData, undefined);
assert.strictEqual(saved.detailedItem, undefined);

const loaded = context.OldKubiStorage.load();
assert.strictEqual(JSON.stringify(loaded.time), JSON.stringify(state.time));
assert.strictEqual(context.OldKubiStorage.loadRaw(), values.get('kubi_save_1'));

assert.strictEqual(context.OldKubiStorage.saveToSlot(state, 2), true);
assert.strictEqual(values.has('kubi_save_2'), true);
assert.strictEqual(context.OldKubiStorage.loadFromSlot(2).time.day, 3);
assert.strictEqual(context.OldKubiStorage.deleteSlot(2), true);
assert.strictEqual(context.OldKubiStorage.loadFromSlot(2), null);
assert.strictEqual(context.OldKubiStorage.setActiveSlot(3), true);
assert.strictEqual(context.OldKubiStorage.getActiveSlot(), 3);
assert.strictEqual(context.OldKubiStorage.save(state), true);
assert.strictEqual(values.has('kubi_save_3'), true);

console.log('local storage tests passed');
