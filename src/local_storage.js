// 本地存档适配器：保留原有 MainComponent 状态结构，不再依赖远端账号服务。
var OldKubiStorage = {
    KEY: 'kubi_save_1',
    SLOT_PREFIX: 'kubi_save_',
    ACTIVE_SLOT_KEY: 'kubi_active_slot',
    TEMP_FIELDS: ['settings', 'saveData', 'wind', 'detailedItem', 'detailedList', 'detailedType', 'misk', 'progress', 'msgList', 'showMenu'],

    snapshot: function(state) {
        var save = JSON.parse(JSON.stringify(state));
        for (var i = 0; i < this.TEMP_FIELDS.length; i++) {
            delete save[this.TEMP_FIELDS[i]];
        }
        return save;
    },

    save: function(state) {
        return this.saveToSlot(state);
    },

    keyForSlot: function(slot) {
        return this.SLOT_PREFIX + slot;
    },

    validSlot: function(slot) {
        return slot === 1 || slot === 2 || slot === 3;
    },

    getActiveSlot: function() {
        var slot = parseInt(localStorage.getItem(this.ACTIVE_SLOT_KEY), 10);
        return this.validSlot(slot) ? slot : 1;
    },

    setActiveSlot: function(slot) {
        if (!this.validSlot(slot)) return false;
        localStorage.setItem(this.ACTIVE_SLOT_KEY, String(slot));
        return true;
    },

    saveToSlot: function(state, slot) {
        try {
            slot = slot || this.getActiveSlot();
            if (!this.validSlot(slot)) return false;
            localStorage.setItem(this.keyForSlot(slot), JSON.stringify(this.snapshot(state)));
            this.setActiveSlot(slot);
            return true;
        } catch (error) {
            console.error('本地保存失败:', error);
            return false;
        }
    },

    loadRaw: function() {
        return localStorage.getItem(this.KEY);
    },

    loadRawFromSlot: function(slot) {
        return this.validSlot(slot) ? localStorage.getItem(this.keyForSlot(slot)) : null;
    },

    load: function() {
        return this.loadFromSlot(1);
    },

    loadFromSlot: function(slot) {
        try {
            var raw = this.loadRawFromSlot(slot);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error('本地读取失败:', error);
            return null;
        }
    },

    clear: function() {
        for (var slot = 1; slot <= 3; slot++) localStorage.removeItem(this.keyForSlot(slot));
    },

    deleteSlot: function(slot) {
        if (!this.validSlot(slot)) return false;
        localStorage.removeItem(this.keyForSlot(slot));
        return true;
    },

    getSlotInfo: function(slot) {
        var data = this.loadFromSlot(slot);
        return data ? {day: data.time && data.time.day || 0, hour: Math.floor((data.time && data.time.hour) || 0)} : null;
    },

    export: function(slot) {
        var raw = this.loadRawFromSlot(slot || 1);
        if (!raw) return false;
        var blob = new Blob([raw], {type: 'application/json'});
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'kubi_save_' + (slot || 1) + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return true;
    },

    import: function(file, slot, onDone) {
        if (!file || !this.validSlot(slot)) return false;
        var reader = new FileReader();
        reader.onload = function(event) {
            try {
                var data = JSON.parse(event.target.result);
                if (!data || !data.time || !data.boxSaveData) throw new Error('invalid save');
                localStorage.setItem(OldKubiStorage.keyForSlot(slot), JSON.stringify(data));
                if (onDone) onDone(true);
            } catch (error) {
                console.error('导入存档失败:', error);
                if (onDone) onDone(false);
            }
        };
        reader.readAsText(file);
        return true;
    }
};
