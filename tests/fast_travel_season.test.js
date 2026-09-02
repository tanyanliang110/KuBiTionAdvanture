var FastTravel = require('../src/fast_travel.js');
var places = {
    town:{name:'银溪镇',timeNeed:1},
    mountain:{name:'冰冻荒原',timeNeed:5,season:'winter'},
    forest:{name:'森林',timeNeed:2}
};
var save = {town:{visited:true},mountain:{visited:true},forest:{visited:true}};
var summer = FastTravel.getAvailablePlaces(places,save,'town','summer');
if(summer.some(function(place){return place.name === 'mountain';}))throw new Error('非冬季不应提供前往漂流冰川的快速旅行');
var winter = FastTravel.getAvailablePlaces(places,save,'town','winter');
if(!winter.some(function(place){return place.name === 'mountain';}))throw new Error('冬季应提供前往漂流冰川的快速旅行');
console.log('fast travel season tests passed');
