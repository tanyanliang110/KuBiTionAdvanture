var EncyclopediaShortcut = require('../src/encyclopedia_shortcut.js');

var openedItem = null;
var prevented = false;
EncyclopediaShortcut.setHoveredItem('wood');
var opened = EncyclopediaShortcut.handleKeyDown({keyCode:9,preventDefault:function(){prevented = true;},target:{tagName:'DIV'}}, function(item){openedItem = item;}, function(item){return item == 'wood';});
if (!opened || openedItem != 'wood' || !prevented) throw new Error('悬停在可查询物品上按 Tab 应打开百科并阻止浏览器切换焦点');

openedItem = null;
prevented = false;
EncyclopediaShortcut.setHoveredItem('axe');
var ignored = EncyclopediaShortcut.handleKeyDown({keyCode:9,preventDefault:function(){prevented = true;},target:{tagName:'DIV'}}, function(item){openedItem = item;}, function(){return false;});
if (ignored || openedItem || prevented) throw new Error('没有百科条目的物品不应响应 Tab');

console.log('encyclopedia shortcut tests passed');
