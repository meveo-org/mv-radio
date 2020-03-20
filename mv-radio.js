import { LitElement, html, css } from 'lit-element';

export class MvRadio extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      // theme is either "light" or "dark", default: "light"
      theme: { type: String, attribute: true },

      // type is either "mutiple" or "single", default: "mutiple"
      type: { type: String, attribute: true },
      checked: { type: Boolean, attribute: true },
      disabled: { type: Boolean, attribute: true },
      label: { type: String, attribute: true },
      value: { type: Object, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        --font-size: var(--font-size-m, 10pt);
        --padding-left: var(--mv-radio-padding-left, 35px);
        --margin-bottom: var(--mv-radio-margin-bottom, 12px);
        --radio-height: var(--mv-radio-radio-height, 18px);
        --radio-width: var(--mv-radio-radio-width, 18px);
        --radio-light-background-color: var(--mv-radio-light-background-color, #FFFFFF);
        --radio-light-border: var(--mv-radio-light-border, 1px solid #4E686D);
        --radio-light-color: var(--mv-radio-light-color, #818181);
        --radio-light-hover-background-color: var(--mv-radio-light-hover-background-color, #FFFFFF);
        --radio-light-hover-border: var(--mv-radio-light-hover-border, 1px solid #1D9BC9);
        --radio-light-checked-background-color: var(--mv-radio-light-checked-background-color, #FFFFFF);
        --radio-light-checkmark-background-color: var(--mv-radio-light-checkmark-background-color, #1D9BC9);
        --radio-dark-color: var(--mv-radio-dark-color, #FFFFFF);
        --radio-dark-background-color: var(--mv-radio-dark-background-color, #3F4753);
        --radio-dark-border: var(--mv-radio-dark-border, 1px solid #FFF);
        --radio-dark-hover-background-color: var(--mv-radio-dark-hover-background-color, #656C75);
        --dark-dark-hover-border: var(--mv-radio-dark-hover-border, 1px solid #FFFFFF);
        --radio-dark-checked-background-color: var(--mv-radio-dark-checked-background-color, #3F4753);
        --radio-dark-checkmark-background-color: var(--mv-radio-dark-checkmark-background-color, #FFFFFF);
        --disabled-background: var(--mv-radio-disabled-background, none);
        --disabled-border: var(--mv-radio-disabled-border, 1px solid #C7C7C7);
        --disabled-color: var(--mv-radio-disabled-color, #C7C7C7);
      }

      .radio-group-container {
        text-align: left;
        padding: 10px;
      }

      .container {
        display: block;
        position: relative;
        padding-left: var(--padding-left);
        margin-bottom: var(--margin-bottom);
        cursor: pointer;
        font-size: var(--font-size);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: var(--radio-height);
        width: var(--radio-width);
        border-radius: 50%;
      }

      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      .container input:checked ~ .checkmark:after {
        display: block;
      }

      .container .checkmark:after {
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      .light {
        color: var(--radio-light-color);
      }

      .light.container .checkmark {
        background-color: var(--radio-light-background-color);
        border: var(--radio-light-border);
      }

      .light.container:hover input ~ .checkmark {
        background-color: var(--radio-light-hover-background-color);
        border: var(--radio-light-hover-border);
      }

      .light.container input:checked ~ .checkmark {
        background-color: var(--radio-light-checked-background-color);
      }

      .light.container .checkmark:after {
        background: var(--radio-light-checkmark-background-color);
      }

      .dark {
        color: var(--radio-dark-color);
      }

      .dark.container .checkmark {
        border: var(--radio-dark-border);
        background-color: var(--radio-dark-background-color);
      }

      .dark.container:hover input ~ .checkmark {
        background-color: var(--radio-dark-hover-background-color);
        border: var(--dark-dark-hover-border);
      }

      .dark.container input:checked ~ .checkmark {
        background-color: var(--radio-dark-checked-background-color);
      }

      .dark.container .checkmark:after {
        background: var(--radio-dark-checkmark-background-color);
      }
      
      .single {
        display: inline;
        margin: 0;
        padding-left: 20px;
      }
      
      .single input {
        display: none;
      }
      
      .single label {
        cursor: pointer;
      }
      
      .value {
        margin-left: 10px;
      }
      
      .container input:disabled ~ .checkmark {
        border: var(--disabled-border);
        pointer-events: none;
        background-color: var(--disabled-background);
      }
      
      .container:hover input:disabled ~ .checkmark {
        border: var(--disabled-border);
      }
      
      .container input:disabled + .value {
        color: var(--disabled-color);
      }
      
      .container.disabled {
        pointer-events: none;
      }
   `;
  }

  constructor() {
    super();
    this.theme = "light";
    this.type = "multiple";
    this.label = "";
    this.checked = false;
    this.disabled = false;
  }

  renderMutiRadio() {
    return html`<div class="radio-group-container">
      ${(this.data || []).map(item => html`
          <label class="container ${this.theme}">${item.label}
            <input
              type="radio"
              name="${item.name}"
              ?checked=${item.checked}
              ?disabled=${item.disabled}
              @click="${this.handleClick(item)}"
              >
            <span class="checkmark"></span>
          </label>
        `)
      }
    </div>`;
  }

  renderSingleRadio() {
    return html`
      <label class="container ${this.theme} single ${this.disabled ? "disabled" : ""}">
          ${this.checked
          ? html`
            <input
              id="single-radio"
              type="radio"
              checked="checked"
              ?disabled=${this.disabled}
              @click="${this.handleClickSingleRadio}"
            >`
          : html`
            <input
              id="single-radio"
              type="radio"
              ?disabled=${this.disabled}
              @click="${this.handleClickSingleRadio}"
            >
          `
          }
          ${this.label ? html`<span class="value">${this.label}</span>` : html``}
        <label class="checkmark" for="single-radio"></label>
      </label>
    `;
  }

  render() {
    if (this.type === "multiple") {
      return html`
        ${this.renderMutiRadio()}
      `;
    }
    if (this.type === "single") {
      return html`
        ${this.renderSingleRadio()}
      `;
    }
  }

  handleClick = (item) => () => {
    const { value, label } = item;
    this.dispatchEvent(
      new CustomEvent("radio-clicked", {
        detail: { label, value }
      })
    );
  };

  handleClickSingleRadio = originalEvent => {
    if (!this.disabled) {
      originalEvent.stopPropagation();
      const { value, id, checked, label } = this;
      this.dispatchEvent(
        new CustomEvent("radio-clicked", {
          detail: { value, id, label, checked: !checked, originalEvent }
        })
      );
    }
  }

}

customElements.define('mv-radio', MvRadio);
