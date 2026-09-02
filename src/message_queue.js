var MessageQueue = {
    nextKey: 1,
    create:function(){
        return {
            add:function(message){
                var entry = {key:'msg_' + MessageQueue.nextKey++, message:message};
                this.items.push(entry);
                return entry;
            },
            remove:function(key){
                this.items = this.items.filter(function(entry){return entry.key != key;});
            },
            list:function(){
                return this.items.slice().reverse().map(function(entry){return entry.message;});
            },
            entries:function(){
                return this.items.slice().reverse();
            },
            items:[]
        };
    }
};
if(typeof module !== 'undefined')module.exports = MessageQueue;
