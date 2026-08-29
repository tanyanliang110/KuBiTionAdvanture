var ItemCount = {
    getOwnedTotal:function(item, boxSaveData, currentEquip){
        var total = 0;
        var boxes = ['bag','bigBox'];
        for(var i = 0; i < boxes.length; i++){
            var box = boxSaveData[boxes[i]];
            total += box && box.things[item] || 0;
        }
        for(var equipType in currentEquip){
            if(currentEquip[equipType] == item)total += 1;
        }
        return total;
    }
};

if(typeof module !== 'undefined')module.exports = ItemCount;
