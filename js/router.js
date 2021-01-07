import ChatScreen from "./screens/chatScreen.js";
import { getCurrentUser } from "./utils.js";

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
    .on(
        "/chat/:id",
        async function (params) {
            let $chatScreen = document.querySelector("chat-screen");
            if ($chatScreen == null) {
                $chatScreen = new ChatScreen();
                $app.appendChild($chatScreen);
            }
            // $app.innerHTML = "";
            // let $chatScreen = new ChatScreen();
            // $app.appendChild($chatScreen);

            let friendsData = await $chatScreen.loadFirends();
            console.log(friendsData);
            if (friendsData.length === 0) {
                return;
            }
            let firstFriend = friendsData[0];

            if (params.id == 0) {
                router.navigate("/chat/" + firstFriend.id);
                return;
            }

            let $chatContainer = $chatScreen.shadowRoot.querySelector(
                "chat-container"
            );
            $chatContainer.setAttribute("current-chat", params.id);
        },
        {
            before(done, params) {
                console.log("Truoc khi xu ly");
                let currentUser = getCurrentUser();
                if (!currentUser) {
                    router.navigate("/sign-in");
                    return;
                }

                done();
            },
        }
    )
    .resolve();

window.router = router;
