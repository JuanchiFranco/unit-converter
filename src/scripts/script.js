let latestRequest = 0;

function announce(message) {
    document.getElementById('status').textContent = message;
}

function loadComponent(component, shouldAnnounce = false) {
    const request = ++latestRequest;
    fetch(`./Components/${component}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Component not found');
            }
            return response.text();
        })
        .then(html => {
            if (request !== latestRequest) return;
            document.getElementById('component-container').innerHTML = html;
            document.getElementById('component-container').style.display = 'block';
            document.querySelectorAll('.buttons-option').forEach(button => {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            });

            const activeButton = document.querySelector(`.buttons-option[data-converter="${component}"]`);
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-pressed', 'true');
            document.getElementById('result-container').style.display = 'none';
            initIngredientSearch();
            if (shouldAnnounce) announce(`${activeButton.textContent} converter loaded`);
        })
        .catch(() => {
            if (request !== latestRequest) return;
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

const LENGTH_IN_METERS = {
    meters: 1,
    kilometers: 1000,
    miles: 1609.344,
    feet: 0.3048,
    inches: 0.0254
};

const WEIGHT_IN_GRAMS = {
    milligrams: 0.001,
    grams: 1,
    kilograms: 1000,
    ounces: 28.349523125,
    pounds: 453.59237,
    stones: 6350.29318
};

const VOLUME_IN_ML = {
    teaspoons: 4.92892159375,
    tablespoons: 14.78676478125,
    'fluid ounces': 29.5735295625,
    cups: 236.5882365,
    milliliters: 1,
    liters: 1000,
    pints: 473.176473,
    quarts: 946.352946,
    gallons: 3785.411784
};

const ABSOLUTE_ZERO = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
};

function unitLabel(unit, value) {
    return Math.abs(value) === 1 && SINGULAR_UNITS[unit] ? SINGULAR_UNITS[unit] : unit;
}

// Two decimals from 1 upward; four significant digits below 1 so small results keep their precision (0.012, not 0.01);
// whole numbers from a million up so the result still fits on a phone screen.
function formatResult(value) {
    const abs = Math.abs(value);
    let options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (value !== 0 && abs < 1) {
        options = { maximumSignificantDigits: 4 };
    } else if (abs >= 1e6) {
        options = { maximumFractionDigits: 0 };
    }
    return new Intl.NumberFormat('en-US', options).format(value);
}

function convertUnits(event, option) {
    event.preventDefault();
    const input = document.getElementById(`${option}-input`);
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const inputValue = parseFloat(input.value);
    if (isNaN(inputValue)) {
        input.setCustomValidity('Please enter a valid number.');
        input.reportValidity();
        return;
    }

    let result;
    let ingredientName = '';

    switch (option) {
        case 'length':
            result = convertLength(fromUnit, toUnit, inputValue);
            break;
        case 'weight':
            result = convertWeight(fromUnit, toUnit, inputValue);
            break;
        case 'volume':
            result = convertVolume(fromUnit, toUnit, inputValue);
            break;
        case 'temperature':
            if (inputValue < ABSOLUTE_ZERO[fromUnit]) {
                input.setCustomValidity('Temperature cannot be below absolute zero.');
                input.reportValidity();
                return;
            }
            result = convertTemperature(fromUnit, toUnit, inputValue);
            break;
        case 'cooking': {
            const ingredient = document.getElementById('ingredient');
            const selectedIngredient = ingredient.options[ingredient.selectedIndex];
            ingredientName = selectedIngredient.hasAttribute('data-keep-case')
                ? selectedIngredient.text
                : selectedIngredient.text.charAt(0).toLowerCase() + selectedIngredient.text.slice(1);
            result = convertCooking(Number(selectedIngredient.dataset.gramsPerCup), fromUnit, toUnit, inputValue);
            break;
        }
        default:
            return;
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
    return convertByFactor(LENGTH_IN_METERS, fromUnit, toUnit, inputValue);
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
    const input = document.querySelector('#component-container input[id$="-input"]');
    if (input) input.focus();
}

// Lets people narrow the long ingredient list by typing; the select keeps the real value.
function initIngredientSearch() {
    const search = document.getElementById('ingredient-search');
    const select = document.getElementById('ingredient');
    if (!search || !select) return;

    const status = document.getElementById('ingredient-status');
    const groups = [...select.querySelectorAll('optgroup')].map(group => group.cloneNode(true));
    let lastChoice = select.options[select.selectedIndex].text;

    select.addEventListener('change', () => {
        if (select.value) lastChoice = select.options[select.selectedIndex].text;
    });

    search.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('cooking-input').focus();
        }
    });

    search.addEventListener('input', () => {
        const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
        const matches = option => words.every(word => option.text.toLowerCase().includes(word));
        let count = 0;

        select.replaceChildren();
        groups.forEach(group => {
            const kept = [...group.children].filter(matches);
            if (!kept.length) return;
            const filteredGroup = group.cloneNode(false);
            kept.forEach(option => filteredGroup.append(option.cloneNode(true)));
            select.append(filteredGroup);
            count += kept.length;
        });

        if (count === 0) {
            // An empty first option acts as the placeholder, so the required select blocks submitting.
            const none = document.createElement('option');
            none.value = '';
            none.textContent = 'No ingredients match';
            select.prepend(none);
        } else {
            const previous = words.length ? null : [...select.options].find(option => option.text === lastChoice);
            select.selectedIndex = previous ? previous.index : 0;
        }

        status.textContent = words.length ? (count ? `${count} ingredients match` : 'No ingredients match') : '';
    });
}

// Clear any custom validation message as soon as the user edits the form.
['input', 'change'].forEach(type => {
    document.addEventListener(type, event => {
        if (event.target.setCustomValidity) event.target.setCustomValidity('');
    });
});

document.querySelectorAll('.buttons-option').forEach(button => {
    button.addEventListener('click', () => loadComponent(button.dataset.converter, true));
});

document.addEventListener('submit', event => {
    const form = event.target.closest('form[data-converter]');
    if (form) convertUnits(event, form.dataset.converter);
});

document.getElementById('reset-button').addEventListener('click', resetForm);

loadComponent('length');
