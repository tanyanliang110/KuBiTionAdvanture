var Repair = require('../src/repair.js');

var itemData = {
    sword:{name:'铁剑',durable:20,type:'weapon'},
    armor:{name:'轻甲',durable:30,type:'equip'},
    wood:{name:'木头',type:'met'}
};
var bag = {sword:1,armor:1,wood:5};
var damage = {sword:8,armor:0};
var repairable = Repair.getRepairableItems(bag,itemData,damage);
if(repairable.length !== 1 || repairable[0] !== 'sword')throw new Error('只应列出背包中耐久有损耗的物品');
if(!Repair.repair('sword',bag,itemData,damage) || damage.sword !== 0)throw new Error('修理成功后耐久损耗应归零');
if(Repair.repair('armor',bag,itemData,damage))throw new Error('满耐久物品不应消耗修理工具');
if(Repair.repair('wood',bag,itemData,damage))throw new Error('无耐久物品不能修理');
console.log('repair tests passed');
