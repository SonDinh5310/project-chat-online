const $template = document.createElement("template");

$template.innerHTML = /*html */ `
    <style>
        * {
            font-family: Arial;
        }

        #chat-container {
            background-color: #f1f1f2;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        #chat-info {
            font-size: 20px;
            padding: 15px 15px;
            border-bottom: 1px solid #cccccc;
        }

        #send-message-form {
            display: flex;
            padding: 15px;
            justify-content: space-between;
            align-items: center;
        }

        #message-content {
            width: calc(100% - 100px - 20px);
        }

        #send-message-btn {
            height: 40px;
            width: 120px;
            border: 1px solid #1995ad;
            background-color: #1995ad;
            border-radius: 5px;
            color: #ffffff;
        }

        message-list{
            height: calc(100% - 55px -70px)
        }
    </style>


    <div id="chat-container">
        <div id="chat-info">Nguyen Van A</div>

        <message-list></message-list>
        <form id="send-message-form">
            <input-wrapper id="message-content" label="" error="" type="text"></input-wrapper>
            <button id="send-message-btn">Send</button>
        </form>
    </div>
`;

let fakeMessageList = [
  { content: "xin chao", owned: true, dateModified: "2020/12/26" },
  { content: "do u speak English", owned: false, dateModified: "2020/12/26" },
  { content: "co", owned: true, dateModified: "2020/12/26" },
  { content: "English plz!", owned: false, dateModified: "2020/12/26" },
  { content: "ok man. Hi there", owned: true, dateModified: "2020/12/26" },
  { content: "chao cau", owned: false, dateModified: "2020/12/26" },
];

export default class ChatContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$chatInfo = this.shadowRoot.getElementById("chat-info");
    this.$messageList = this.shadowRoot.querySelector("message-list");
    this.$sendMessageForm = this.shadowRoot.getElementById("send-message-form");
    this.$messageContent = this.shadowRoot.getElementById("message-content");
  }

  connectedCallback() {
    this.$messageList.setAttribute("data", JSON.stringify(fakeMessageList));
  }
}

window.customElements.define("chat-container", ChatContainer);
