import { LitElement, html, css, unsafeCSS } from "lit-element";
import "./mv-radio.js";
import "mv-container";

export class MvRadioDemo extends LitElement {
  static get properties() {
    return {
      numbersLabel: { type: String },
      numbersvalue: { type: String },
      lettersLabel: { type: String },
      lettersValue: { type: String },
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      .container {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      .group-container {
        width: 100%;
      }
      
      .selection-container {
        width: 100%;
      }
      
      mv-container {
        --mv-container-min-width: 450px;
        --mv-container-max-width: 450px;
        --mv-container-margin: 20px 20px;
        --mv-container-padding: 20px 30px; 
      }
      
      fieldset > label, label > input {
        cursor: pointer;
      }
      
      fieldset {
        width: 120px;
        margin-left: 10px;
        border:2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;	
        border-radius: 8px;
        color: #818181;
        margin-bottom: 20px;
      }
      
      legend {
        font-weight: 500;
        color: red;
      }
   `;
  }

  constructor() {
    super();
    this.numbersValue = "";
    this.numbersLabel = "";
    this.lettersValue = "";
    this.lettersLabel = "";
    this.numbers = [
      {label: "Item 1", checked: false, name: "numbers", value: 1 },
      {label: "Item 2", checked: false, name: "numbers", value: 2 },
      {label: "Item 3", checked: false, name: "numbers", value: 3 },
      {label: "Item 4", checked: false, name: "numbers", value: 4 },
      {label: "Item 5", checked: false, name: "numbers", value: 5 }
    ];

    this.letters = [
      {label: "Item A", checked: false, name: "letters", value: "A" },
      {label: "Item B", checked: false, name: "letters", value: "B" },
      {label: "Item C", checked: false, name: "letters", value: "C" },
      {label: "Item D", checked: false, name: "letters", value: "D" },
      {label: "Item E", checked: false, name: "letters", value: "E" },
      {label: "Item F", checked: false, name: "letters", value: "F" },
      {label: "Item G", checked: false, name: "letters", value: "G" },
      {label: "Item H", checked: false, disabled: true, name: "letters", value: "H" },
      {label: "Item I", checked: false, name: "letters", value: "I" },
      {label: "Item J", checked: false, name: "letters", value: "J" }
    ];
    this.theme = "light";
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label><input type="radio" name="theme" value="light" checked @change="${this.changeTheme}" />Light</label>
        <label><input type="radio" name="theme" value="dark" @change="${this.changeTheme}" />Dark</label>
      </fieldset>
      <div class="container">
        <mv-container .theme="${theme}">
          <h3>Radio group 1</h3>
          <div class="group-container">
            <mv-radio
              .theme="${theme}"
              .data="${this.numbers}"
              @radio-clicked="${this.handleNumbersClicked}"
            ></mv-radio>
          </div>
          <div class="selection-container">
            Selection: ${this.numbersValue}
          </div>
        </mv-container>
        <mv-container .theme="${theme}">
          <h3>Radio group 2</h3>
          <div class="group-container">
            <mv-radio
              .theme="${theme}"
              .data="${this.letters}"
              @radio-clicked="${this.handleLettersClicked}"
              ></mv-radio>
          </div>
          <div class="selection-container">
            Selection: ${this.lettersValue}
          </div>
        </mv-container>
      </div>
    `;
  }

  handleNumbersClicked(event) {
    const { detail: { value, label } } = event;
    this.numbersValue = value;
    this.numbersLabel = label;
  }

  handleLettersClicked(event) {
    const { detail: { value, label } } = event;
    this.lettersValue = value;
    this.lettersLabel = label;
  }

  changeTheme = originalEvent => {
    const { target: { value } } = originalEvent;
    this.theme = value;
  };
}

customElements.define('mv-radio-demo', MvRadioDemo);
