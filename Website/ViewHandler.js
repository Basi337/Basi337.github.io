import EnergyList from './ENergyList.js';
import Energy from './Energy.js';

function ViewHandler() {}

ViewHandler.prototype.bind = function() {
    let setPercentageBtn = document.getElementById('setPercentageBtn');
    //let calculateEnergyUsageBtn = document.getElementById('calculateEnergyUsageBtn');
    //let calculateEnergyUsageBetweenDatesBtn = document.getElementById('calculateEnergyUsageBetweenDatesBtn');

    setPercentageBtn.addEventListener('click', () => this.handleSetPercentage());
    // calculateEnergyUsageBtn.addEventListener('click', () => this.handleCalculateEnergyUsage());
    // calculateEnergyUsageBetweenDatesBtn.addEventListener('click', () => this.handleCalculateEnergyUsageBetweenDates());
};

ViewHandler.prototype.render = function(data) {
    document.getElementById('current-input').textContent = data.input;
    document.getElementById('current-output').textContent = data.output;
    document.getElementById('battery-status').textContent = data.batteryPercentage;
    document.getElementById('battery-time').textContent = data.remainingTime;

    let batteryChargeElement = document.getElementById('batteryCharge');
    batteryChargeElement.style.width = `${data.batteryPercentage}%`;

    if (data.batteryPercentage <= 25) {
        batteryChargeElement.className = 'battery-charge low';
    } else if (data.batteryPercentage <= 75) {
        batteryChargeElement.className = 'battery-charge medium';
    } else {
        batteryChargeElement.className = 'battery-charge high';
    }
};

ViewHandler.prototype.handleSetPercentage = function () {
    let energyId = document.getElementById('energyId').value;
    let energyList = new EnergyList();
    let energyData = energyList.getEnergyById(energyId);

    if (energyData) {
        let energy = new Energy(energyData.energyId, energyData.input, energyData.output, energyData.batteryPercentage);
        let remainingTime = energy.calculateBatteryTime(energyData.input, energyData.output, energyData.batteryPercentage);
        this.render({
            input: energyData.input,
            output: energyData.output,
            batteryPercentage: energyData.batteryPercentage,
            remainingTime: remainingTime
        });
    } else {
        alert("Energy data not found for the entered ID.");
    }
};

ViewHandler.prototype.handleCalculateEnergyUsage = function () {
    // Implementation for calculating energy usage
};

ViewHandler.prototype.handleCalculateEnergyUsageBetweenDates = function () {
    // Implementation for calculating energy usage between dates
};

export default ViewHandler;
