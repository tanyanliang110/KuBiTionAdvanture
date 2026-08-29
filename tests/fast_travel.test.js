var fs = require('fs');
var source = fs.readFileSync('src/main.js', 'utf8');

if (source.indexOf('var TravelWindowComponent') === -1) {
    throw new Error('快速移动应使用独立的 TravelWindowComponent 弹窗');
}

if (source.indexOf("this.context.callWindow(<TravelWindowComponent") === -1) {
    throw new Error('前往其他地方按钮应打开快速移动弹窗');
}

if (source.indexOf('className="travelRows"') === -1) {
    throw new Error('快速移动弹窗应有独立的可滚动地点列表');
}

console.log('fast travel modal tests passed');
