import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './mv-radio.js';

export class MvRadioDemo extends LitElement {

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
      }

      .group-container {
        width: 100%;
      }
      .selection-container {
        width: 100%;
      }

      .first-group {
        width: 30%;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 5px;
      }

      .second-group {
        width: 30%;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 5px;
        margin-left: 20px;
      }
   `;
  }

  static get properties() {
    return {
      numbersLabel: { type: String },
      numbersvalue: { type: String },
      lettersLabel: { type: String },
      lettersValue: { type: String },

    };
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
  }

  render() {
    return html`
      <div class="container">
        <div class="first-group">
          <h3>Radio group 1 (Light)</h3>
          <div class="group-container">
            <mv-radio
              mode="light"
              .data="${this.numbers}"
              @radio-clicked="${this.handleNumbersClicked}"
              ></mv-radio>
          </div>
          <div class="selection-container">
            Selection: ${this.numbersValue}
          </div>
        </div>
        <div class="second-group">
          <h3>Radio group 2 (Dark)</h3>
          <div class="group-container">
            <mv-radio
              mode="dark"
              .data="${this.letters}"
              @radio-clicked="${this.handleLettersClicked}"
              ></mv-radio>
          </div>
          <div class="selection-container">
            Selection: ${this.lettersValue}
          </div>
        </div>
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
}

customElements.define('mv-radio-demo', MvRadioDemo);
