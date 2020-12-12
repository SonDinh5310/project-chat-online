const $template = document.createElement("template");

$template.innerHTML = /*html */ `
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

    (this.$email = this), this.shadowRoot.getElementById("email");
    (this.$name = this), this.shadowRoot.getElementById("name");
    (this.$password = this), this.shadowRoot.getElementById("password");
    (this.$passwordConfirmation = this),
      this.shadowRoot.getElementById("password-confirmation");
  }

  connectedCallback() {
    this.$form.onsubmit = (event) => {
      event.preventDefault();
      console.log(this.$email.value());
    };
  }
}

window.customElements.define("register-form", RegisterForm);
