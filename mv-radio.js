import { LitElement, html, css } from "lit-element";

export class MvRadio extends LitElement {
  static get properties() {
    return {
      data: { type: Array },
      // theme is either "light" or "dark", default: "light"
      theme: { type: String, attribute: true },

      // type is either "multiple" or "single", default: "multiple"
      type: { type: String, attribute: true },
      checked: { type: Boolean, attribute: true },
      disabled: { type: Boolean, attribute: true },
      noToggle: { type: Boolean, attribute: "no-toggle" },
      label: { type: String, attribute: true },
      value: { type: Object, attribute: true },
      id: { type: Object, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        --font-size: var(--font-size-m, 10pt);
        --padding-left: var(--mv-radio-padding-left, 35px);
        --margin-bottom: var(--mv-radio-margin-bottom, 12px);
        --radio-size: var(--mv-radio-radio-size, 18px);
        --checkmark-size: var(--mv-radio-checkmark-size, 12px);
        --checkmark-top: calc((var(--radio-size) - var(--checkmark-size)) / 2);
        --radio-light-background-color: var(
          --mv-radio-light-background-color,
          #ffffff
        );
        --radio-light-border: var(--mv-radio-light-border, 1px solid #4e686d);
        --radio-light-color: var(--mv-radio-light-color, #818181);
        --radio-light-hover-background-color: var(
          --mv-radio-light-hover-background-color,
          #ffffff
        );
        --radio-light-hover-border: var(
          --mv-radio-light-hover-border,
          1px solid #1d9bc9
        );
        --radio-light-checked-background-color: var(
          --mv-radio-light-checked-background-color,
          #ffffff
        );
        --radio-light-checkmark-background-color: var(
          --mv-radio-light-checkmark-background-color,
          #1d9bc9
        );
        --radio-dark-color: var(--mv-radio-dark-color, #ffffff);
        --radio-dark-background-color: var(
          --mv-radio-dark-background-color,
          #3f4753
        );
        --radio-dark-border: var(--mv-radio-dark-border, 1px solid #fff);
        --radio-dark-hover-background-color: var(
          --mv-radio-dark-hover-background-color,
          #656c75
        );
        --dark-dark-hover-border: var(
          --mv-radio-dark-hover-border,
          1px solid #ffffff
        );
        --radio-dark-checked-background-color: var(
          --mv-radio-dark-checked-background-color,
          #3f4753
        );
        --radio-dark-checkmark-background-color: var(
          --mv-radio-dark-checkmark-background-color,
          #ffffff
        );
        --disabled-background: var(--mv-radio-disabled-background, none);
        --disabled-border: var(--mv-radio-disabled-border, 1px solid #c7c7c7);
        --disabled-color: var(--mv-radio-disabled-color, #c7c7c7);
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
        height: var(--radio-size);
        width: var(--radio-size);
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
        top: var(--checkmark-top);
        left: var(--checkmark-top);
        width: var(--checkmark-size);
        height: var(--checkmark-size);
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

      .light.container input.no-toggle:disabled ~ .checkmark {
        border: var(--mv-radio-light-border);
      }

      .light.container input.no-toggle:disabled:checked ~ .checkmark:after {
        top: var(--checkmark-top);
        left: var(--checkmark-top);
        width: calc(var(--checkmark-size) - 2px);
        height: calc(var(--checkmark-size) - 2px);
        background-color: var(--radio-light-checkmark-background-color);
        border-color: var(--radio-light-checkmark-background-color);
        pointer-events: none;
        border-radius: 50%;
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

      .dark.container input:disabled:checked ~ .checkmark {
        border: var(--mv-radio-dark-border);
      }

      .dark.container input:disabled:checked ~ .checkmark:after {
        top: var(--checkmark-top);
        left: var(--checkmark-top);
        width: calc(var(--checkmark-size) - 2px);
        height: calc(var(--checkmark-size) - 2px);
        background-color: var(--radio-dark-checkmark-background-color);
        border-color: var(--radio-dark-checkmark-background-color);
        pointer-events: none;
        border-radius: 50%;
      }

      .single {
        display: inline;
        margin: 0;
        padding-left: calc(var(--radio-size) + 2px);
      }

      .single input {
        display: none;
      }

      .single label {
        cursor: pointer;
      }

      .label {
        margin-left: 10px;
      }

      .container input:disabled ~ .checkmark,
      .container:hover input:disabled ~ .checkmark,
      .container input:disabled ~ .checkmark:after,
      .container input:checked:disabled ~ .checkmark {
        border: var(--disabled-border);
        pointer-events: none;
        background-color: var(--disabled-background);
      }

      .container input:disabled + .label,
      .container.disabled {
        cursor: context-menu;
        color: var(--disabled-color);
      }

      .light.container input.no-toggle:disabled + .label {
        color: var(--mv-radio-light-color);
      }

      .dark.container input.no-toggle:disabled + .label {
        color: var(--mv-radio-dark-color);
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
    return html``;
  }

  renderSingleRadio() {
    return html``;
  }

  render() {
    if (this.type === "multiple") {
      return html`
        <div class="radio-group-container">
          ${(this.data || []).map(
            (item) => html`
              <label
                class="container ${this.theme} ${item.disabled
                  ? "disabled"
                  : ""}"
              >
                ${item.label}
                <input
                  type="radio"
                  name="${item.name}"
                  ?checked=${item.checked}
                  ?disabled=${item.disabled}
                  @click="${this.handleClick(item)}"
                />
                <span class="checkmark"></span>
              </label>
            `
          )}
        </div>
      `;
    }
    if (this.type === "single") {
      const disabledClass = this.disabled ? " disabled" : "";
      const toggleClass = this.noToggle ? " no-toggle" : "";
      return html`
        <label class="container single ${this.theme}${disabledClass}">
          ${this.checked
            ? html`
                <input
                  id="single-radio"
                  type="radio"
                  checked="checked"
                  class="${toggleClass}"
                  ?disabled=${this.disabled}
                  @click="${this.handleClickSingleRadio}"
                />
              `
            : html`
                <input
                  id="single-radio"
                  type="radio"
                  class="${toggleClass}"
                  ?disabled=${this.disabled}
                  @click="${this.handleClickSingleRadio}"
                />
              `}
          ${this.label
            ? html`<span class="label">${this.label}</span>`
            : html``}
          <span class="checkmark"></span>
          <slot></slot>
        </label>
      `;
    }
  }

  handleClick = (item) => () => {
    const { value, label } = item;
    this.dispatchEvent(
      new CustomEvent("radio-clicked", {
        detail: { label, value },
      })
    );
  };

  handleClickSingleRadio = (originalEvent) => {
    if (!this.disabled) {
      originalEvent.stopPropagation();
      const { value, id, label } = this;
      this.dispatchEvent(
        new CustomEvent("radio-clicked", {
          detail: { value, id, label, checked: !this.checked, originalEvent },
        })
      );
    }
  };
}

customElements.define("mv-radio", MvRadio);
