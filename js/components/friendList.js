import FriendContainer from "./friendContainer.js";
import InputWrapper from "./inputWrapper.js";
import { getDataFromDoc, getDatafromDocs } from "../utils.js";

const $template = document.createElement("template");

$template.innerHTML = /*html */ `
<style>
    *{
        background-color:#f1f1f2;
    }
    #title {
        padding:15px 0px;
        font-family: Arial;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #cccccc;
    }

    #search-friend-form {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #cccccc;
    }

    #search-friend-btn {
        border: 1px solid #1995ad;
        background-color: #1995ad;
        height: 40px;
        width: 100px;
        padding: 5px 15px;
        color: #ffffff;
        border-radius: 5px;
    }

    #search-friend-keyword {
        width: calc(100% - 100px - 15px);
    }
</style>
<div id="title">
Ban be
</div>
<form id="search-friend-form">
    <input-wrapper id="search-friend-keyword" label="" type="text" error=""></input-wrapper>
    <button id="search-friend-btn">Tim kiem</button>
</form>
<div id="friend-list">
</div>
`;

export default class FriendList extends HTMLElement {
  constructor(data) {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$friendList = this.shadowRoot.getElementById("friend-list");

    this.$searchFriendKeyword = this.shadowRoot.getElementById(
      "search-friend-keyword"
    );
    this.$searchFriendForm = this.shadowRoot.getElementById(
      "search-friend-form"
    );

    this.setAttribute("data", JSON.stringify(data));
  }
  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "data") {
      let friendsData = JSON.parse(newValue);
      for (let friendData of friendsData) {
        let $friendContainer = new FriendContainer(friendData.name);
        this.$friendList.appendChild($friendContainer);
      }
    }
  }

  connectedCallback() {
    this.$searchFriendForm.onsubmit = async (event) => {
      event.preventDefault();

      let keyword = this.$searchFriendKeyword.value();

      let isPassed = InputWrapper.validate(
        this.$searchFriendKeyword,
        (value) => value !== "",
        "Nhap vao ten ban be"
      );

      if (isPassed) {
        let result = await firebase
          .firestore()
          .collection("users")
          .where("name", "==", keyword)
          .get();
        console.log(getDatafromDocs(result.docs));
      }
    };
  }
}

window.customElements.define("friend-list", FriendList);
