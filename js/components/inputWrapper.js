const $template = document.createElement("template");

$template.innerHTML = /*html */ `
<link rel="stylesheet" href="/css/inputWrapper.css" />
<div id="input-wrapper">
<label id="input-label" for="#input-main">Ten Dang Ky</label>
<input id="input-main" type="text">
<div id="input-error">Nhap vao ten</div>
</div>
`;

export default class InputWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$label = this.shadowRoot.getElementById("input-label");
    this.$main = this.shadowRoot.getElementById("input-main");
    this.$error = this.shadowRoot.getElementById("input-error");
  }

  static get observedAttributes() {
    return ["label", "type", "error", "value"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "label":
        this.$label.innerHTML = newValue;
        break;
      case "type":
        this.$main.type = newValue;
        break;
      case "error":
        this.$error.innerHTML = newValue;
        break;
      case "value":
        this.$main.value = newValue;
        break;
    }
  }

  value() {
    return this.$main.value;
  }
}

window.customElements.define("input-wrapper", InputWrapper);