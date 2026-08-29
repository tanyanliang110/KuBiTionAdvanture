var BigBoxStorage = require('../src/big_box.js');

var bag = {wood: 8, stone: 3, food: 2};
var bigBox = {wood: 12, food: 1};
var moved = BigBoxStorage.storeExisting(bag, bigBox);

if (moved !== 10) throw new Error('应转移所有可归类物品');
if (bag.wood || bag.food || bag.stone !== 3) throw new Error('背包应只保留箱内没有的物品');
if (bigBox.wood !== 20 || bigBox.food !== 3) throw new Error('箱内同类物品应合并');

console.log('big box tests passed');
