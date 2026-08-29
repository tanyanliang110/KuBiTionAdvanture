var ItemCount = require('../src/item_count.js');

var total = ItemCount.getOwnedTotal('wood', {bag:{things:{wood:3}},bigBox:{things:{wood:8}}}, {hand:'wood'});
if (total !== 12) throw new Error('总拥有数量应包含背包、大箱子和已装备物品');

var absent = ItemCount.getOwnedTotal('stone', {bag:{things:{}},bigBox:{things:{}}}, {});
if (absent !== 0) throw new Error('不存在的物品总数应为零');

console.log('item count tests passed');
