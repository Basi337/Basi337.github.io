// script.js

async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/pv-data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function updateDisplay(data) {
    document.getElementById('current-input').innerText = data.input;
    document.getElementById('current-output').innerText = data.output;
    document.getElementById('battery-status').innerText = data.battery;

    const batteryTime = calculateBatteryTime(data.input, data.output, data.battery);
    document.getElementById('battery-time').innerText = batteryTime;

    updateBatteryPercentage(data.battery);
}

function calculateBatteryTime(input, output, battery) {
    const batteryCapacity = 100; // Assuming 100% is full capacity
    if (output > input) {
        const timeLeft = battery / (output - input);
        return `${timeLeft.toFixed(2)} hours until empty`;
    } else if (input > output) {
        const timeToFull = (batteryCapacity - battery) / (input - output);
        return `${timeToFull.toFixed(2)} hours until full`;
    } else {
        return 'Battery level stable';
    }
}

function saveDataToLocalStorage(data) {
    const history = JSON.parse(localStorage.getItem('energyHistory')) || [];
    history.push({
        timestamp: new Date().toISOString(),
        data: data
    });
    localStorage.setItem('energyHistory', JSON.stringify(history));
}

function initialize() {
    setInterval(async () => {
        const data = await fetchData();
        if (data) {
            updateDisplay(data);
        }
    }, 60000); // Update every minute

    setInterval(async () => {
        const data = await fetchData();
        if (data) {
            saveDataToLocalStorage(data);
        }
    }, 3600000); // Save every hour
}

// Function to update the battery percentage and trigger animation
function updateBatteryPercentage(percentage) {
    const batteryChargeElement = document.getElementById('batteryCharge');
    
    batteryChargeElement.style.width = percentage + '%';

    if (percentage <= 25) {
        batteryChargeElement.style.backgroundColor = '#da1e2a';
    } else if (percentage <= 50) {
        batteryChargeElement.style.backgroundColor = '#da5c1e';
    } else if (percentage <= 75) {
        batteryChargeElement.style.backgroundColor = '#dacc1e';
    } else {
        batteryChargeElement.style.backgroundColor = '#79da1e';
    }
}

function updateBatteryPercentageFromInput() {
    const percentageInput = document.getElementById('percentageInput');
    const percentage = parseInt(percentageInput.value);

    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
        updateBatteryPercentage(percentage);
    } else {
        alert('Please enter a valid percentage (0-100).');
    }
}

function calculateEnergyUsage() {
    const timeInput = document.getElementById('timeInput').value;
    const timeUnit = document.getElementById('timeUnit').value;
    const currentTime = new Date().getTime();
    let pastTime;

    if (timeUnit === 'hours') {
        pastTime = currentTime - timeInput * 3600000;
    } else if (timeUnit === 'days') {
        pastTime = currentTime - timeInput * 86400000;
    }

    const history = JSON.parse(localStorage.getItem('energyHistory')) || [];
    const filteredHistory = history.filter(record => new Date(record.timestamp).getTime() >= pastTime);
    
    let totalEnergy = 0;
    filteredHistory.forEach(record => {
        totalEnergy += record.data.input - record.data.output;
    });

    document.getElementById('energy-used').innerText = totalEnergy.toFixed(2);
}

function calculateEnergyUsageBetweenDates() {
    const startDate = new Date(document.getElementById('startDate').value).getTime();
    const endDate = new Date(document.getElementById('endDate').value).getTime();

    if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
        alert('Please enter valid dates.');
        return;
    }

    const history = JSON.parse(localStorage.getItem('energyHistory')) || [];
    const filteredHistory = history.filter(record => {
        const recordTime = new Date(record.timestamp).getTime();
        return recordTime >= startDate && recordTime <= endDate;
    });

    let totalEnergy = 0;
    filteredHistory.forEach(record => {
        totalEnergy += record.data.input - record.data.output;
    });

    document.getElementById('energy-used-between').innerText = totalEnergy.toFixed(2);
}

window.onload = initialize;
