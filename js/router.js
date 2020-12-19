var root = null;
var useHash = true; // Defaults to: false
var hash = "#!"; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
  .on("/sign-up", function () {
    document.getElementById("app").innerHTML =
      "<register-form></register-form>";
    console.log("Ban dang o chuc nang dang ky");
  })
  .resolve();
router
  .on("/sign-in", function () {
    document.getElementById("app").innerHTML = "<login-form></login-form>";
    console.log("Ban dang o chuc nang dang nhap");
  })
  .resolve();

router.on("/chat", function () {
  document.getElementById("app").innerHTML =
    "<friend-container></friend-container>";
});
window.router = router;
