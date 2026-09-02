var EncyclopediaData = require('../src/encyclopedia.js');

var itemData = {
    wood:{name:'木头',type:'met'},
    water:{name:'水',type:'food'},
    axe:{name:'斧头',type:'tool'}
};
var placeData = {
    forest:{
        name:'静谧森林',
        pickRequire:{ps:3},
        things:{wood:2},
        resource:{tree:{name:'树',things:{wood:5},action:'砍',timeNeed:1,require:{ps:5,axe:1}}}
    },
    ruin:{
        name:'古老的废墟',
        resource:{pile:{name:'废墟聚集处',things:{wood:3},action:'发掘',timeNeed:4,require:{ps:10}}}
    },
    cave:{
        name:'幽暗洞穴',
        things:{wood:1},
        resource:{}
    }
};

var entries = EncyclopediaData.getMaterialEntries(itemData, placeData, {
    forest:{visited:true},
    ruin:{visited:false},
    cave:{visited:true}
});
var wood = entries[0];

if (wood.item !== 'wood' || wood.name !== '木头') throw new Error('百科应只列出材料物品');
if (wood.sources.length !== 3) throw new Error('同一地点的多个来源应合并为一个获取地点');
if (wood.sources[0].placeName !== '静谧森林' || wood.sources[0].random) throw new Error('同地点存在稳定资源时应只显示地点，不标为随机探索');
if (wood.sources[1].placeName !== '？？？') throw new Error('未发现地点应显示问号而非地点名称');
if (wood.sources[2].placeName !== '幽暗洞穴' || !wood.sources[2].random) throw new Error('只有随机探索的地点应保留探索可获得提示');

var recipes = EncyclopediaData.getRecipeEntries({
    water:{name:'水'},
    ice:{name:'冰露'},
    iceWater:{name:'冰水果汁',desc:'清凉饮料'}
}, [{name:'iceWater',require:['water','ice']}], {});
if (recipes[0].resultName !== '？？？' || recipes[0].requireNames.join('、') !== '水、冰露') throw new Error('未制作的食谱应显示原料并隐藏成品');

var knownRecipes = EncyclopediaData.getRecipeEntries({
    water:{name:'水'},
    ice:{name:'冰露'},
    iceWater:{name:'冰水果汁',desc:'清凉饮料'}
}, [{name:'iceWater',require:['water','ice']}], {iceWater:true});
if (knownRecipes[0].resultName !== '冰水果汁' || knownRecipes[0].desc !== '清凉饮料') throw new Error('制作过的食谱应显示成品名称和说明');
if (EncyclopediaData.getRecipeDetailItem(knownRecipes[0]) !== 'iceWater') throw new Error('已制作食谱应提供成品物品提示信息');
if (EncyclopediaData.getRecipeDetailItem(recipes[0]) !== '') throw new Error('未制作食谱不应提供成品物品提示信息');
var tooltipPosition = EncyclopediaData.getRecipeTooltipPosition({clientX:780,clientY:580},800,600,220,160);
if (tooltipPosition.left !== 548 || tooltipPosition.top !== 408) throw new Error('食谱提示框应在屏幕边缘自动避让');

var invalidIngredientRecipes = EncyclopediaData.getRecipeEntries({jam:{name:'果酱'},jamBread:{name:'果酱面包'}}, [{name:'jamBread',require:['jam','flour']}], {});
if (invalidIngredientRecipes.length !== 0) throw new Error('引用不存在物品的失效配方不应显示在百科中');

var sortedRecipes = EncyclopediaData.getRecipeEntries({
    water:{name:'水'}, ice:{name:'冰露'}, fire:{name:'火草'},
    iceWater:{name:'冰水果汁'}, fireWater:{name:'火水果汁'}
}, [
    {name:'iceWater',require:['water','ice']},
    {name:'fireWater',require:['water','fire']}
], {fireWater:true});
var duplicateRecipes = EncyclopediaData.getRecipeEntries({
    water:{name:'水'}, wood:{name:'木头'}, hotWater:{name:'热水'}
}, [
    {name:'hotWater',require:['water','wood']},
    {name:'hotWater',require:['wood','water']}
], {});
if (duplicateRecipes.length !== 1) throw new Error('原料顺序不同但组合相同的食谱应只显示一次');
var humanRecipe = EncyclopediaData.getRecipeEntries({
    humanCook:{name:'煮人肉'}, humanMeat:{name:'尸体'}, water:{name:'水'}
}, [{name:'humanCook',require:['humanMeat','water']}], {});
if (humanRecipe[0].requireNames.join('、') !== '尸体、水') throw new Error('煮人肉应显示尸体和水两种原料');
var dragonScaleRecipe = EncyclopediaData.getRecipeEntries({
    dragonScaleSoap:{name:'龙鳞汤'}, dragonScale:{name:'龙鳞'}, water:{name:'水'}
}, [{name:'dragonScaleSoap',require:['dragonScale','water']}], {});
if (dragonScaleRecipe[0].requireNames.join('、') !== '龙鳞、水') throw new Error('龙鳞汤应显示龙鳞和水两种原料');
if (sortedRecipes[0].result !== 'fireWater' || !sortedRecipes[0].known) throw new Error('已解锁食谱应排在未解锁食谱之前');

var catalogItems = {
    wood:{name:'木头',type:'met'},
    fruit:{name:'浆果',type:'food'},
    soup:{name:'果汤',type:'cooked'}
};
var catalogPlaces = {
    forest:{name:'森林',resource:{tree:{things:{wood:1,fruit:1}}}},
    mountain:{name:'山地',resource:{rock:{things:{wood:1}}}}
};
var unknownMaterials = EncyclopediaData.getCollectibleEntries(catalogItems,catalogPlaces,{forest:{visited:true},mountain:{visited:true}},{},'material');
var knownFoods = EncyclopediaData.getCollectibleEntries(catalogItems,catalogPlaces,{forest:{visited:true},mountain:{visited:true}},{fruit:true},'ingredient');
if (unknownMaterials.length !== 1 || unknownMaterials[0].name !== '？？？') throw new Error('未获得的材料应隐藏名称，且烹饪成品不应列入材料');
if (knownFoods.length !== 1 || knownFoods[0].name !== '浆果') throw new Error('地图直接获得的食材应独立列入食材页');
if (unknownMaterials[0].sources[0].placeName !== '森林') throw new Error('材料来源应按地图数据顺序排列');

console.log('encyclopedia tests passed');
