var EncyclopediaData = {
    getCollectibleEntries:function(itemData, placeData, placeSaveData, knownItems, category){
        var type = category == 'ingredient' ? 'food' : 'met';
        var entriesByItem = {};
        var entries = [];
        for(var place in placeData){
            var data = placeData[place];
            var sourceItems = {};
            var randomItems = {};
            for(var item in data.things){
                sourceItems[item] = true;
                randomItems[item] = true;
            }
            for(var resource in data.resource){
                var things = data.resource[resource].things || {};
                for(var resourceItem in things){
                    sourceItems[resourceItem] = true;
                    randomItems[resourceItem] = false;
                }
            }
            for(var sourceItem in sourceItems){
                if(!itemData[sourceItem] || itemData[sourceItem].type != type)continue;
                var entry = entriesByItem[sourceItem];
                if(!entry){
                    entry = {item:sourceItem,name:knownItems[sourceItem] ? itemData[sourceItem].name : '？？？',desc:itemData[sourceItem].desc,known:!!knownItems[sourceItem],sources:[]};
                    entriesByItem[sourceItem] = entry;
                    entries.push(entry);
                }
                var visited = placeSaveData[place] && placeSaveData[place].visited;
                entry.sources.push({
                    placeName:visited ? data.name : '？？？',
                    random:randomItems[sourceItem],
                    known:visited
                });
            }
        }
        return entries;
    },
    getMaterialEntries:function(itemData, placeData, placeSaveData){
        var knownItems = {};
        for(var item in itemData)knownItems[item] = true;
        return this.getCollectibleEntries(itemData,placeData,placeSaveData,knownItems,'material');
    },
    isCollectible:function(item, itemData, placeData){
        if(!itemData[item] || (itemData[item].type != 'met' && itemData[item].type != 'food'))return false;
        for(var place in placeData){
            var data = placeData[place];
            if(data.things && data.things[item])return true;
            for(var resource in data.resource){
                if(data.resource[resource].things && data.resource[resource].things[item])return true;
            }
        }
        return false;
    },
    getRecipeEntries:function(itemData, cookData, knownRecipes){
        var entries = [];
        var seenRecipes = {};
        for(var i = 0; i < cookData.length; i++){
            var recipe = cookData[i];
            if(!itemData[recipe.name])continue;
            var requireNames = [];
            var valid = true;
            for(var j = 0; j < recipe.require.length; j++){
                var requireItem = recipe.require[j];
                if(!itemData[requireItem]){
                    valid = false;
                    break;
                }
                requireNames.push(itemData[requireItem].name);
            }
            if(!valid)continue;
            var recipeKey = recipe.name + '|' + recipe.require.slice().sort().join('+');
            if(seenRecipes[recipeKey])continue;
            seenRecipes[recipeKey] = true;
            var known = !!knownRecipes[recipe.name];
            entries.push({
                result:recipe.name,
                resultName:known ? itemData[recipe.name].name : '？？？',
                desc:known ? itemData[recipe.name].desc : '',
                requireNames:requireNames,
                known:known
            });
        }
        entries.sort(function(a,b){
            if(a.known == b.known)return 0;
            return a.known ? -1 : 1;
        });
        return entries;
    },
    getRecipeDetailItem:function(recipe){
        return recipe && recipe.known ? recipe.result : '';
    },
    getRecipeTooltipPosition:function(event, viewportWidth, viewportHeight, tooltipWidth, tooltipHeight){
        var gap = 12;
        var left = event.clientX + gap;
        var top = event.clientY + gap;
        if(left + tooltipWidth > viewportWidth)left = event.clientX - tooltipWidth - gap;
        if(top + tooltipHeight > viewportHeight)top = event.clientY - tooltipHeight - gap;
        return {left:Math.max(0,left),top:Math.max(0,top)};
    }
};

if(typeof module !== 'undefined')module.exports = EncyclopediaData;
