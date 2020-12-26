import { getCurrentUser, getDatafromDocs, getDataFromDoc } from "../utils.js";

const $template = document.createElement("template");
$template.innerHTML = /*html*/ `
<style>
  #chat-screen {
    display: flex;
  }

  friend-list {
    width: 30%;
    height: 100vh;
  }

  chat-container {
    width: 69%;
    height: 100vh;
  }
</style>


<div id="chat-screen">
<friend-list></friend-list>
<chat-container></chat-container>
</div>
`;

export default class ChatScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));

    this.$friendList = this.shadowRoot.querySelector("friend-list");
    this.$chatContainer = this.shadowRoot.querySelector("chat-container");
  }

  async connectedCallback() {
    let friendData = await this.loadFirends();

    //Thay doi gia tri thuoc tinh cua friend list
    this.$friendList.setAttribute("data", JSON.stringify(friendData));
  }

  async loadFirends() {
    let currentUser = getCurrentUser();
    //* Lay cac relations
    let result = await firebase
      .firestore()
      .collection("friends")
      .where("relation", "array-contains", currentUser.id)
      .get();

    let existFriends = getDatafromDocs(result.docs);

    let friendsData = [];
    //* Lap qua tung relation
    for (let existFriend of existFriends) {
      let relation = existFriend.relation;
      let friendId = "";

      //* Tim xem dau la id cua friend
      if (relation[0] === currentUser.id) {
        friendId = relation[1];
      } else if (relation[1] == currentUser.id) {
        friendId = relation[0];
      }

      //* Lay thong tin cua nguoi ban khi biet id
      let result = await firebase
        .firestore()
        .collection("users")
        .doc(friendId)
        .get();

      let friendData = getDataFromDoc(result);
      friendData.isFriend = true;
      friendsData.push(friendData);
    }

    return friendsData;
  }
}

window.customElements.define("chat-screen", ChatScreen);
