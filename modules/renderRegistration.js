import { upDateToken, upDateName, registration } from "./api.js";
import { loadComments } from "../main.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegistration = () => {
  const container = document.querySelector(".container");

  const loginHtml = `
    <section class="add-form">
            <h1 class="add-form-title">Форма регистрации</h1>
        <input
            type="text"
            class="add-form-name"
            placeholder="Введите имя"
            id="name"
            required
        />
        <input
            type="text"
            class="add-form-name"
            placeholder="Введите логин"
            id="login"
            required
        />
        <input
        type="password"
        class="add-form-name"
        placeholder="Введите пароль"
        id="password"
        required />
        <fieldset class="add-form-registry">
            <button class="add-form-button-main button-main"
            type="submit">Зарегистрироваться</button>
            <u class="add-form-button-link entry">Войти</u>
        </fieldset>
  </section>`;

  container.innerHTML = loginHtml;

  document.querySelector(".entry").addEventListener("click", () => {
    renderLogin();
  });

  const nameEl = document.querySelector("#name");
  const loginEl = document.querySelector("#login");
  const passwordEL = document.querySelector("#password");
  const submitButtonEl = document.querySelector(".button-main");

  submitButtonEl.addEventListener("click", () => {
    if (!nameEl.value || !loginEl.value || !passwordEL.value) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    if (passwordEL.value.length < 5) {
      alert("Пароль должен содержать минимум 5 символов");
      return;
    }

    registration(nameEl.value, loginEl.value, passwordEL.value)
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Пользователь с таким логином уже существует");
        }
        if (!response.ok) {
          throw new Error("Ошибка регистрации");
        }
        return response.json();
      })
      .then((data) => {
        upDateToken(data.user.token);
        upDateName(data.user.name);
        loadComments();
      });
  });
};
