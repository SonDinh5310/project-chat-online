import { getCurrentUser, getDataFromDoc, getDatafromDocs } from "../utils.js";
import LoginForm from "./loginForm.js";

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
            padding: 15px;
            border-bottom: 1px solid #cccccc;
        }

        #send-message-form {
            display: flex;
            padding: 0px 15px;
            justify-content: space-between;
            align-items: center;
        }

        #message-content {
            width: calc(100% - 100px - 20px);

        }

        #send-message-btn {
            height: 40px;
            width: 100px;
            border: 1px solid #1995ad;
            background-color: #1995ad;
            border-radius: 5px;
            color: #ffffff;
        }

        message-list{
            height: calc(100% - 55px - 70px);
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

// let fakeMessageList = [
//     { content: "xin chao", owned: true, dateModified: "2020/12/26" },
//     { content: "do u speak English", owned: false, dateModified: "2020/12/26" },
//     { content: "co", owned: true, dateModified: "2020/12/26" },
//     { content: "English plz!", owned: false, dateModified: "2020/12/26" },
//     { content: "ok man. Hi there", owned: true, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
//     { content: "chao cau", owned: false, dateModified: "2020/12/26" },
// ];

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

  static get observedAttributes() {
    return ["current-chat"];
  }

  connectedCallback() {
    // this.$messageList.setAttribute("data", JSON.stringify(fakeMessageList));
    this.$sendMessageForm.onsubmit = (event) => {
      event.preventDefault();
      let content = this.$messageContent.value();
      if (content !== "") {
        this.sendMessage(content);
        this.$messageContent.value("");
      } else {
        alert("nhap vao noi dung tin nhan");
      }
    };
  }

  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "current-chat") {
      console.log("ban dang chat voi" + newValue);
      let friendInfo = await this.loadFriendInfo();
      this.$chatInfo.innerHTML = friendInfo.name;
      this.loadMessages();
    }
  }

  async loadFriendInfo() {
    let friendId = this.getAttribute("current-chat");
    let result = await firebase
      .firestore()
      .collection("users")
      .doc(friendId)
      .get();

    return getDataFromDoc(result);
  }
  loadMessages() {
    let currentUser = getCurrentUser();
    let friendId = this.getAttribute("current-chat");
    firebase
      .firestore()
      .collection("messages")
      .where("owner", "in", [currentUser.id, friendId])
      .onSnapshot((result) => {
        let rawData = getDatafromDocs(result.docs);

        let messagesData = rawData.filter((messageData) => {
          return (
            messageData.receiver === currentUser.id ||
            messageData.receiver === friendId
          );
        });

        console.log(messagesData);

        this.$messageList.setAttribute("data", JSON.stringify(messagesData));
      });
  }
  async sendMessage(content) {
    let currentUser = getCurrentUser();
    console.log({
      content: content,
      dateModified: new Date().toISOString(),
      owner: currentUser.id,
      receiver: this.getAttribute("current-chat"),
    });
    await firebase
      .firestore()
      .collection("messages")
      .add({
        content: content,
        dateModified: new Date().toISOString(),
        owner: currentUser.id,
        receiver: this.getAttribute("current-chat"),
      });
  }
}

window.customElements.define("chat-container", ChatContainer);
