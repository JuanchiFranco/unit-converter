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
            document.getElementById('component-container').style.display = 'block';
            document.querySelectorAll('.buttons-option').forEach(button => {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            });

            const activeButton = document.querySelector(`[onClick="loadComponent('${component}')"]`);
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-pressed', 'true');
            document.getElementById('result-container').style.display = 'none';
        })
        .catch(() => {
            const container = document.getElementById('component-container');
            container.style.display = 'block';
            container.innerHTML = '<p class="load-error" role="alert">This converter could not be loaded. Check your connection and try again.</p>';
            document.getElementById('result-container').style.display = 'none';
        });
}

const SINGULAR_UNITS = {
    meters: 'meter',
    kilometers: 'kilometer',
    miles: 'mile',
    feet: 'foot',
    inches: 'inch',
    grams: 'gram',
    kilograms: 'kilogram',
    pounds: 'pound',
    ounces: 'ounce',
    stones: 'stone'
};

const ABSOLUTE_ZERO = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
};

function unitLabel(unit, value) {
    return Math.abs(value) === 1 && SINGULAR_UNITS[unit] ? SINGULAR_UNITS[unit] : unit;
}

// Two decimals from 1 upward; four significant digits below 1 so small results keep their precision (0.012, not 0.01).
function formatResult(value) {
    const isSmall = value !== 0 && Math.abs(value) < 1;
    const options = isSmall
        ? { maximumSignificantDigits: 4 }
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return new Intl.NumberFormat('en-US', options).format(value);
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
            if (inputValue < ABSOLUTE_ZERO[fromUnit]) {
                const temperatureInput = document.getElementById('temperature-input');
                temperatureInput.setCustomValidity('Temperature cannot be below absolute zero.');
                temperatureInput.reportValidity();
                return;
            }

            result = convertTemperature(fromUnit, toUnit, inputValue);
            break;
        default:
            result = 'Invalid option';
    }

    const resultText = document.getElementById('result-text');
    resultText.textContent = `${inputValue} ${unitLabel(fromUnit, inputValue)} is equal to `;
    const resultValue = document.createElement('strong');
    resultValue.className = 'result-value';
    resultValue.textContent = `${formatResult(result)} ${unitLabel(toUnit, result)}`;
    resultText.append(resultValue);
    document.getElementById('component-container').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.focus();
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
    const input = document.querySelector('#component-container input');
    if (input) input.focus();
}

// Clear any custom validation message as soon as the user edits the form.
['input', 'change'].forEach(type => {
    document.addEventListener(type, event => {
        if (event.target.setCustomValidity) event.target.setCustomValidity('');
    });
});

loadComponent('length');
