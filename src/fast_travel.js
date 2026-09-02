var FastTravel = {
    getAvailablePlaces:function(placeData,placeSaveData,currentPlace,season){
        var places = [];
        for(var target in placeData){
            if(target == currentPlace || target == 'upgradePlace' || target == 'home' || target == 'branch')continue;
            if(!placeSaveData[target] || !placeSaveData[target].visited)continue;
            if(placeData[target].season && placeData[target].season != season)continue;
            places.push({name:target,label:placeData[target].name,time:(placeData[currentPlace].timeNeed||0)+(placeData[target].timeNeed||0)});
        }
        return places;
    }
};
if(typeof module !== 'undefined')module.exports = FastTravel;
