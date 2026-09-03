var Repair = {
    getRepairableItems:function(bag,itemData,durableSaveData){
        var result = [];
        for(var item in bag){
            if(itemData[item] && itemData[item].durable && durableSaveData[item] > 0)result.push(item);
        }
        return result;
    },
    repair:function(item,bag,itemData,durableSaveData){
        if(!bag[item] || !itemData[item] || !itemData[item].durable || !(durableSaveData[item] > 0))return false;
        durableSaveData[item] = 0;
        return true;
    }
};
if(typeof module !== 'undefined')module.exports = Repair;
