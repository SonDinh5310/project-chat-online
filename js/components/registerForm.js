import InputWrapper from "./inputWrapper.js";
import validateEmail from "../utils.js";

const $template = document.createElement("template");

$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="/css/registerForm.css" />
    <form id="register-form">
    <h2>Dang ky tai khoan</h2>
    <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
    <input-wrapper id="name"
      label="Ten Dang Ki"
      type="text"
      error=""
      value=""
    ></input-wrapper>
    <input-wrapper id="password"
      label="Mat khau"
      type="password"
      error=""
      value=""
    ></input-wrapper>
    <input-wrapper id="password-confirmation"
      label="Xac nhan mat khau"
      type="password"
      error=""
      value=""
    ></input-wrapper>
    <button id="register-btn">Dang ki</button>

    <div id="to-login">
        Ban da co tai khoan ? <b><a href="#!/sign-in">Dang nhap</a></b>
    </div>
    </form>
`;

export default class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild($template.content.cloneNode(true));
    this.$form = this.shadowRoot.getElementById("register-form");

    this.$email = this.shadowRoot.getElementById("email");
    this.$name = this.shadowRoot.getElementById("name");
    this.$password = this.shadowRoot.getElementById("password");
    this.$passwordConfirmation = this.shadowRoot.getElementById(
      "password-confirmation"
    );
  }

  connectedCallback() {
    this.$form.onsubmit = async (event) => {
      event.preventDefault();
      let email = this.$email.value();
      let name = this.$name.value();
      let password = this.$password.value();
      let passwordConfirmation = this.$passwordConfirmation.value();

      let isPassed =
        (InputWrapper.validate(
          this.$email,
          (value) => value !== "",
          "Nhap vao email"
        ) &&
          InputWrapper.validate(
            this.$email,
            (value) => validateEmail(value),
            "Dinh dang email khong hop le"
          )) &
        InputWrapper.validate(
          this.$name,
          (value) => value !== "",
          "Nhap vao ten"
        ) &
        InputWrapper.validate(
          this.$password,
          (value) => value !== "",
          "Nhap vao password"
        ) &
        (InputWrapper.validate(
          this.$passwordConfirmation,
          (value) => value !== "",
          "Nhap vao password confirmation"
        ) &&
          InputWrapper.validate(
            this.$passwordConfirmation,
            (value) => value === password,
            "xac nhan mat khau khong dung"
          ));
      if (isPassed) {
        let result = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", email)
          .get();
        console.log(result);

        if (result.empty) {
          firebase
            .firestore()
            .collection("users")
            .add({
              name: name,
              email: email,
              password: CryptoJS.MD5(password).toString(),
            });
        } else {
          alert("Email da co nguoi su dung");
        }
      }
      console.log(isPassed);
    };
  }
}

window.customElements.define("register-form", RegisterForm);
