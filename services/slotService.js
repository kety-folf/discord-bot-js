const Utils = require('../Utils');

module.exports.getSlots = (slotCount, slotMax = 5) => {
    var slots = [];
    for (var i = 0; i < slotCount; i++)
    {
        slots[i] = Utils.getRandNum(slotMax);
    }
    
    return slots;
};