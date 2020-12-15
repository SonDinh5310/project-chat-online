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
        Ban da co tai khoan ? <b><a href="#">Dang nhap</a></b>
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

  validate() {
    if (this.$email.value() === "") {
      alert("Email error");
    } else if (this.$name.value() === "") {
      alert("Name error");
    } else if (this.$password.value() === "") {
      alert("Pass error");
    } else if (this.$passwordConfirmation.value() === "") {
      alert("Password retype error");
    } else if (this.$password.value() !== this.$passwordConfirmation.value()) {
      alert("Password and password-retype not match");
    }
  }

  connectedCallback() {
    this.$form.onsubmit = (event) => {
      event.preventDefault();
      this.validate();
      // console.log(this.$email.value());
      alert("register successful");
    };
  }
}

window.customElements.define("register-form", RegisterForm);
