const $template = document.createElement("template");

$template.innerHTML = /*html */ `
<style>

*{
    font-family: Arial;
}

#friend-container {
    padding: 15px;
    border: solid 1px #cccccc;
}
</style>
<div id="friend-container">
    <div id="friend-name">Son</div>
</div>
`;

export default class FriendContainer extends HTMLElement {
  constructor(name) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$friendName = this.shadowRoot.getElementById("friend-name");

    this.setAttribute("name", name);
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "name") {
      this.$friendName.innerHTML = newValue;
    }
  }
}

window.customElements.define("friend-container", FriendContainer);
