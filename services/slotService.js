module.exports.getSlots = (utils, slotCount, slotMax = 5) => {
    var slots = [];
    for (var i = 0; i < slotCount; i++)
    {
        slots[i] = utils.getRandNum(slotMax);
    }
    
    return slots;
};