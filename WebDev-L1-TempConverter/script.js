/* Temperature Converter
   Converts between Celsius, Fahrenheit and Kelvin.
   Validates input and rejects values below absolute zero. */

(function () {
  "use strict";

  // Elements
  var form = document.getElementById("converter");
  var input = document.getElementById("temp");
  var errorEl = document.getElementById("error");
  var clearBtn = document.getElementById("clearBtn");
  var results = document.getElementById("results");
  var mercury = document.getElementById("mercury");

  var output = {
    C: document.getElementById("out-c"),
    F: document.getElementById("out-f"),
    K: document.getElementById("out-k")
  };
  var rows = {
    C: document.getElementById("row-c"),
    F: document.getElementById("row-f"),
    K: document.getElementById("row-k")
  };

  // Constants
  var SYMBOL = { C: "\u00B0C", F: "\u00B0F", K: "K" };
  var ABSOLUTE_ZERO = {
    C: "-273.15 \u00B0C",
    F: "-459.67 \u00B0F",
    K: "0 K"
  };
  var ABSOLUTE_ZERO_C = -273.15;
  var TOLERANCE = 1e-9;
  var MAX_ABS_VALUE = 1e9;
  var NUMBER_PATTERN = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;

  // Gauge range: -50 to 150 degrees Celsius
  var GAUGE_MIN_C = -50;
  var GAUGE_MAX_C = 150;

  var formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Conversion helpers
  function toCelsius(value, unit) {
    if (unit === "F") return (value - 32) * 5 / 9;
    if (unit === "K") return value - 273.15;
    return value;
  }

  function fromCelsius(c) {
    return {
      C: c,
      F: c * 9 / 5 + 32,
      K: c + 273.15
    };
  }

  function formatValue(n, unit) {
    // Avoid showing "-0.00"
    if (Math.abs(n) < 0.005) n = 0;
    return formatter.format(n) + " " + SYMBOL[unit];
  }

  function selectedUnit() {
    return form.elements.unit.value;
  }

  // UI helpers
  function showError(message) {
    errorEl.textContent = message;
    input.setAttribute("aria-invalid", "true");
    results.hidden = true;
  }

  function clearError() {
    errorEl.textContent = "";
    input.removeAttribute("aria-invalid");
  }

  function updateGauge(c) {
    var ratio = (c - GAUGE_MIN_C) / (GAUGE_MAX_C - GAUGE_MIN_C);
    ratio = Math.max(0, Math.min(1, ratio));
    mercury.style.width = (ratio * 100).toFixed(1) + "%";
  }

  function showResults(c, unit) {
    var values = fromCelsius(c);

    ["C", "F", "K"].forEach(function (u) {
      output[u].textContent = formatValue(values[u], u);
      rows[u].classList.toggle("source", u === unit);
    });

    results.hidden = false;
    // Start from empty so the fill animates when results first appear
    requestAnimationFrame(function () {
      updateGauge(c);
    });
  }

  // Main handler
  function convert() {
    clearError();

    var raw = input.value.trim().replace("\u2212", "-");
    var unit = selectedUnit();

    if (raw === "") {
      showError("Enter a temperature to convert.");
      return;
    }

    if (!NUMBER_PATTERN.test(raw)) {
      showError("Use numbers only, for example 25 or -40.5.");
      return;
    }

    var value = Number(raw);

    if (!isFinite(value) || Math.abs(value) > MAX_ABS_VALUE) {
      showError("That number is too large. Try a value below 1,000,000,000.");
      return;
    }

    var celsius = toCelsius(value, unit);

    if (celsius < ABSOLUTE_ZERO_C - TOLERANCE) {
      showError(
        raw + " " + SYMBOL[unit] + " is below absolute zero. " +
        "The lowest possible value is " + ABSOLUTE_ZERO[unit] + "."
      );
      return;
    }

    showResults(celsius, unit);
  }

  // Events
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    convert();
  });

  // Re-convert when the unit changes, if there is something to convert
  form.addEventListener("change", function (event) {
    if (event.target.name === "unit" && input.value.trim() !== "") {
      convert();
    }
  });

  // Remove the error message as soon as the person starts correcting the input
  input.addEventListener("input", clearError);

  clearBtn.addEventListener("click", function () {
    form.reset();
    clearError();
    results.hidden = true;
    mercury.style.width = "0";
    input.focus();
  });
})();