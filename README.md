# unit-converter

This is a proposed solution to the [Unit Converter](https://roadmap.sh/projects/unit-converter) from [roadmap.sh](https://roadmap.sh/).

![Unit Converter Screenshot](./public/cap-page.jpg)

## Requirements

Build a simple web page that will have different sections for different units of measurement. The user can input a value to convert, select the units to convert from and to, and view the converted value.

- The user can input a value to convert.
- The user can select the units to convert from and to.
- The user can view the converted value.
- The user can convert between different units of measurement like length, weight, temperature, etc (more given below).

## Prerequisites

- Node.js installed on your system.
- Basic knowledge of command-line usage.

## Usage

1. Navigate to the project directory:
    ```bash
    cd unit-converter
    ```

2. Serve the `src` folder with any static server (opening `index.html` directly won't work, because the converters are loaded with `fetch` and the assets use absolute paths):
    ```bash
    npx serve src
    ```

3. Open the printed local address in a browser and convert!!!
