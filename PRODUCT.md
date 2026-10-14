# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

General public making a fast, one-off conversion (cooking, travel, homework) on phone or desktop. They arrive with a value and two units in mind and want the answer in seconds.

## Product Purpose

A simple web page with sections for different measurement types. The user enters a value, picks the units to convert from and to, and sees the converted value. Success is a correct answer with minimal steps. Built as a solution to the roadmap.sh Unit Converter project (https://roadmap.sh/projects/unit-converter) and deployed at https://unit-converter-beryl-delta.vercel.app/.

## Positioning

Small and focused: a quick-lookup converter with no accounts, no backend, and no clutter. Scope stays narrow (current categories plus possibly a few more such as volume or area) rather than becoming a broad toolkit.

## Operating Context

Single-page static site. Visitors pick a category (Length, Weight, Volume, Cooking, Temperature), the category's form loads in place, they submit, and the result appears with a Reset action.

## Capabilities and Constraints

- Categories today: Length, Weight (milligrams to stones), Volume (US cups, spoons, fluid ounces, pints, quarts, gallons, ml, liters), Cooking (ingredient-aware cup/spoon/ml to weight conversions for ~500 ingredients in 13 groups with a type-to-filter search above the list, using approximate grams-per-US-cup values stored on each ingredient option in `src/Components/cooking.html`; data from CookBook Manager (CC BY 4.0), USDA FoodData Central, King Arthur Baking and FAO/INFOODS, credited in the UI and README), and Temperature.
- Cooking is aimed at chefs and home cooks; its cup-to-weight values are approximations and are labelled as such in the UI.
- Existing stack is plain HTML, CSS, and JavaScript with no build step and no framework (`src/index.html`, `src/styles.css`, `src/scripts/script.js`, category forms in `src/Components/`).
- Result is shown to two decimal places (four significant digits when below 1, whole numbers from a million up) with a Reset button.
- Whether to add more categories, a framework, or an English/other-language split is undecided; no i18n or accessibility standard was specified.

## Brand Commitments

Keep the name "Unit Converter" and the existing logo (`public/logoconverter.png`, `src/assets/logoconverter.png`) as the brand mark.

## Evidence on Hand

- Screenshot of the current page: `public/cap-page.jpg`.
- No testimonials, usage data, or user research exist; do not fabricate any.

## Product Principles

1. Speed to answer: the fewest possible steps from opening the page to reading the result.
2. Stay small: resist features that turn a quick lookup into a toolkit.
3. Correctness over decoration: conversions and rounding must be trustworthy and clearly stated.
4. Works anywhere: usable one-handed on a phone as well as on desktop.
