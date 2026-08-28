// 可停止的长按重复调整逻辑，供床铺时间控件使用。
function HoldAdjust(callback, delay) {
    this.callback = callback;
    this.delay = delay || 400;
    this.timer = null;
    this.repeatTimer = null;
}
HoldAdjust.prototype.start = function() {
    var self = this;
    this.stop();
    this.callback();
    this.timer = setTimeout(function() {
        self.repeatTimer = setInterval(self.callback, 80);
    }, this.delay);
};
HoldAdjust.prototype.stop = function() {
    if (this.timer !== null) clearTimeout(this.timer);
    if (this.repeatTimer !== null) clearInterval(this.repeatTimer);
    this.timer = null;
    this.repeatTimer = null;
};
HoldAdjust.prototype.isRunning = function() {
    return this.timer !== null || this.repeatTimer !== null;
};
