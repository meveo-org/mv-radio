# mv-radio

MvRadio is a Meveo radio component (based on lit-element) that renders a radio buttons

## Features
- Renders the radio buttons using a single component tag
- Simple interface
- Dispatches a custom event when radio button is clicked
- Written in vanila javascript


## Quick Start

To experiment with the MvRadio component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the radio button demo component in `demo.js` file

The `mv-radio` has:
 - 2 `type` variants:
```
single, multiple
```
- 2 `theme` variants:
```
dark, light
```

## Sample usage
- `multiple`:
```html
<mv-radio
  theme="light"        // theme values - can be light or dark
  .data="${[{label: "Label 1", checked: true, disabled: false, name: "groupName", value: "1" }]}"       // Array of objects for the radio buttons
  @radio-clicked="${this.handleRadioClicked}"       // custom event dispatched when the radio button is clicked  
></mv-radio>
```
- `single`:
```html
<mv-radio
  id="${item.id}"               // id for the radio
  type="single"                 // use the single or multiple radio
  label="${item.label}"         // string label for the radio
  theme="${theme}"              // the light and dark theme mode
  .value="${item.value}"        // value can be any object
  ?checked="${item.checked}"    // boolean that determines whether the radio is selected or not
  ?disabled="${item.disabled}"  // boolean that determines whether the radio is used or not
  ?no-toggle="${item.noToggle}" // boolean that disables toggling of the radio
  @radio-clicked="${this.handleClickSecondRadio}"  // custom event dispatched when the radio button is clicked
></mv-radio>
```


You can also check this [demo](https://radio.meveo.org/)
