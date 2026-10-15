# Temperature Converter

A clean, responsive web app that converts temperatures between Celsius, Fahrenheit and Kelvin. Built with HTML5, CSS3 and vanilla JavaScript, with no libraries or frameworks.

**Live demo:** https://kashishmaurya710-oss.github.io/OIBSIP/WebDev-L1-TempConverter/

Part of the Oasis Infobyte Web Development & Designing internship (Level 1, Task 3).

## Features

- Number input with validation: empty and non-numeric values show a clear error message
- Unit selector for Celsius, Fahrenheit and Kelvin
- Convert button that shows all three units at once, with the input unit highlighted
- Absolute zero check: values below -273.15 °C, -459.67 °F or 0 K are rejected with a helpful message
- Thermometer gauge that fills to show where the temperature sits between -50 °C and 150 °C
- Results update automatically when the unit is changed
- Clear button that resets the form
- Keyboard friendly: press Enter to convert, visible focus outlines on every control
- Accessible: labelled inputs, error messages announced to screen readers, reduced motion respected
- Responsive layout that works from small phones to desktop
- Light and dark appearance that follows the device setting

## Tech stack

| Layer | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 (custom properties, Flexbox, Grid) |
| Logic | JavaScript (ES5-compatible, no dependencies) |
| Hosting | GitHub Pages |

## Conversion formulas

| From | To Celsius | To Fahrenheit | To Kelvin |
| --- | --- | --- | --- |
| Celsius | C | C × 9/5 + 32 | C + 273.15 |
| Fahrenheit | (F - 32) × 5/9 | F | (F - 32) × 5/9 + 273.15 |
| Kelvin | K - 273.15 | (K - 273.15) × 9/5 + 32 | K |

## Test cases

| Input | Unit | Expected result |
| --- | --- | --- |
| 25 | Celsius | 77.00 °F and 298.15 K |
| 52 | Fahrenheit | 11.11 °C and 284.26 K |
| 0 | Kelvin | -273.15 °C and -459.67 °F |
| abc | any | Error: use numbers only |
| (empty) | any | Error: enter a temperature |
| -300 | Celsius | Error: below absolute zero |
| -1 | Kelvin | Error: below absolute zero |

## Project structure

```
WebDev-L1-TempConverter/
├── index.html    Page structure
├── style.css     Styles, themes and responsive layout
├── script.js     Validation and conversion logic
└── README.md     Project documentation
```

## Run locally

1. Download or clone the repository.
2. Open `WebDev-L1-TempConverter/index.html` in any modern browser.

No build step or installation is needed.

## Author

Kashish Maurya
B.Tech Computer Science & Engineering, School of Management Sciences, Lucknow
LinkedIn: https://www.linkedin.com/in/kashish-maurya-706898379/
GitHub: https://github.com/kashishmaurya710-oss