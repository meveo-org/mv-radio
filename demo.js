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
      theme: { type: String, attribute: true },
      checked: { type: Boolean, attribute: false, reflect: true },
      horizontalRadioList: { type: Array, attribute: false },
      verticalRadioList: { type: Array, attribute: false },
      value: { type: String, attribute: false, reflect: true },
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
        --mv-container-min-width: 350px;
        --mv-container-max-width: 350px;
        --mv-container-margin: 20px 20px;
        --mv-container-padding: 20px 30px;
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
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

      .radio-item {
        margin-right: 10px;
      }

      .value {
        padding: 3px 10px;
        margin-left: 20px;
        font-size: 16px;
        color: #df013a;
        background-color: #f8e0e0;
        line-height: 18px;
        width: 50px;
        display: inline-block;
      }

      .value.checked {
        color: #088a29;
        background-color: #cef6ce;
      }

      .vertical-single {
        list-style-type: none;
        margin-bottom: 12px;
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
      { label: "Item 1", checked: false, name: "numbers", value: 1 },
      { label: "Item 2", checked: false, name: "numbers", value: 2 },
      { label: "Item 3", checked: false, name: "numbers", value: 3 },
      { label: "Item 4", checked: false, name: "numbers", value: 4 },
      { label: "Item 5", checked: false, name: "numbers", value: 5 },
    ];

    this.letters = [
      { label: "Item A", checked: false, name: "letters", value: "A" },
      { label: "Item B", checked: false, name: "letters", value: "B" },
      { label: "Item C", checked: false, name: "letters", value: "C" },
      { label: "Item D", checked: false, name: "letters", value: "D" },
      { label: "Item E", checked: false, name: "letters", value: "E" },
      { label: "Item F", checked: false, name: "letters", value: "F" },
      { label: "Item G", checked: false, name: "letters", value: "G" },
      {
        label: "Item H",
        checked: false,
        disabled: true,
        name: "letters",
        value: "H",
      },
      { label: "Item I", checked: false, name: "letters", value: "I" },
      { label: "Item J", checked: false, name: "letters", value: "J" },
    ];
    this.theme = "light";
    this.checked = false;
    this.value = "NO";
    this.horizontalRadioList = [
      { checked: true, value: "A", id: 1, label: "Item A" },
      { checked: false, value: "B", id: 2, label: "Item B" },
      { checked: true, value: "C", id: 3, disabled: true, label: "Item C", noToggle: true },
      { checked: false, value: "D", id: 4, disabled: true, label: "Item D" },
      { checked: false, value: "E", id: 5, label: "Item E" },
    ];

    this.verticalRadioList = [
      { checked: true, value: "A", id: 1, label: "Item A" },
      { checked: false, value: "B", id: 2, label: "Item B" },
      {
        checked: true,
        value: "C",
        id: 3,
        disabled: true,
        label: "Item C (no-toggle)",
        noToggle: true,
      },
      { checked: false, value: "D", id: 4, disabled: true, label: "Item D" },
      { checked: false, value: "E", id: 5, label: "Item E" },
    ];
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label
          ><input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light</label
        >
        <label
          ><input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark</label
        >
      </fieldset>
      <div class="container">
        <mv-container .theme="${theme}">
          <h2>Type: Single</h2>
          <h3>Single</h3>
          <mv-radio
            type="single"
            theme="${theme}"
            .value="${{ isChecked: !this.checked }}"
            ?checked="${this.checked}"
            @radio-clicked="${this.handleClickRadio}"
          ></mv-radio>
          <div class="value${this.checked ? " checked" : ""}">
            ${this.value}
          </div>

          <h3>Horizontal</h3>
          ${this.horizontalRadioList.map(
            (item) => html`
              <span class="radio-item">
                <mv-radio
                  id="${item.id}"
                  type="single"
                  theme="${theme}"
                  ?checked="${item.checked}"
                  ?disabled="${item.disabled}"
                  ?no-toggle="${item.noToggle}"
                  .value="${item.value}"
                  @radio-clicked="${this.handleClickHorizontalRadio}"
                ></mv-radio>
              </span>
            `
          )}

          <h3>Vertical</h3>
          <ul>
            ${this.verticalRadioList.map(
              (item) => html`
                <li class="vertical-single">
                  <mv-radio
                    id="${item.id}"
                    type="single"
                    theme="${theme}"
                    ?checked="${item.checked}"
                    ?disabled="${item.disabled}"
                    ?no-toggle="${item.noToggle}"
                    .value="${item.value}"
                    .label="${item.label}"
                    @radio-clicked="${this.handleClickVerticalRadio}"
                  ></mv-radio>
                </li>
              `
            )}
          </ul>
          Selection:
          ${this.verticalRadioList.find((item) => item.checked).value}
        </mv-container>
        <mv-container .theme="${theme}">
          <h2>Type: Multiple</h2>
          <h3>Radio group 1</h3>
          <div class="group-container">
            <mv-radio
              theme="${theme}"
              .data="${this.numbers}"
              @radio-clicked="${this.handleNumbersClicked}"
            ></mv-radio>
          </div>
          <div class="selection-container">Selection: ${this.numbersValue}</div>
        </mv-container>
        <mv-container .theme="${theme}">
          <h2>Type: Multiple</h2>
          <h3>Radio group 2</h3>
          <div class="group-container">
            <mv-radio
              theme="${theme}"
              .data="${this.letters}"
              @radio-clicked="${this.handleLettersClicked}"
            ></mv-radio>
          </div>
          <div class="selection-container">Selection: ${this.lettersValue}</div>
        </mv-container>
      </div>
    `;
  }

  handleNumbersClicked(event) {
    const {
      detail: { value, label },
    } = event;
    this.numbersValue = value;
    this.numbersLabel = label;
  }

  handleLettersClicked(event) {
    const {
      detail: { value, label },
    } = event;
    this.lettersValue = value;
    this.lettersLabel = label;
  }

  changeTheme = (originalEvent) => {
    const {
      target: { value },
    } = originalEvent;
    this.theme = value;
  };

  handleClickRadio(event) {
    const {
      detail: { value, checked },
    } = event;
    this.value = value.isChecked ? "YES" : "NO";
    this.checked = checked;
  }

  handleClickHorizontalRadio(event) {
    const {
      detail: { id },
    } = event;
    this.horizontalRadioList = this.horizontalRadioList.map((item) => {
      if (item.id.toString() === id.toString()) {
        return { ...item, checked: true };
      } else {
        return { ...item, checked: false };
      }
    });
  }

  handleClickVerticalRadio(event) {
    const {
      detail: { id },
    } = event;
    this.verticalRadioList = this.verticalRadioList.map((item) => {
      if (item.id.toString() === id.toString()) {
        return { ...item, checked: true };
      } else {
        return { ...item, checked: false };
      }
    });
  }
}

customElements.define("mv-radio-demo", MvRadioDemo);
