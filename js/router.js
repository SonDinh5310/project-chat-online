import ChatScreen from "./screens/chatScreen.js";

let $app = document.getElementById("app");
let root = null;
let useHash = true; // Defaults to: false
let hash = "#!"; // Defaults to: '#'
let router = new Navigo(root, useHash, hash);

router
  .on("/sign-up", function () {
    $app.innerHTML = "<register-form></register-form>";
    console.log("Ban dang o chuc nang dang ky");
  })
  .resolve();
router
  .on("/sign-in", function () {
    $app.innerHTML = "<login-form></login-form>";
    console.log("Ban dang o chuc nang dang nhap");
  })
  .resolve();

router
  .on("/chat/:id", function (params) {
    $app.innerHTML = " ";
    let $chatScreen = new ChatScreen();
    let $chatContainer = $chatScreen.shadowRoot.querySelector("chat-container");
    console.log($chatContainer);
    console.log(params);
    $chatContainer.setAttribute("current-chat", params.id);
    $app.appendChild($chatScreen);
  })
  .resolve();
window.router = router;
