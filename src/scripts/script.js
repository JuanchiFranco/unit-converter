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
    stones: 'stone',
    milligrams: 'milligram',
    cups: 'cup',
    tablespoons: 'tablespoon',
    teaspoons: 'teaspoon',
    'fluid ounces': 'fluid ounce',
    milliliters: 'milliliter',
    liters: 'liter',
    pints: 'pint',
    quarts: 'quart',
    gallons: 'gallon'
};

const WEIGHT_IN_GRAMS = {
    milligrams: 0.001,
    grams: 1,
    kilograms: 1000,
    ounces: 28.3495,
    pounds: 453.592,
    stones: 6350.29
};

const VOLUME_IN_ML = {
    teaspoons: 4.92892,
    tablespoons: 14.7868,
    'fluid ounces': 29.5735,
    cups: 236.588,
    milliliters: 1,
    liters: 1000,
    pints: 473.176,
    quarts: 946.353,
    gallons: 3785.41
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
    let fromUnit, toUnit, inputValue, result, ingredientName;

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
        case 'volume':
            fromUnit = document.getElementById('from-unit').value;
            toUnit = document.getElementById('to-unit').value;
            inputValue = parseFloat(document.getElementById('volume-input').value);
            if (isNaN(inputValue)) {
                alert('Please enter a valid number');
                return;
            }
            result = convertVolume(fromUnit, toUnit, inputValue);
            break;
        case 'cooking': {
            fromUnit = document.getElementById('from-unit').value;
            toUnit = document.getElementById('to-unit').value;
            inputValue = parseFloat(document.getElementById('cooking-input').value);
            if (isNaN(inputValue)) {
                alert('Please enter a valid number');
                return;
            }
            const ingredient = document.getElementById('ingredient');
            const selectedIngredient = ingredient.options[ingredient.selectedIndex];
            ingredientName = selectedIngredient.text.toLowerCase();
            result = convertCooking(Number(selectedIngredient.dataset.gramsPerCup), fromUnit, toUnit, inputValue);
            break;
        }
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
    const ofIngredient = ingredientName ? ` of ${ingredientName}` : '';
    resultText.textContent = `${inputValue} ${unitLabel(fromUnit, inputValue)}${ofIngredient} is equal to `;
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

function convertByFactor(factors, fromUnit, toUnit, inputValue) {
    if (!factors[fromUnit] || !factors[toUnit]) {
        throw new Error('Invalid conversion units');
    }
    return inputValue * factors[fromUnit] / factors[toUnit];
}

function convertWeight(fromUnit, toUnit, inputValue) {
    return convertByFactor(WEIGHT_IN_GRAMS, fromUnit, toUnit, inputValue);
}

function convertVolume(fromUnit, toUnit, inputValue) {
    return convertByFactor(VOLUME_IN_ML, fromUnit, toUnit, inputValue);
}

// Volume units go through the ingredient's density (grams per ml); weight units are already in grams.
function convertCooking(gramsPerCup, fromUnit, toUnit, inputValue) {
    const gramsPerMl = gramsPerCup / VOLUME_IN_ML.cups;
    const gramsPerUnit = { ...WEIGHT_IN_GRAMS };
    Object.keys(VOLUME_IN_ML).forEach(unit => {
        gramsPerUnit[unit] = VOLUME_IN_ML[unit] * gramsPerMl;
    });
    return convertByFactor(gramsPerUnit, fromUnit, toUnit, inputValue);
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
