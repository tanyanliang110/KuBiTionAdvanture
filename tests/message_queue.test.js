var MessageQueue = require('../src/message_queue.js');

var queue = MessageQueue.create();
var first = queue.add('first');
var second = queue.add('second');
if(first.key === second.key)throw new Error('消息应使用唯一 key');
if(queue.list().join(',') !== 'second,first')throw new Error('消息列表应按最新消息倒序显示');
queue.markLeaving(first.key);
if(!queue.items[0].leaving || queue.items[1].leaving)throw new Error('淡出状态应只标记指定消息');
queue.remove(first.key);
if(queue.list().join(',') !== 'second')throw new Error('按消息 key 删除时不应误删其他消息');
console.log('message queue tests passed');
