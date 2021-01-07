import { getCurrentUser } from "../utils.js";
import MessageContainer from "./messageContainer.js";

const $template = document.createElement("template");

$template.innerHTML = /*html */ `
    <style>
        #message-list {
            padding: 0 15px;
            overflow-y:scroll;
            height: 100%;
        }

        #message-list > * {
          margin-bottom: 10px;
        }
    </style>
    <div id="message-list"></div>
`;

export default class MessageList extends HTMLElement {
    constructor(data) {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$messageList = this.shadowRoot.getElementById("message-list");

        this.setAttribute("data", data);
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        let currentUser = getCurrentUser();

        if (attrName == "data") {
            let data = JSON.parse(newValue);

            data.sort(function (message_1, message_2) {
                let a = new Date(message_1.dateModified);
                let b = new Date(message_2.dateModified);

                return a - b;
            });

            this.$messageList.innerHTML = "";

            for (let messageData of data) {
                messageData.owned = currentUser.id === messageData.owner;

                let $message = new MessageContainer(
                    messageData.content,
                    messageData.owned,
                    messageData.dateModified
                );
                this.$messageList.appendChild($message);
            }
        }
    }
}
window.customElements.define("message-list", MessageList);
