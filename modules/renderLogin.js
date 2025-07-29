import { login, upDateToken, upDateName } from "./api.js";
import { loadComments } from "../main.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
  const container = document.querySelector(".container");

  const loginHtml = `
    <section class="add-form">
            <h1 class="add-form-title">Страница входа</h1>
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
            required 
        />
        <fieldset class="add-form-registry">
            <button class="add-form-button-main button-main"
            type="submit">Войти</button>
            <u class="add-form-button-link registry">Зарегистрироваться</u>
        </fieldset>
  </section>`;

  container.innerHTML = loginHtml;

  document.querySelector(".registry").addEventListener("click", () => {
    renderRegistration();
  });

  const loginEl = document.querySelector("#login");
  const passwordEL = document.querySelector("#password");
  const submitButtonEl = document.querySelector(".button-main");

  submitButtonEl.addEventListener("click", () => {
    if (!loginEl.value || !passwordEL.value) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    login(loginEl.value, passwordEL.value)
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Неверный логин или пароль");
        }
        if (!response.ok) {
          throw new Error("Ошибка сервера");
        }
        return response.json();
      })
      .then((data) => {
        upDateToken(data.user.token);
        upDateName(data.user.name);
        loadComments();
      })
      .catch((error) => {
        alert(error.message);
      });
  });
};
