function Energy(id, input, output, batteryPercentage) {
    this.id = id;
    this.input = input;
    this.output = output;
    this.batteryPercentage = batteryPercentage;
}

Energy.prototype.calculateBatteryTime = function (input, output, batteryPercentage) {
    let batteryCapacity = 20;
    let remainingCapacity = batteryCapacity * (batteryPercentage / 100);
    let timeToEmpty = 0;
    let timeToFull = 0;

    if (output > input) {
        timeToEmpty = remainingCapacity / (output - input);
        return `Battery will be empty in ${timeToEmpty.toFixed(2)} hours.`;
    } else if (input > output) {
        timeToFull = (batteryCapacity - remainingCapacity) / (input - output);
        return `Battery will be full in ${timeToFull.toFixed(2)} hours.`;
    } else {
        return 'Battery remains stable.';
    }
};

export default Energy;
