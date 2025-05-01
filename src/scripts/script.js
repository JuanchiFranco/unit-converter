function loadComponent(component) {
    fetch(`./Components/${component}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Component not found');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('component-container').innerHTML = html;
            document.querySelectorAll('.buttons-option').forEach(button => {
                button.classList.remove('active');
            });

            document.querySelector(`[onClick="loadComponent('${component}')"]`).classList.add('active');
            document.getElementById('result-container').style.display = 'none';
        })
}

function convertUnits(event, option) {
    event.preventDefault();
    let fromUnit, toUnit, inputValue, result;

    switch (option) {
        case 'length':
            fromUnit = document.getElementById('from-unit').value;
            toUnit = document.getElementById('to-unit').value;
            inputValue = parseFloat(document.getElementById('length-input').value);
            if (isNaN(inputValue)) {
                alert('Please enter a valid number');
                return;
            }
            result = convertLength(fromUnit, toUnit, inputValue);
            break;
        case 'weight':
            fromUnit = document.getElementById('from-unit').value;
            toUnit = document.getElementById('to-unit').value;
            inputValue = parseFloat(document.getElementById('weight-input').value);
            if (isNaN(inputValue)) {
                alert('Please enter a valid number');
                return;
            }
            result = convertWeight(fromUnit, toUnit, inputValue);
            break;
        case 'temperature':
            fromUnit = document.getElementById('from-unit').value;
            toUnit = document.getElementById('to-unit').value;
            inputValue = parseFloat(document.getElementById('temperature-input').value);
            if (isNaN(inputValue)) {
                alert('Please enter a valid number');
                return;
            }

            result = convertTemperature(fromUnit, toUnit, inputValue);
            break;
        default:
            result = 'Invalid option';
    }

    document.getElementById('result-text').textContent = `${inputValue} ${fromUnit} is equal to ${result.toFixed(2)} ${toUnit}.`;
    document.getElementById('component-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

function convertLength(fromUnit, toUnit, inputValue) {
    const conversionRates = {
        meters: { meters: 1, kilometers: 0.001, miles: 0.000621371, feet: 3.28084, inches: 39.3701 },
        kilometers: { meters: 1000, kilometers: 1, miles: 0.621371, feet: 3280.84, inches: 39370.1 },
        miles: { meters: 1609.34, kilometers: 1.60934, miles: 1, feet: 5280, inches: 63360 },
        feet: { meters: 0.3048, kilometers: 0.0003048, miles: 0.000189394, feet: 1, inches: 12 },
        inches: { meters: 0.0254, kilometers: 0.0000254, miles: 0.000015783, feet: 0.0833333, inches: 1 }
    };

    if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
        return inputValue * conversionRates[fromUnit][toUnit];
    } else {
        throw new Error('Invalid conversion units');
    }
    
}

function convertTemperature(fromUnit, toUnit, inputValue) {
    const conversionRates = {
        celsius: {
            fahrenheit: (temp) => (temp * 9/5) + 32,
            kelvin: (temp) => temp + 273.15
        },
        fahrenheit: {
            celsius: (temp) => (temp - 32) * 5/9,
            kelvin: (temp) => (temp - 32) * 5/9 + 273.15
        },
        kelvin: {
            celsius: (temp) => temp - 273.15,
            fahrenheit: (temp) => (temp - 273.15) * 9/5 + 32
        }
    };

    if (fromUnit === toUnit) {
        return inputValue;
    }

    if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
        return conversionRates[fromUnit][toUnit](inputValue);
    } else {
        throw new Error('Invalid conversion units');
    }
}

function convertWeight(fromUnit, toUnit, inputValue) {
    const weightConversionRates = {
        grams: { grams: 1, kilograms: 0.001, pounds: 0.00220462, ounces: 0.035274, stones: 0.000157473 },
        kilograms: { grams: 1000, kilograms: 1, pounds: 2.20462, ounces: 35.274, stones: 0.157473 },
        pounds: { grams: 453.592, kilograms: 0.453592, pounds: 1, ounces: 16, stones: 0.0714286 },
        ounces: { grams: 28.3495, kilograms: 0.0283495, pounds: 0.0625, ounces: 1, stones: 0.00446429 },
        stones: { grams: 6350.29, kilograms: 6.35029, pounds: 14, ounces: 224, stones: 1 }
    };

    if (weightConversionRates[fromUnit] && weightConversionRates[fromUnit][toUnit]) {
        return inputValue * weightConversionRates[fromUnit][toUnit];
    } else {
        throw new Error('Invalid conversion units');
    }
}

function resetForm() {
    document.getElementById('component-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
}