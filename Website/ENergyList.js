function EnergyList() {
    this.list = [
        { "energyId": "1", "input": 10, "output": 5, "batteryPercentage": 70 },
        { "energyId": "2", "input": 8, "output": 10, "batteryPercentage": 50 },
        { "energyId": "3", "input": 12, "output": 7, "batteryPercentage": 80 },
        { "energyId": "4", "input": 6, "output": 6, "batteryPercentage": 90 },
        { "energyId": "5", "input": 7, "output": 9, "batteryPercentage": 60 },
        { "energyId": "6", "input": 9, "output": 8, "batteryPercentage": 45 },
        { "energyId": "7", "input": 11, "output": 4, "batteryPercentage": 75 },
        { "energyId": "8", "input": 5, "output": 11, "batteryPercentage": 25 },
        { "energyId": "9", "input": 13, "output": 3, "batteryPercentage": 65 },
        { "energyId": "10", "input": 4, "output": 12, "batteryPercentage": 35 }
    ];
}

EnergyList.prototype.getEnergyById = function(id) {
    return this.list[id - 1];
}

export default EnergyList;
