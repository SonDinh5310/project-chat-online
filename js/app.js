import "./router.js";

import InputWrapper from "./components/inputWrapper.js";
import RegisterForm from "./components/registerForm.js";
import LoginForm from "./components/loginForm.js";
import FriendContainer from "./components/friendContainer.js";
import FriendList from "./components/friendList.js";
import ChatScreen from "./screens/chatScreen.js";
import ChatContainer from "./components/chatContainer.js";

import MessageContainer from "./components/messageContainer.js";
import MessageList from "./components/messageList.js";
import { getCurrentUser, getDatafromDocs } from "./utils.js";

// function realtimeUpdate() {
//   let currentUser = getCurrentUser();
//   firebase
//     .firestore()
//     .collection("messages")
//     .where("owner", "==", currentUser.id)
//     .onSnapshot((result) => {
//       console.log(getDatafromDocs(result.docs));
//     });
// }

// realtimeUpdate();
