import { comments } from "./data.js";
import {
  initLikeListeners,
  initQuoteListeners,
  initAddCommentListener,
} from "./listeners.js";

import { renderLogin } from "./renderLogin.js";
import { token } from "./api.js";
import { name } from "./api.js";

export const renderComments = () => {
  const container = document.querySelector(".container");

  const commentsHtml = comments
    .map((comment) => {
      return `<li class="comment" data-id="${comment.id}"">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.numberLikes}</span>
              <button data-id="${comment.id}" class="like-button ${comment.likeState ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  const addCommentsHtml = `
      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
          id="name-input"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш комментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
      </div>
      <div class="form-loading">Комментарий добавляется...</div>`;

  const linkToLoginText = `<p>Чтобы оправить комментарий, <span class="link-login">войдите</span></p>`;

  const baseHtml = `<ul class="comments">${commentsHtml}</ul>${token ? addCommentsHtml : linkToLoginText}`;

  container.innerHTML = baseHtml;

  if (token) {
    initLikeListeners(renderComments);
    initQuoteListeners();
    initAddCommentListener(renderComments);
  } else {
    document.querySelector(".link-login").addEventListener("click", () => {
      renderLogin();
    });
  }
};
