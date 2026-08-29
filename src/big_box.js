var BigBoxStorage = {
    storeExisting:function(bagThings,bigBoxThings){
        var moved = 0;
        for(var item in bagThings){
            if(!bigBoxThings[item])continue;
            moved += bagThings[item];
            bigBoxThings[item] += bagThings[item];
            delete bagThings[item];
        }
        return moved;
    }
};

if(typeof module !== 'undefined')module.exports = BigBoxStorage;
