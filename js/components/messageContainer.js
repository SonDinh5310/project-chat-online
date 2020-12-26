const $template = document.createElement("template");

$template.innerHTML = /*html */ `

    <style>
        #message-content {
            display: inline-block;
            font-family: Arial;
            font-size: 15px;
            padding: 10px;
            border-radius: 5px;
            background-color: #1995ad;
            color: white;
            max-width: 50%;
            word-break: break-word;
        }

        .owned {
          text-align: right;
        }
    </style>

    <div id="message-container">
        <span id='message-content'>Hello</span>
    </div>
`;

export default class MessageContainer extends HTMLElement {
  constructor(content, owned, dateModifed) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$messageContent = this.shadowRoot.getElementById("message-content");
    this.$messageContainer = this.shadowRoot.getElementById(
      "message-container"
    );

    this.setAttribute("content", content);
    this.setAttribute("owned", owned);
    this.setAttribute("date-modified", dateModifed);
  }

  static get observedAttributes() {
    return ["content", "owned", "date-modified"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "content") {
      this.$messageContent.innerHTML = newValue;
    } else if (attrName == "owned") {
      if (newValue == "true") {
        this.$messageContainer.className = "owned";
      }
    }
  }
}

window.customElements.define("message-container", MessageContainer);
