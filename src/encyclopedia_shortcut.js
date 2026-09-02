var EncyclopediaShortcut = {
    hoveredItem:null,
    setHoveredItem:function(item){
        this.hoveredItem = item;
    },
    clearHoveredItem:function(){
        this.hoveredItem = null;
    },
    handleKeyDown:function(event, openEncyclopedia, isCollectible){
        var target = event.target || {};
        var tagName = (target.tagName || '').toUpperCase();
        if(event.keyCode != 9 || tagName == 'INPUT' || tagName == 'TEXTAREA' || tagName == 'SELECT' || tagName == 'BUTTON')return false;
        if(!this.hoveredItem || !isCollectible(this.hoveredItem))return false;
        event.preventDefault();
        openEncyclopedia(this.hoveredItem);
        return true;
    }
};

if(typeof module !== 'undefined')module.exports = EncyclopediaShortcut;
